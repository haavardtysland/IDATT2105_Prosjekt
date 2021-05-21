package IDATT2105.Reservation.service;

import IDATT2105.Reservation.models.Reservation;
import IDATT2105.Reservation.repo.ReservationRepo;
import IDATT2105.Reservation.util.Logger;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {
  private Logger log = new Logger(ReservationService.class.toString());

  @Autowired
  private ReservationRepo repo;


  public List<Reservation> getReservations() {
    log.info("getting all reservations");
    return repo.getReservations();
  }

  public Reservation getReservation(int id) {
    log.info("Getting reservation with reservationId " + id);
    return repo.findReservation(id);
  }

  public boolean deleteReservation(int id) {
    log.info("deleting reservation with id: " + id);
    return repo.deleteReservation(id);
  }

  public boolean editReservation(Reservation reservation) {
    log.info("editing reservation " + reservation.getReservation_id());
    return repo.updateReservation(reservation);
  }

  public boolean registerReservation(Reservation reservation) {
    log.info("adding new Reservation: " + reservation.getReservation_id()+ " from: " + reservation.getUser().getEmail());
    return repo.addReservation(reservation);
  }

  public List<Reservation> getReservationsForUser(int userId){
    log.info("getting all reservations for a particular user  with: " + userId);
    return repo.getReservationsForUser(userId);
  }

  public List<Reservation> getReservationsForSection(int sectionId){
    log.info("getting all reservations for a particular section with: " + sectionId);
    return repo.getReservationsForSection(sectionId);
  }

  public List<Reservation> getReservationsForRoom(int roomId){
    log.info("getting all reservations for a particular room with: " + roomId);
    return repo.getReservationsForRoom(roomId);
  }

  public List<Reservation> getReservationsForSectionOnTimeframe(int sectionId, Timestamp start, Timestamp end){
    log.info("Getting all reservations within a timeframe for a particular section " + sectionId + "between " + start + " and " + end) ;
    return repo.getReservationsForSectionOnTimeframe(sectionId, start, end);
  }
}
