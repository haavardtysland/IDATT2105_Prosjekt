package IDATT2105.Reservation.repo;


import IDATT2105.Reservation.models.Reservation;
import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.util.Logger;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class RoomRepo extends ProjectRepo {
    Logger log = new Logger(ProjectRepo.class.toString());
    public RoomRepo() throws IOException {
        connect();
    }

    public EntityManager getEm(){
        return super.emf.createEntityManager();
    }

    @Override
    public void connect() throws IOException {
        super.connect();
    }

    public boolean addRoom(Room room) {
        EntityManager em = getEm();
        try{
            em.getTransaction().begin();
            em.persist(room);
            em.getTransaction().commit();
            return true;
        } catch(Exception e) {
            em.getTransaction().rollback();
            return false;
        } finally {
            em.close();
        }
    }

    public ArrayList<Room> getRooms(){
        EntityManager em = getEm();
        List<Room> allRooms = null;
        try{
            log.info("Getting all the rooms");
            em.getTransaction().begin();
            Query q = em.createNativeQuery("SELECT * FROM ROOM", Room.class);
            allRooms = q.getResultList();
            em.getTransaction().commit();
        } catch(Exception e) {

        } finally {
            em.close();
        }
        if(allRooms == null) {
            return new ArrayList<>();
        }
        return new ArrayList<>(allRooms);
    }

    public boolean addSection(Room room) {
        EntityManager em = getEm();
            try{
                em.getTransaction().begin();
                em.merge(room);
                em.getTransaction().commit();
                return true;
            } catch(Exception e) {
                em.getTransaction().rollback();
                return false;
            } finally {
                em.close();
            }
    }

    public boolean editRoom(Room room){
        EntityManager em = getEm();
        try{
            if(room == null) {
                log.info("Room was not found");
                return false;
            }
            log.info("Setting new variables to room");
            em.getTransaction().begin();
            em.merge(room);
            em.getTransaction().commit();
            return true;
        } catch(Exception e){
            log.info("Could not edit room due to " + e.getCause() + " failed with message " + e.getMessage());
            return false;
        }
    }

    public Room getRoom(int room_id) {
        EntityManager em = getEm();
        Room room;
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

    public boolean deleteRoom(int room_id){
        EntityManager em = getEm();
        try{
            em.getTransaction().begin();
            Room room = em.find(Room.class, room_id);
            if(room == null) {
                log.info("Room to be deleted with id " + room_id + " not found");
                em.getTransaction().rollback();
                return false;
            }
            for(Section section: room.getSections()){
                room.removeSection(section);
                em.createQuery("DELETE FROM Reservation r WHERE r.section = ?1 ", Reservation.class)
                        .setParameter(1, section)
                        .executeUpdate(); //sletter alle instanser av section i reservasjoner
            }
            Room tempRoom = em.merge(room);
            em.remove(tempRoom);
            em.getTransaction().commit();
            log.info("Succesfully deleted room with room_id " + room_id);
            return true;
        }  catch(Exception e){
            log.info("Failed deleting room " + e.getMessage());
            em.getTransaction().rollback();
            return false;
        } finally{
            em.close();
        }
    }

}