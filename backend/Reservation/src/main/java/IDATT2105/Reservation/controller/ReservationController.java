package IDATT2105.Reservation.controller;

import static IDATT2105.Reservation.controller.ControllerUtil.formatJson;
import static IDATT2105.Reservation.controller.ControllerUtil.getRandomID;
import static IDATT2105.Reservation.controller.ControllerUtil.getRandomPassword;

import IDATT2105.Reservation.models.Reservation;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.service.ReservationService;
import IDATT2105.Reservation.service.SectionService;
import IDATT2105.Reservation.service.UserService;
import IDATT2105.Reservation.service.ReservationService;
import IDATT2105.Reservation.service.RoomService;
import IDATT2105.Reservation.util.Logger;
import IDATT2105.Reservation.util.MapTokenRequired;
import IDATT2105.Reservation.util.PathTokenRequired;
import IDATT2105.Reservation.util.PathTwoTokenRequired;
import IDATT2105.Reservation.util.ReservationTokenRequired;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.naming.directory.InvalidAttributesException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "*")
@Controller
@RequestMapping(value="/reservation")
public class ReservationController {
  Logger log = new Logger(ReservationController.class.toString());

  @Autowired
  private ReservationService reservationService;

  @Autowired
  private UserService userService;

  @Autowired
  private SectionService sectionService;


  @GetMapping(value = "", produces = "application/json")
  public ResponseEntity getAllReservations() {
    log.debug("Received GetMapping at '/reservation'");
    try {
      List<Reservation> reservations = reservationService.getReservations();
      return ResponseEntity
          .ok()
          .body("{\"reservations\": \n" + reservations.toString() + "\n}");
    } catch (Exception e) {
      e.printStackTrace();
      log.error("An unexpected error was caught while getting all reservations: " +
          e.getCause() + " with message " + e.getMessage());
      HashMap<String, String> body = new HashMap<>();
      body.put("error", "something went wrong");

      return ResponseEntity
          .badRequest()
          .body(formatJson(body));
    }
  }

  /**
   * Get all the reservations for a user
   * @param userId the id of the user
   * @return A list of the reservations this user has
   */
  @PathTokenRequired
  @GetMapping(value = "/{userId}/user", produces = "application/json")
  public ResponseEntity getAllReservationsForUser(@PathVariable Integer userId) {
    log.debug("Received GetMapping at '/reservation/{userID}' with " + userId);
    try {
      List<Reservation> reservations = reservationService.getReservationsForUser(userId);
      return ResponseEntity
          .ok()
          .body("{\"reservations\": \n" + reservations.toString() + "\n}");
    } catch (Exception e) {
      e.printStackTrace();
      log.error("An unexpected error was caught while getting all reservations for user: " +
          e.getCause() + " with message " + e.getMessage());
      HashMap<String, String> body = new HashMap<>();
      body.put("error", "something went wrong");

      return ResponseEntity
          .badRequest()
          .body(formatJson(body));
    }
  }

  /**
   * Getting all the reservations for a section
   * @param sectionId the id of the section
   * @return A list of reservations
   */
  @GetMapping(value = "/{sectionId}/section", produces = "application/json")
  public ResponseEntity getAllReservationsForSection(@PathVariable Integer sectionId) {
    log.debug("Received GetMapping at '/reservation/{sectionID}' with " + sectionId);
    try {
      List<Reservation> reservations = reservationService.getReservationsForSection(sectionId);
      return ResponseEntity
          .ok()
          .body("{\"reservations\": \n" + reservations.toString() + "\n}");
    } catch (Exception e) {
      e.printStackTrace();
      log.error("An unexpected error was caught while getting all reservations for section: " +
          e.getCause() + " with message " + e.getMessage());
      HashMap<String, String> body = new HashMap<>();
      body.put("error", "something went wrong");

      return ResponseEntity
          .badRequest()
          .body(formatJson(body));
    }
  }

  /**
   * Get the reservations of a section within at timeframe
   * @param sectionId the id of the section
   * @param from the start time, as ms since epoch
   * @param to the end time, as ms since epoch
   * @return
   */
  @GetMapping(value ="/{sectionId}/section/{from}/{to}", produces = "application/json")
  public ResponseEntity getReservationsForSectionOnTimeframe(@PathVariable Integer sectionId, @PathVariable String from, @PathVariable String to){
    log.debug("Received GetMapping at '/reservation/{sectionID}' with " + sectionId);
    try {
      long start = Long.parseLong(from);
      long end = Long.parseLong(to);
      Timestamp start_time = new Timestamp(start);
      Timestamp end_time = new Timestamp(end);
      List<Reservation> reservations = reservationService.getReservationsForSectionOnTimeframe(sectionId, start_time, end_time);
      return ResponseEntity
              .ok()
              .body("{\"reservations\": \n" + reservations.toString() + "\n}");
    } catch (Exception e) {
      e.printStackTrace();
      log.error("An unexpected error was caught while getting all reservations for section: " +
              e.getCause() + " with message " + e.getMessage());
      HashMap<String, String> body = new HashMap<>();
      body.put("error", "something went wrong");

      return ResponseEntity
              .badRequest()
              .body(formatJson(body));
    }
  }

