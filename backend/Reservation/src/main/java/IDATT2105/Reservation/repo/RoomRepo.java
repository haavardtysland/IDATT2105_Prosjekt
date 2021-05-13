package IDATT2105.Reservation.repo;


import IDATT2105.Reservation.models.Room;
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
            Query q = em.createNativeQuery("SELECT * FROM ROOM", Room.class);
            allRooms = q.getResultList();
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

    public Room getRoom(int room_id) {
        EntityManager em = getEm();
        Room room;
        try{
            log.info("Finding room with room_id " + room_id);
            return em.getReference(Room.class, room_id);
        } catch (Exception e) {
            log.error("Returning null, finding room failed tu to " + e.getMessage());
            return null;
        } finally {
            em.close();
        }
    }
}
