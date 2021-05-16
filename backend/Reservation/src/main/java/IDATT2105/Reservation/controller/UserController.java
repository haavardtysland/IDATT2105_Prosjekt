package IDATT2105.Reservation.controller;


import static IDATT2105.Reservation.controller.ControllerUtil.formatJson;
import static IDATT2105.Reservation.controller.ControllerUtil.getRandomID;
import static IDATT2105.Reservation.controller.ControllerUtil.getRandomPassword;
import static IDATT2105.Reservation.controller.ControllerUtil.validateStringMap;

/*
import static IDATT2106.team6.Gidd.Constants.*;
import static IDATT2106.team6.Gidd.web.ControllerUtil.getRandomID;
import static IDATT2106.team6.Gidd.web.ControllerUtil.parsePhone;
import static IDATT2106.team6.Gidd.web.ControllerUtil.validateStringMap;*/
import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.service.UserService;

import IDATT2105.Reservation.util.PathTokenRequired;
import IDATT2105.Reservation.util.PathTwoTokenRequired;
import IDATT2105.Reservation.util.SendEmailService;
import java.sql.Date;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import IDATT2105.Reservation.util.Logger;

import java.util.List;

@CrossOrigin(origins = "*")
@Controller
@RequestMapping(value="/user")
public class UserController {
  private static Logger log = new Logger(UserController.class.toString());
  @Autowired
  private UserService userService;

  @Autowired
  private SendEmailService sendEmailService;

  @GetMapping(value = "", produces = "application/json")
  public ResponseEntity getAllUsers() {
    log.debug("Received GetMapping at '/user'");
    try {
      List<User> users = userService.getUsers();
      return ResponseEntity
          .ok()
          .body("{\"users\": \n" + users.toString() + "\n}");
    } catch (Exception e) {
      e.printStackTrace();
      log.error("An unexpected error was caught while getting all users: " +
          e.getCause() + " with message " + e.getMessage());
      HashMap<String, String> body = new HashMap<>();
      body.put("error", "something went wrong");

      return ResponseEntity
          .badRequest()
          .body(formatJson(body));
    }
  }


  @DeleteMapping("/{id}")
  public ResponseEntity deleteUser(@PathVariable Integer id) {
    //todo return activity-objects and user id's affected by this user being deleted
    // aka the activities this user has created
    log.info("recieved deletemapping to user with id " + id);
    HttpHeaders header = new HttpHeaders();
    boolean result = userService.deleteUser(id);
    Map<String, String> body = new HashMap<>();

    if (result) {
      log.info("deletion successful");
      header.add("Status", "200 OK");
      return ResponseEntity.ok()
          .headers(header).body(formatJson(body));
    }

    log.error("unable to delete user with id: " + id);
    body.put("error", "deletion failed, are you sure the user with id " + id + " exists?");
    header.add("Status", "400 BAD REQUEST");
    return ResponseEntity.ok()
        .headers(header).body(formatJson(body));
  }

  /**
   * {
   *     "firstName":"mattias",
   *     "surName":"my",
   *     "email": "mathimyr@stud.ntnu.no",
   *     "isAdmin": true,
   *     "validDate": "2022-11-12",
   *     "phoneNumber": 1231231
   * }
   *
   * @param map
   * @return
   */

