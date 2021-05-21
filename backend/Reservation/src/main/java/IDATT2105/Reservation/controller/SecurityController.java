package IDATT2105.Reservation.controller;


import static IDATT2105.Reservation.controller.ControllerUtil.formatJson;
import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.service.UserService;
import IDATT2105.Reservation.util.Logger;
import IDATT2105.Reservation.util.MapTokenRequired;
import IDATT2105.Reservation.service.SecurityService;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import io.swagger.annotations.ApiOperation;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@Controller
@RequestMapping("/security")
public class SecurityController {
  private static Logger log = new Logger(SecurityController.class.toString());
  @Autowired
  private SecurityService securityService;
  @Autowired
  private UserService userService;

  @ApiOperation(value = "Generate a token")
  @ResponseBody
  @RequestMapping("/token/generate")
  public Map<String, Object> generateToken(@RequestParam(value = "subject") String subject) {
    String token = securityService.createToken(subject, (1000 * 60 * 60 * 24));
    Map<String, Object> map = new LinkedHashMap<>();
    map.put("result", token);
    return map;
  }

  @ApiOperation(value = "Get the subject from the token")
  @ResponseBody
  @RequestMapping("/get/subject")
  public Map<String, Object> getSubject(@RequestParam(value = "token") String token) {
    String subject = securityService.getSubject(token);
    Map<String, Object> map = new LinkedHashMap<>();
    map.put("result", subject);
    return map;
  }

  //  The above endpoints are only to be used for testing purposes, and should not
  //  be left in the code if the code is to be run as a real life service

  /**
   * If this method gets to run, it will always return true since
   * {@link IDATT2105.Reservation.util.TokenRequiredAspect#mapTokenRequiredWithAnnotation(ProceedingJoinPoint, MapTokenRequired)}
   * always will be called before this one is.
   */
  @ApiOperation(value = "Validates a token with its user")
  @MapTokenRequired
  @ResponseBody
  @RequestMapping("/token/validate")
  public ResponseEntity validateToken(@RequestBody Map<String, Object> map) {
    log.info("received request at /security/token/validate with valid token");
    Map<String, String> body = new HashMap<>();

    return ResponseEntity
        .ok()
        .body(formatJson(body));
  }

  @MapTokenRequired
  @ApiOperation(value = "Validate a token and check if the user is admin")
  @PostMapping(value = "/token/validate/admin")
  public ResponseEntity isAdminWithValidToken(@RequestBody Map<String, Object> map){
      log.info("recieved request at /security/token/validate/admin");
    Map<String, String> body = new HashMap<>();
    User user = userService.getUser(Integer.parseInt(map.get("userId").toString()));
    if(user == null){
      body.put("error", "Ingen bruker med denne id");
      return ResponseEntity.badRequest().body(formatJson(body));
    }
    body.put("result", "true");
    body.put("isAdmin", user.getIsAdmin().toString());

    return ResponseEntity.ok().body(formatJson(body));
  }


}