  @GetMapping(value = "/{roomId}/room", produces = "application/json")
  public ResponseEntity getAllReservationsForRoom(@PathVariable Integer roomId) {
    log.debug("Received GetMapping at '/reservation/{sectionID}' with " + roomId);
    try {
      List<Reservation> reservations = reservationService.getReservationsForRoom(roomId);
      return ResponseEntity
          .ok()
          .body("{\"reservations\": \n" + reservations.toString() + "\n}");
    } catch (Exception e) {
      e.printStackTrace();
      log.error("An unexpected error was caught while getting all reservations for room: " +
          e.getCause() + " with message " + e.getMessage());
      HashMap<String, String> body = new HashMap<>();
      body.put("error", "something went wrong");

      return ResponseEntity
          .badRequest()
          .body(formatJson(body));
    }
  }

  /**
   * postmapping example
  {
    "user_id":1819766832,
    "section_id": 1,
    "from_date":"2012-11-12 00:00:00.0",
    "to_date": "2018-11-12 12:30:11.0",
    "capacity": 3,
    "description": "Test description"
}
   */
  @MapTokenRequired
  @PostMapping(value = "", consumes = "application/json", produces = "application/json")
  public ResponseEntity registerReservation(@RequestBody Map<String, Object> map) {

    log.debug("Received new reservation: " + map.toString());
    HttpHeaders headers = new HttpHeaders();
    HashMap<String, String> body = new HashMap<>();

    headers.add("Content-Type", "application/json; charset=UTF-8");
    Reservation newReservation;
    try {
      User user = userService.getUser(Integer.parseInt(map.get("user_id").toString()));

      if (user == null) {
        log.error("User is null, throwing exception");
        throw new InvalidAttributesException("User does not exist");
      }

      Section section = sectionService.getSection(Integer.parseInt(map.get("section_id").toString()));
      if (section == null) {
        body.put("error", "the section is null");
        return ResponseEntity
            .badRequest()
            .body(formatJson(body));
      }

      newReservation = mapToReservation(map, -1, user, section);

      List<Reservation> allReservations = reservationService.getReservationsForSection(section.getSectionId());
      for(Reservation res : allReservations){
        if(res.getFromDate().getTime() > newReservation.getFromDate().getTime() && res.getToDate().getTime() < newReservation.getToDate().getTime()
        || res.getFromDate().getTime() < newReservation.getFromDate().getTime() && res.getToDate().getTime() > newReservation.getFromDate().getTime()
        || res.getFromDate().getTime() < newReservation.getToDate().getTime() && res.getToDate().getTime() > newReservation.getToDate().getTime()
        || res.getFromDate().getTime() == newReservation.getFromDate().getTime() && res.getToDate().getTime() == newReservation.getToDate().getTime()){
            log.info("This section is already reserved in this timeframe");
            headers.add("Status", "400 Bad Request");
            body.put("error", "Tidspunktet er allerede reservert");
            return ResponseEntity.badRequest().headers(headers).body(formatJson(body));
        }
      }

      List<Reservation> allReservationsForRoom = reservationService.getReservationsForRoom(section.getRoom().getRoom_id());
      int allSectionCapacity = 0;
      for(Reservation res : allReservationsForRoom){
        if(res.getFromDate().getTime() > newReservation.getFromDate().getTime() && res.getToDate().getTime() < newReservation.getToDate().getTime()
            || res.getFromDate().getTime() < newReservation.getFromDate().getTime() && res.getToDate().getTime() > newReservation.getFromDate().getTime()
            || res.getFromDate().getTime() < newReservation.getToDate().getTime() && res.getToDate().getTime() > newReservation.getToDate().getTime()
            || res.getFromDate().getTime() == newReservation.getFromDate().getTime() && res.getToDate().getTime() == newReservation.getToDate().getTime()){
          allSectionCapacity += res.getSection().getCapacity();
        }
      }
      if(section.getRoom().getCapacity()-allSectionCapacity < section.getCapacity()){
        log.info("This section is not available");
        headers.add("Status", "400 Bad Request");
        body.put("error", "Denne seksjonen er opptatt");
        return ResponseEntity.badRequest().headers(headers).body(formatJson(body));
      }
      // creates one or multiple activities based on repeat
      return createReservation(user, newReservation, map, body, headers);

    } catch (InvalidAttributesException e) {
      log.error("InvalidattributesException, " + e.getMessage());
      body.put("error", "invalid userID received");
      return ResponseEntity
          .badRequest()
          .headers(headers)
          .body(formatJson(body));
    } catch (IllegalArgumentException e) {
      log.error("user is already registered to the reservasjon");
      body.put("error",  e.getMessage());
      return ResponseEntity
          .badRequest()
          .body(formatJson(body));
    } catch (Exception e) {
      body.put("error", "unknown error: " + e.getMessage());
      e.printStackTrace();
      log.error("unexplained error caught " + e + "; local:" + e.getLocalizedMessage());
      return ResponseEntity
          .badRequest()
          .body(formatJson(body));
    }
  }

