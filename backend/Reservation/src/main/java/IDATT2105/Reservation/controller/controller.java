package IDATT2105.Reservation.controller;

import IDATT2105.Reservation.service.UserService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class controller {

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

