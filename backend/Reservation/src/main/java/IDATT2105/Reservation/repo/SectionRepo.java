package IDATT2105.Reservation.repo;

import IDATT2105.Reservation.models.Message;
import IDATT2105.Reservation.models.Reservation;
import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.util.Logger;
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

    public Message findMessage(int message_id) {
        log.info("finding message " + message_id);
        EntityManager em = getEm();
        Message message = null;

        try {
            message = em.find(Message.class, message_id);
            log.info("Found message " + message);
            return message;
        } catch (Exception e) {
            log.error("finding user " + message_id + " failed due to " + e.getMessage());
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

    /**
     * Mehtod that checks how many hours a section is used in hours between two dates
     * @param section_id
     * @param start
     * @param end
     * @return hours used between two dates
     */
    public Long getSectionStatistics(int section_id, Timestamp start, Timestamp end){
        EntityManager em = getEm();
        Long hours_used = 0L;
        try{
            log.info("Finding statistics for section with section_id :" + section_id);
            em.getTransaction().begin();
            Section section = em.find(Section.class, section_id);
            if(section == null){
                log.info("No section with that section_id was found");
                return -1L;
            }
            Query q = em.createNativeQuery("SELECT reservation_id FROM RESERVATION where section_id = ?1");
            q.setParameter(1, section_id);

            List<Integer> ids = q.getResultList();
            for(int id : ids) {
                Reservation reservation = em.find(Reservation.class, id);
                System.out.println(reservation.getFromDate());
                System.out.println(reservation.getToDate());
                if(reservation.getFromDate().getTime() >= start.getTime() && reservation.getFromDate().getTime() < end.getTime()){
                    if(reservation.getToDate().getTime() > end.getTime()){
                        hours_used += (end.getTime() - reservation.getFromDate().getTime());
                    } else {
                        hours_used += (reservation.getToDate().getTime() -  reservation.getFromDate().getTime());
                    }
                }
                else if(!(reservation.getToDate().getTime() > end.getTime()) && !(reservation.getToDate().getTime() < start.getTime())) {
                    hours_used += (reservation.getToDate().getTime() - start.getTime());
                } else if(reservation.getFromDate().getTime() < start.getTime() && reservation.getToDate().getTime() > start.getTime()
                        || reservation.getFromDate().getTime() < end.getTime() && reservation.getToDate().getTime() > end.getTime() ){
                    hours_used += end.getTime() - start.getTime();
                }
            }
            return hours_used;
        } catch(Exception e){
            log.info("Something went wrong while getting statistics for seciton with section_id " + section_id);
            return -1L;
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

    public boolean deleteMessage(int message_id) {
        EntityManager em = getEm();
        try{
            em.getTransaction().begin();

            Message message = findMessage(message_id);
            if(message != null) {
                Section section = message.getSection();
                section.removeMessage(message);
                User user = message.getUser();
                user.removeMesage(message);
                em.merge(section);
                em.getTransaction().commit();
                log.info("Successfully delete message with id " + message_id);
                return true;
            } else {
                log.info("message to be deleted " + message_id + " not found");
                em.getTransaction().rollback();
                return false;
            }
        } catch(Exception e) {
            log.info("Failed deleting message " + e.getMessage());
            em.getTransaction().rollback();
            return false;
        } finally {
            em.close();
        }
    }
}