  @PostMapping("")
  public ResponseEntity registerUser(@RequestBody HashMap<String, Object> map) {
    log.info("recieved postmapping to /user: " + map.toString());
    Map<String, String> body = new HashMap<>();

    if (userService.getUser(map.get("email").toString()) != null) {
      body.put("error", "a user with that email already exists!");

      return ResponseEntity
          .badRequest()
          .body(formatJson(body));
    }

    String randomPassword = getRandomPassword();
    User result = userService.registerUser(
        getRandomID(),
        map.get("firstName").toString(),
        map.get("surName").toString(),
        map.get("email").toString(),
        Boolean.parseBoolean(map.get("isAdmin").toString()),
        Date.valueOf(map.get("validDate").toString()),
        randomPassword,
        Integer.parseInt(map.get("phoneNumber").toString()));
    log.info("created user with id: " + result.getUserId());
    HttpHeaders header = new HttpHeaders();

    header.add("Content-Type", "application/json; charset=UTF-8");
    log.info("created user " + result.getUserId() + " | " + result.getEmail());
    if (result != null) {
      log.info("created user");
      header.add("Status", "201 CREATED");

      body.put("userId", String.valueOf(result.getUserId()));
      body.put("isAdmin", String.valueOf(result.getIsAdmin()));
      //body.put("token", securityService
        //  .createToken(String.valueOf(result.getUserId()), (1000 * 60 * 60 * 24)));

      sendEmailService.sendUserEmail(result.getEmail(), randomPassword);
      return ResponseEntity
          .ok()
          .headers(header)
          .body(formatJson(body));
    }
    log.error("Created user is null");
    header.add("Status", "400 BAD REQUEST");
    body.put("error", "Created user is null");
    return ResponseEntity
        .ok()
        .headers(header)
        .body(formatJson(body));
  }

  /**
   * put like this:
   * {
   *     "firstName":"mattias",
   *     "surName":"my",
   *     "email": "mathimyr@stud.ntnu.no",
   *     "isAdmin": true,
   *     "validDate": "2022-11-12",
   *     "phoneNumber": 1231231
   * }
   * @param map
   * @param id
   * @return
   */
  @PutMapping(value = "/edit/{id}")
  public ResponseEntity editUser(@RequestBody Map<String, Object> map, @PathVariable Integer id) {
    log.info("receieved a put mapping for user with id: " + id);
    Map<String, String> body = new HashMap<>();
    HttpHeaders header = new HttpHeaders();
    header.add("Content-Type", "application/json; charset=UTF-8");


    if (map.get("newEmail") == null || map.get("newEmail").equals("")) {
      map.put("newEmail", map.get("email"));
    }

    if (!validateStringMap(map)) {
      log.error(
          "returning error about null/blank fields in user put mapping " + map.toString());
      body.put("error", "one or more json-fields is null/blank");
      return ResponseEntity.badRequest().body(formatJson(body));
    }

    try {
      Integer.parseInt(map.get("phoneNumber").toString());
    } catch (NumberFormatException e) {
      log.error("phone number cannot be parsed to number " + map.toString());
      body.put("error", "phone number is not numeric");
      return ResponseEntity.badRequest().body(formatJson(body));
    } catch (Exception e) {
      log.error("An unexpected message was caught when parsing phoneNumber: " +
          e.getMessage() + " local: " + e.getLocalizedMessage());
      body.put("Error", "Something went wrong");
      return ResponseEntity
          .badRequest()
          .body(formatJson(body));
    }

    try {
      String randomPassword = getRandomPassword();
      boolean result = userService.editUser(
          id,
          map.get("firstName").toString(),
          map.get("surName").toString(),
          map.get("newEmail").toString(),
          Boolean.parseBoolean(map.get("isAdmin").toString()),
          Date.valueOf(map.get("validDate").toString()),
          randomPassword,
          Integer.parseInt(map.get("phoneNumber").toString()));

      log.info("edited user " + id);
      if (result) {
        log.info("created user");
        header.add("Status", "201 CREATED");

        body.put("id", String.valueOf(id));

        sendEmailService.sendEditUserEmail(map.get("newEmail").toString(), randomPassword);
        return ResponseEntity.ok()
            .headers(header)
            .body(formatJson(body));
      }
    } catch (NullPointerException e) {
      log.debug("A NullPointerException was caught while attempting to edit user");
      body.put("error", "invalid input");
      return ResponseEntity
          .badRequest()
          .body(formatJson(body));
    } catch (Exception e) {
      log.debug("An error was caught while attempting to edit user: " +
          e.getMessage() + " | Local: " + e.getLocalizedMessage());
      body.put("error", "Something went wrong");
      return ResponseEntity.badRequest().body(formatJson(body));
    }

    log.error("User could not be edited, are you sure the user exists");
    header.add("Status", "400 BAD REQUEST");
    body.put("error", "could not edit user are you sure the user exists?");
    return ResponseEntity
        .badRequest()
        .body(formatJson(body));
  }



}