  private Reservation mapToReservation(Map<String, Object> map, int resId, User user, Section section)
      throws InvalidAttributesException {
    log.debug("map: to reservation");
    log.info(map.get("from_date").toString());
        Timestamp fromDate = Timestamp.valueOf(map.get("from_date").toString());
        Timestamp toDate = Timestamp.valueOf(map.get("to_date").toString());
        int capacity = Integer.parseInt(map.get("capacity").toString());
        String description = map.get("description").toString();

    return new Reservation(resId,
        section, fromDate, toDate, user,
        capacity, description);
  }

  private int newReservationValidId(Reservation reservation) {
    log.info("finding new valid id for an reservation");
    boolean created;
    int endId;
    do {
      endId = getRandomID();
      log.debug("attempting id: " + endId);
      if (endId < 0) {
        endId = -endId;
      }
      reservation.setReservation_id(endId);
      created = reservationService.registerReservation(reservation);
      log.debug("creating reservation was " + created + " successful");
    }
    while (!created);
    log.info("final new reservation id: " + endId);
    return endId;
  }

  /**
   * Creates reservation
   */
  private ResponseEntity createReservation(User user, Reservation reservation, Map<String, Object> map,
                                        HashMap<String, String> body, HttpHeaders headers) {

      Reservation temp = new Reservation(reservation);
      int newId = newReservationValidId(temp);
      temp.setReservation_id(newId);
      log.debug("new reservation id: " + newId);
      log.info("Reservation created successfully");

      //add the reservation to reservationlist in the section
      reservation.getSection().addReservation(reservation);

      body.put("reservationId",String.valueOf(temp.getReservation_id()));

    return ResponseEntity
        .ok()
        .body(formatJson(body));
  }

  @ReservationTokenRequired
  @DeleteMapping("/{reservationId}")
  public ResponseEntity deleteReservation(@PathVariable Integer reservationId) {
    log.info("recieved deletemapping to reservation with id " + reservationId);
    Map<String, String> body = new HashMap<>();
    HttpHeaders header = new HttpHeaders();
    Reservation reservation = reservationService.getReservation(reservationId);
    if (reservation == null) {
      body.put("error", "the reservation does not exist");
      return ResponseEntity.badRequest().headers(header).body(formatJson(body));
    }

    if (reservationService.deleteReservation(reservationId)) {
      //removes the reservation from the section
      reservation.getSection().removeReservation(reservation);
      log.debug("The deletion was successful");
      header.add("Status", "200 OK");
      header.add("Content-Type", "application/json; charset=UTF-8");

      body.put("reservationId", String.valueOf(reservationId));
      String bodyJson = formatJson(body);

      return ResponseEntity
          .ok()
          .headers(header)
          .body(bodyJson.substring(0, bodyJson.length() - 1) + "}");
    }

    body.put("error", "no reservation was deleted, are you sure the reservation exists");
    return ResponseEntity.badRequest().headers(header).body(formatJson(body));
  }

  /**
   * Edit reseration with given id
   * Put:
   {
     "user_id":1819766832,
     "section_id": 1095509925,
     "from_date":"2030-11-12 00:00:00.0",
     "to_date": "2031-11-12 12:30:11.0",
     "capacity": 1,
     "description": "helerommet"
   }
   * @param resId
   * @param map
   * @return
   */
  @MapTokenRequired
  @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
  public ResponseEntity editReservation(@PathVariable("id") int resId,
                                     @RequestBody Map<String, Object> map
  ) {
    log.info("received putMapping to /reservation/{id}");
    User user = userService.getUser(Integer.parseInt(map.get("user_id").toString()));
    log.debug("User with id received");
    Reservation reservation = reservationService.getReservation(resId);


    HttpHeaders headers = new HttpHeaders();
    HashMap<String, String> body = new HashMap<>();

    headers.add("Content-Type", "application/json; charset=UTF-8");
    if (reservation == null || user == null) {
      body.put("error", "user or reservation is null");
      log.error("reservation or user is null, returning error");
      log.debug("Reservation: " + (reservation == null));
      log.debug("User: " + (user == null));
      return ResponseEntity
          .badRequest()
          .headers(headers)
          .body(formatJson(body));
    }
    log.info("old reservation " + reservation.getReservation_id());
    reservation.setCapacity(Integer.parseInt(map.get("capacity").toString()));
    reservation.setDescription(map.get("description").toString());
    reservation.setFromDate(Timestamp.valueOf(map.get("from_date").toString()));
    reservation.setFromDate(Timestamp.valueOf(map.get("to_date").toString()));
    reservation.setSection(sectionService.getSection(Integer.parseInt(map.get("section_id").toString())));

    log.info("new reservation: " + reservation.getReservation_id());
    boolean edited = reservationService.editReservation(reservation);
    if (!edited) {
      body.put("error", "reservation was not edited");
      log.info("reservation is not edited returning error");
      return ResponseEntity
          .badRequest()
          .headers(headers)
          .body("didnt work here either sad");
    }

    return ResponseEntity
        .ok()
        .headers(headers)
        .body(reservation.toString());
  }
}
