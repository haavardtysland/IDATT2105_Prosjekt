package IDATT2105.Reservation.repo;

import IDATT2105.Reservation.models.Message;
import IDATT2105.Reservation.models.Reservation;
import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.util.Logger;
import IDATT2105.Reservation.util.ReservationTime;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


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

    public boolean addMessage(Section section) {
        EntityManager em = getEm();
        try{
            em.getTransaction().begin();
            em.merge(section);
            em.getTransaction().commit();
            log.info("Sucessfully added message " + section);
            return true;
        } catch(Exception e) {
            log.info("Failed adding message" + e.getMessage());
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
             section = em.find(Section.class, section_id);
             log.info("Found section " + section);
             return section;
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

    public ArrayList<ReservationTime> getSectionAvailability(int section_id){
        EntityManager em = getEm();
        ArrayList<ReservationTime> reservationTimes = new ArrayList<>();
        try{
            log.info("Finding the taken time slots for section: " + section_id);
            Query q = em.createNativeQuery("SELECT reservation_id FROM RESERVATION where section_id = ?1");
            q.setParameter(1, section_id);
            List<Integer> ids = q.getResultList();
            for(int id : ids) {
                Reservation reservation = em.find(Reservation.class, id);
                ReservationTime reservationTime = new ReservationTime(reservation.getFromDate().getTime(), reservation.getToDate().getTime());
                reservationTimes.add(reservationTime);
            }
            return reservationTimes;
        } catch(Exception e){
            log.info("Finding taken time slots for section: " + section_id + " failed due to " + e);
            return null;
        }
    }

    public ArrayList<Section> getSections(){
        EntityManager em = getEm();
        List<Section> allSections = null;
        try{
            log.info("Getting all the rooms");
            em.getTransaction().begin();
            Query q = em.createNativeQuery("SELECT * FROM SECTION", Section.class);
            allSections = q.getResultList();
            em.getTransaction().commit();
        } catch(Exception e) {
            log.info("Getting all sections failed due to " + e);
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        if(allSections == null) {
            return new ArrayList<>();
        }
        return new ArrayList<>(allSections);
    }


    public boolean deleteSection(int section_id) {
        EntityManager em = getEm();
        try{
                em.getTransaction().begin();
                Section section = findSection(section_id);
            if(section != null) {
                int room_id = section.getRoom().getRoom_id();
                Room room = getRoomBySectionID(room_id);
                room.removeSection(section);
                em.merge(room);
                em.getTransaction().commit();
                log.info("Successfully delete section with id " + section_id);
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
