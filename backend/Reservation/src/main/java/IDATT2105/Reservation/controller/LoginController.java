package IDATT2105.Reservation.controller;

import static IDATT2105.Reservation.controller.ControllerUtil.formatJson;
import IDATT2105.Reservation.service.UserService;
import IDATT2105.Reservation.util.Logger;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "*")
@Controller
@RequestMapping("/login")
public class LoginController {
  private static Logger log = new Logger(LoginController.class.toString());
  @Autowired
  private UserService userService;
 /* @Autowired
  private SecurityService securityService;*/

 @PostMapping("")
  private ResponseEntity loginUser(@RequestBody Map<String, Object> map) {
    log.info("recieved postmapping to /login " + map.toString());
    HttpHeaders header = new HttpHeaders();
    boolean result =
        userService.login(map.get("email").toString(), map.get("password").toString());
    Map<String, String> body = new HashMap<>();
    if (result) {
      log.info("logged in user with email " + map.get("email").toString());
      String id =
          String.valueOf(userService.getUser(map.get("email").toString()).getUserId());
      body.put("id",
          id);
      /*body.put("token",
          String.valueOf(securityService.createToken(id, (1000 * 60 * 60 * 24))));*/
      header.add("Status", "200 OK");
      return ResponseEntity.ok()
          .headers(header)
          .body(formatJson(body));
    }
    log.error("unable to login user with email: " + map.get("email").toString());
    header.add("Status", "403 Forbidden");
    body.put("error", "unable to login user with email: " + map.get("email").toString());
    return ResponseEntity.status(403)
        .headers(header).body(formatJson(body));
  }



}