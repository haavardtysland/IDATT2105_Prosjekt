package IDATT2105.Reservation.controller;


import static IDATT2105.Reservation.controller.ControllerUtil.formatJson;
import static IDATT2105.Reservation.controller.ControllerUtil.getRandomID;
import static IDATT2105.Reservation.controller.ControllerUtil.getRandomPassword;
import static IDATT2105.Reservation.controller.ControllerUtil.validateStringMap;
import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.service.UserService;
import IDATT2105.Reservation.util.PathTokenRequired;
import IDATT2105.Reservation.util.PathTwoTokenRequired;
import IDATT2105.Reservation.util.SendEmailService;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
import io.swagger.annotations.ApiOperation;
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

  @ApiOperation(value = "Get all the users")
  @GetMapping(value = "", produces = "application/json")
  public ResponseEntity getAllUsers() {
    log.info("Received GetMapping at '/user'");
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

  @ApiOperation(value = "Get the user by its id")
  @GetMapping(value = "/{userId}", produces = "application/json")
  public ResponseEntity getUser(@PathVariable String userId){
      HttpHeaders header = new HttpHeaders();
      Map<String, String> body = new HashMap();
      int id = Integer.parseInt(userId);
      User user = userService.getUser(id);
      if(user == null){
        header.add("STATUS", "400 BAD REQUEST");
        body.put("error", "Finner ingen bruker med denne id");
        return ResponseEntity.badRequest().headers(header).body(formatJson(body));
      }
      header.add("STATUS", "200 OK");
      return ResponseEntity.ok().headers(header).body(user.toString());
  }

  @ApiOperation(value = "Delete a user")
  @PathTokenRequired
  @DeleteMapping("/{id}")
  public ResponseEntity deleteUser(@PathVariable Integer id) {
    log.info("recieved deletemapping to user with id " + id);
    HttpHeaders header = new HttpHeaders();
    boolean result = userService.deleteUser(id);
    Map<String, String> body = new HashMap<>();

    if (result) {
      log.info("deletion successful");
      header.add("STATUS", "200 OK");
      return ResponseEntity.ok()
          .headers(header).body(formatJson(body));
    }

    log.error("unable to delete user with id: " + id);
    body.put("error", "deletion failed, are you sure the user with id " + id + " exists?");
    header.add("Status", "400 BAD REQUEST");
    return ResponseEntity.badRequest()
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

  @ApiOperation(value = "Register a user")
  @PostMapping("")
  public ResponseEntity registerUser(@RequestBody HashMap<String, Object> map) {
    log.info("recieved postmapping to /user: " + map.toString());
    Map<String, String> body = new HashMap<>();
    HttpHeaders header = new HttpHeaders();


    if (userService.getUserByEmail(map.get("email").toString()) != null) {
      body.put("error", "En bruker med den emailen finnes allerede");

      return ResponseEntity
          .badRequest()
          .body(formatJson(body));
    }
    String randomPassword = getRandomPassword();
    try {
      if(map.get("password") == null) {
        sendEmailService.sendUserEmail(map.get("email").toString(), randomPassword);
      } else {
        randomPassword = map.get("password").toString();
      }
    }    catch(Exception e){
      log.info("Mailen er ugyldig");
      header.add("Status", "400 Bad Request");
      body.put("error", "Ugyldig email");
      return ResponseEntity.badRequest().headers(header).body(formatJson(body));
    }
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

    header.add("Content-Type", "application/json; charset=UTF-8");
    log.info("created user " + result.getUserId() + " | " + result.getEmail());
    if (result != null) {
      log.info("created user");
      header.add("Status", "201 CREATED");

      body.put("userId", String.valueOf(result.getUserId()));
      body.put("isAdmin", String.valueOf(result.getIsAdmin()));
      //body.put("token", securityService
      //  .createToken(String.valueOf(result.getUserId()), (1000 * 60 * 60 * 24)));
      return ResponseEntity
              .ok()
              .headers(header)
              .body(formatJson(body));
    } else {
      header.add("Status", "400 BAD REQUEST");
      body.put("error", "Created user is null");
      return ResponseEntity
              .ok()
              .headers(header)
              .body(formatJson(body));
    }
  }

  /**
   * put like this:
   * {
   *     "firstName":"mattias",
   *     "surName":"my",
   *     "email": "mathimyr@stud.ntnu.no",
   *     "isAdmin": true,
   *     "validDate": "2022-11-12",
   *     "password": true,  //if true send new password. if false use the old one.
   *     "phoneNumber": 1231231
   * }
   * @param map
   * @param id
   * @return
   */
  @ApiOperation(value = "Editing user information by an admin user")
  @PathTwoTokenRequired
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
      User user = userService.getUser(id);
      boolean result = false;

      if(Boolean.parseBoolean(map.get("password").toString())){
        user.setPassword(randomPassword);
        result = userService.editUser(
                id,
                map.get("firstName").toString(),
                map.get("surName").toString(),
                map.get("email").toString(),
                Boolean.parseBoolean(map.get("isAdmin").toString()),
                Date.valueOf(map.get("validDate").toString()),
                randomPassword,
                Integer.parseInt(map.get("phoneNumber").toString()));
      } else {
        user.setFirstName((map.get("firstName").toString()));
        user.setSurname(map.get("surName").toString());
        user.setEmail(map.get("newEmail").toString());
        user.setValidDate(Date.valueOf(map.get("validDate").toString()));
        user.setPhoneNumber(Integer.parseInt(map.get("phoneNumber").toString()));
        result = userService.editUser(
                user
        );
      }
      log.info("edited user " + id);
      if (result) {
        log.info("updated user");
        header.add("Status", "201 CREATED");

        body.put("id", String.valueOf(id));
        if(Boolean.parseBoolean(map.get("password").toString())) {
          sendEmailService.sendEditUserEmail(map.get("newEmail").toString(), randomPassword);
        }
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


  /**
   * put like this:
   * {
   *     "firstName":"mattias",
   *     "surName":"my",
   *     "email": "mathimyr@stud.ntnu.no",
   *     "isAdmin": true,
   *     "validDate": "2022-11-12",
   *     "password": "123123",
   *     "newpassword": "sda",
   *     "phoneNumber": 1231231
   * }
   * @param map
   * @param id
   * @return
   */
  @ApiOperation(value = "Editing user information for a normal user")
  @PathTwoTokenRequired
  @PutMapping(value = "/edit/{id}/user")
  public ResponseEntity editUserNotAdmin(@RequestBody Map<String, Object> map, @PathVariable Integer id) {
    log.info("receieved a put mapping for user with id: " + id);
    Map<String, String> body = new HashMap<>();
    HttpHeaders header = new HttpHeaders();
    header.add("Content-Type", "application/json; charset=UTF-8");
    try {
      if (!userService.login(map.get("email").toString(), map.get("password").toString())) {
        log.debug("Someone tried to edit a user with an invalid email or password ");
        body.put("error", "Passord eller email er feil");
        return ResponseEntity
            .badRequest()
            .headers(header)
            .body(formatJson(body));
      }
    } catch (NullPointerException e) {
      log.error("A NullPointerException was caught while editing user");
      body.put("error", "Passord eller email er feil");
      return ResponseEntity
          .badRequest()
          .headers(header)
          .body(formatJson(body));
    }

    if (map.get("newpassword") == null || map.get("newpassword").equals("")) {
      map.put("newpassword", map.get("password").toString());
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
      boolean result = userService.editUser(
          id,
          map.get("firstName").toString(),
          map.get("surName").toString(),
          map.get("email").toString(),
          Boolean.parseBoolean(map.get("isAdmin").toString()),
          Date.valueOf(map.get("validDate").toString()),
          map.get("newpassword").toString(),
          Integer.parseInt(map.get("phoneNumber").toString()));

      log.info("edited user " + id);
      if (result) {
        log.info("updated user");
        header.add("Status", "201 CREATED");

        body.put("id", String.valueOf(id));
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
