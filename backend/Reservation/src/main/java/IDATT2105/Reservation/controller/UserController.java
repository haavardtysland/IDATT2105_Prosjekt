package IDATT2105.Reservation.controller;


import static IDATT2105.Reservation.controller.ControllerUtil.formatJson;
/*
import static IDATT2106.team6.Gidd.Constants.*;
import static IDATT2106.team6.Gidd.web.ControllerUtil.getRandomID;
import static IDATT2106.team6.Gidd.web.ControllerUtil.parsePhone;
import static IDATT2106.team6.Gidd.web.ControllerUtil.validateStringMap;*/
import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.repo.RoomRepo;
import IDATT2105.Reservation.repo.UserRepo;
import IDATT2105.Reservation.service.UserService;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import IDATT2105.Reservation.util.Logger;

import java.util.List;


@Controller
@RequestMapping(value="/user")
public class UserController {
  private static Logger log = new Logger(UserController.class.toString());
  @Autowired
  private UserService userService;


  @GetMapping(value = "", produces = "application/json")
  public ResponseEntity getAllUsers() {
    log.debug("Received GetMapping at '/user'");
    try {
      List<User> users = userService.getUsers();
      return ResponseEntity
          .ok()
          .body(users.toString());
    } catch (Exception e) {
      e.printStackTrace();
      log.error("An unexpected error was caught while getting all tags: " +
          e.getCause() + " with message " + e.getMessage());
      HashMap<String, String> body = new HashMap<>();
      body.put("error", "something went wrong");

      return ResponseEntity
          .badRequest()
          .body(formatJson(body));
    }
  }

}
