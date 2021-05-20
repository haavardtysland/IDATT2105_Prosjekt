package IDATT2105.Reservation.controller;

import static IDATT2105.Reservation.controller.ControllerUtil.formatJson;

import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.service.SecurityService;
import IDATT2105.Reservation.service.UserService;
import IDATT2105.Reservation.util.Logger;
import java.sql.Date;
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
  @Autowired
  private SecurityService securityService;


  /**
   * Logging inn with user
   * Post:
   {
    "email":"email@gmail.com",
    "password":"password"
   }
   * @param map
   * @return returns the users userid, isAdmin (wheter the account is an admin or not) and a token
   */
 @PostMapping("")
  private ResponseEntity loginUser(@RequestBody Map<String, Object> map) {
    log.info("recieved postmapping to /login " + map.toString());
    HttpHeaders header = new HttpHeaders();
    User user =
        userService.login(map.get("email").toString());
    Map<String, String> body = new HashMap<>();
    if (user != null) {
      long millis=System.currentTimeMillis();
      Date currentDate=new java.sql.Date(millis);
      System.out.println(currentDate);
      if(user.verifyPassword(map.get("password").toString()) && user.getValidDate().after(currentDate)){
        log.info("logged in user with email " + map.get("email").toString());
        String id =
                String.valueOf(userService.getUserByEmail(map.get("email").toString()).getUserId());
        String isAdmin = String.valueOf(userService.getUserByEmail(map.get("email").toString()).getIsAdmin());
        body.put("id", id);
        body.put("isAdmin", isAdmin);
        body.put("token",
          String.valueOf(securityService.createToken(id, (1000 * 60 * 60 * 24))));
        header.add("Status", "200 OK");
        return ResponseEntity.ok()
                .headers(header)
                .body(formatJson(body));
      }else if(!user.verifyPassword(map.get("password").toString())){
        System.out.println(map.get("password").toString());
        log.info("Password was wrong for user with email " + map.get("email").toString());
        header.add("Status", "403 Forbidden");
        body.put("error", "Passordet er feil");

        return ResponseEntity.status(403)
            .headers(header).body(formatJson(body));
      } else {
        log.info("the user may not be valid anymore. ValidDate= " + String.valueOf(userService.getUserByEmail(map.get("email").toString()).getValidDate()));
       body.put("error", "Brukeren er utgått");
       header.add("Status", "403 Forbidden");
        return ResponseEntity.status(403)
            .headers(header).body(formatJson(body));
      }
    }
    log.error("unable to login user with email: " + map.get("email").toString());
    header.add("Status", "403 Forbidden");
    body.put("error", "Finnes ingen bruker med denne email-en " + map.get("email").toString());
    return ResponseEntity.badRequest()
        .headers(header).body(formatJson(body));
  }
}