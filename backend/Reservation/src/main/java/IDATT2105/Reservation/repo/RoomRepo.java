package IDATT2105.Reservation.repo;


import IDATT2105.Reservation.models.Room;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class RoomRepo extends ReservationRepo{
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
}
