package IDATT2105.Reservation.repo;

import IDATT2105.Reservation.models.Reservation;
import IDATT2105.Reservation.util.Logger;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;

@Repository
public class ReservationRepo extends ProjectRepo {

  private Logger log = new Logger(UserRepo.class.toString());

  public ReservationRepo() throws IOException {
    connect();
  }

  @Override
  public void connect() throws IOException {
    super.connect();
  }

  public EntityManager getEm(){
    return super.emf.createEntityManager();
  }

  public Reservation findReservation(int reservationId){
    EntityManager em = getEm();
    log.info("finding reservation with id " + reservationId);
    try {
      return em.find(Reservation.class, reservationId);
    }catch (Exception e){
      log.error("returning null, finding reservation failed due to " + e.getMessage());
      return null;
    }finally {
      em.close();
    }
  }

  public boolean deleteReservation(int reservationId){
    EntityManager em = getEm();
    log.info("deleting reservation with id: " + reservationId);
    try{
      Reservation reservation = findReservation(reservationId);

      if(reservation != null){

        log.info("activity found, attempting delete");
        em.getTransaction().begin();
        Reservation temporaryReservation = em.merge(reservation);

        em.remove(temporaryReservation);
        em.getTransaction().commit();
        log.info("delete success on id: " + reservationId);
        return true;
      }else {
        log.error("failed finding reservation, cannot delete reservation with id: " + reservationId);
        return false;
      }
    }catch (Exception e){
      log.info("deleting reservation: " + reservationId + " failed due to " + e.getMessage());
      return false;
    }finally {
      em.close();
    }
  }

  public ArrayList<Reservation> getReservationsForUser(int userId){
    EntityManager em = getEm();
    List<Reservation> allRes = null;
    try{
      //User user = userRepo.findUser(userId);
      Query q = em.createNativeQuery("SELECT * FROM RESERVATION where user_id = ?1 ", Reservation.class);
      q.setParameter(1, userId);
      allRes = q.getResultList();
    } catch(Exception e) {

    } finally {
      em.close();
    }
    if(allRes == null) {
      return new ArrayList<>();
    }
    return new ArrayList<>(allRes);
  }

  public ArrayList<Reservation> getReservationsForSection(int sectionId){
    EntityManager em = getEm();
    List<Reservation> allRes = null;
    try{
      //User user = userRepo.findUser(userId);
      Query q = em.createNativeQuery("SELECT * FROM RESERVATION where section_id = ?1 ", Reservation.class);
      q.setParameter(1, sectionId);
      allRes = q.getResultList();
    } catch(Exception e) {
      log.info("Something went wrong while getting reservations for section " + e);
      return new ArrayList<>();
    } finally {
      em.close();
    }
    if(allRes == null) {
      return new ArrayList<>();
    }
    return new ArrayList<>(allRes);
  }

  public ArrayList<Reservation> getReservationsForSectionOnTimeframe(int sectionId, Timestamp start, Timestamp end){
    EntityManager em = getEm();
    List<Reservation> allRes = null;
    try{
      //User user = userRepo.findUser(userId);
      Query q = em.createNativeQuery("SELECT * FROM RESERVATION where section_id = ?1 AND from_date BETWEEN ?2 AND ?3 AND to_date BETWEEN ?4 AND ?5", Reservation.class);
      q.setParameter(1, sectionId);
      q.setParameter(2, start);
      q.setParameter(3, end);
      q.setParameter(4, start);
      q.setParameter(5, end);
      allRes = q.getResultList();
    } catch(Exception e) {

    } finally {
      em.close();
    }
    if(allRes == null) {
      return new ArrayList<>();
    }
    return new ArrayList<>(allRes);
  }

  public ArrayList<Reservation> getReservationsForRoom(int roomId){
    EntityManager em = getEm();
    List<Reservation> allRes = null;
    try{
      Query q = em.createNativeQuery("SELECT * FROM RESERVATION R join SECTION S on(S.section_id = R.section_id) join ROOM Ro on(Ro.room_id = S.Room_room_id) where room_id = ?1", Reservation.class);
      q.setParameter(1, roomId);
      allRes = q.getResultList();
    } catch(Exception e) {

    } finally {
      em.close();
    }
    if(allRes == null) {
      return new ArrayList<>();
    }
    return new ArrayList<>(allRes);
  }

  public ArrayList<Reservation> getReservations(){
    EntityManager em = getEm();
    List<Reservation> allRes = null;
    try{
      Query q = em.createNativeQuery("SELECT * FROM RESERVATION", Reservation.class);
      allRes = q.getResultList();
    } catch(Exception e) {

    } finally {
      em.close();
    }
    if(allRes == null) {
      return new ArrayList<>();
    }
    return new ArrayList<>(allRes);
  }

  public boolean addReservation(Reservation reservation){
    log.info("adding a reservation" + reservation.getReservation_id() + " | " + reservation.getUser().toString() + ' ' + reservation.toString());
    EntityManager em = getEm();

    try{
      em.getTransaction().begin();
      em.persist(reservation);
      em.getTransaction().commit();
      log.info("added reservation successfully " + reservation.getReservation_id());
      return true;
    }catch (Exception e){
      log.error("adding reservation " + reservation.getReservation_id() + " failed due to " + e.getMessage());
      em.getTransaction().rollback();
      return false;
    }finally {
      em.close();
    }
  }

  public boolean updateReservation(Reservation reservation) {
    EntityManager em = getEm();
    log.info("updating reservation " + reservation.getReservation_id());
    try {
      em.getTransaction().begin();
      em.merge(reservation);
      em.getTransaction().commit();
      log.info("reservation updated successfully");
      return true;
    } catch (Exception e) {
      log.error("updating reservation failed due to: " + e.getMessage());
      return false;
    } finally {
      em.close();
    }
  }
}
