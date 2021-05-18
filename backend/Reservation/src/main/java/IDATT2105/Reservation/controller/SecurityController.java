package IDATT2105.Reservation.controller;


import static IDATT2105.Reservation.controller.ControllerUtil.formatJson;

import IDATT2105.Reservation.util.Logger;
import IDATT2105.Reservation.util.MapTokenRequired;

import IDATT2105.Reservation.service.SecurityService;



import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = "*")
@Controller
@RequestMapping("/security")
public class SecurityController {
  private static Logger log = new Logger(SecurityController.class.toString());
  @Autowired
  private SecurityService securityService;

  @ResponseBody
  @RequestMapping("/token/generate")
  public Map<String, Object> generateToken(@RequestParam(value = "subject") String subject) {
    String token = securityService.createToken(subject, (1000 * 60 * 60 * 24));
    Map<String, Object> map = new LinkedHashMap<>();
    map.put("result", token);
    return map;
  }

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
  @MapTokenRequired
  @ResponseBody
  @RequestMapping("/token/validate")
  public ResponseEntity validateToken(@RequestBody Map<String, Object> map) {
    log.info("received request at /security/token/validate with valid token");
    Map<String, String> body = new HashMap<>();

    body.put("result", "true");

    return ResponseEntity
        .ok()
        .body(formatJson(body));
  }
}
