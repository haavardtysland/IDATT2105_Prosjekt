package IDATT2105.Reservation.service;

<<<<<<< HEAD
import IDATT2105.Reservation.models.Reservation;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.repo.ReservationRepo;
import IDATT2105.Reservation.util.Logger;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
=======
>>>>>>> 45ff69f6f68dc3936f300a4f0b6490c3a9c52913
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

 /* public User getReservation(String email) {
    log.info("getting user by email: " + email);
    return repo.findReservationByEmail(email);
  }*/
}
