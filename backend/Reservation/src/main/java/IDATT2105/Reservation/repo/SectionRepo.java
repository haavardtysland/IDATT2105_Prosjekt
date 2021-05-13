package IDATT2105.Reservation.repo;

import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.util.Logger;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.io.IOException;


@Repository
public class SectionRepo extends ProjectRepo {

        Logger log = new Logger(SectionRepo.class.toString());
        public SectionRepo() throws IOException {
            connect();
        }

        public EntityManager getEm(){
            return super.emf.createEntityManager();
        }

        @Override
        public void connect() throws IOException {
            super.connect();
        }


    public boolean addSection(Section section) {
        EntityManager em = getEm();
        try{
            em.getTransaction().begin();
            em.persist(section);
            em.getTransaction().commit();
            log.info("Sucessfully added section " + section);
            return true;
        } catch(Exception e) {
            log.info("Failed adding section" + e.getMessage());
            em.getTransaction().rollback();
            return false;
        } finally {
            em.close();
        }
    }


    /**
     * @return null if no user is found
     */
    public Section findSection(int section_id) {
        log.info("finding section " + section_id);
        EntityManager em = getEm();
        Section section = null;

        try {
            return section = em.find(Section.class, section_id);
        } catch (Exception e) {
            log.error("finding user " + section_id + " failed due to " + e.getMessage());
            return null;
        } finally {
            em.close();
        }
    }

    public Room getRoomBySectionID(int room_id) {
        EntityManager em = getEm();
        try{
            log.info("Finding room with room_id " + room_id);
            return em.find(Room.class, room_id);
        } catch (Exception e) {
            log.error("Returning null, finding room failed due to " + e.getMessage());
            return null;
        } finally {
            em.close();
        }

    }

    public boolean deleteSection(int section_id) {
        EntityManager em = getEm();
        try{
            Section section = findSection(section_id);
            int room_id = section.getRoom().getRoom_id();
            Room room = getRoomBySectionID(room_id);
            room.removeSection(section);

            if(section != null) {
                em.getTransaction().begin();
                if(!em.contains(section)) {
                    section = em.merge(section);
                }
                em.createQuery("DELETE FROM Reservation WHERE section = ?1 ", Section.class)
                        .setParameter(1, section)
                        .executeUpdate(); //sletter alle instanser av section i reservajsoen
                em.remove(section);
                em.getTransaction().commit();
                log.info("Sucessfully delete section with id " + section_id);
                return true;
            } else {
                log.info("section to be deleted " + section_id + " not found");
                em.getTransaction().rollback();
                return false;
            }
        } catch(Exception e) {
            log.info("Failed deleting section" + e.getMessage());
            em.getTransaction().rollback();
            return false;
        } finally {
            em.close();
        }
    }
}
