package IDATT2105.Reservation.util;

import IDATT2105.Reservation.models.Reservation;
import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.service.ReservationService;
import IDATT2105.Reservation.service.SecurityServiceImpl;
import IDATT2105.Reservation.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class TokenRequiredAspect {

  private Logger log = new Logger(TokenRequiredAspect.class.toString());

  private final SecurityServiceImpl securityService = new SecurityServiceImpl();
 /* @Autowired
  private FriendGroupService friendGroupService;
  @Autowired
  private ActivityService activityService;*/

 @Autowired
 private ReservationService reservationService;

  @Autowired
  private UserService userService;

  /**
   * Called when a method with the {@link MapTokenRequired} annotation is called.
   * This specific annotation is used the subject, or the relevant userId, is found in the
   * map argument of the given JoinPoint.
   *
   * @param pjp the method that would otherwise be called if not for the annotation
   * @return the result of {@link #handleToken(ProceedingJoinPoint, String)}
   */
  @Around("@annotation(mapTokenRequired)")
  public Object mapTokenRequiredWithAnnotation(ProceedingJoinPoint pjp,
                                               MapTokenRequired mapTokenRequired)
      throws Throwable {
    log.info("Around mapTokenRequiredWithAnnotation");
    Object[] args = pjp.getArgs();
    String subject = "";
    for (Object arg : args) {
      if (arg instanceof Map) {
        Map map = (Map) arg;
        if (map.containsKey("user_id")) {
          subject = map.get("user_id").toString();
        } else if (map.containsKey("fromUserId")) {
          subject = map.get("fromUserId").toString();
        }
      }
    }
    return handleToken(pjp, subject);
  }

  /**
   * Called when a method with the {@link PathTokenRequired} annotation is called.
   * This specific annotation is used the subject, or the relevant userId, is
   * the first integer argument of the given JoinPoint.
   *
   * @param pjp the method that would otherwise be called if not for the annotation
   * @return the result of {@link #handleToken(ProceedingJoinPoint, String)}
   */
  @Around("@annotation(pathTokenRequired)")
  public Object pathTokenRequiredWithAnnotation(ProceedingJoinPoint pjp,
                                                PathTokenRequired pathTokenRequired)
      throws Throwable {
    log.info("Around pathTokenRequiredWithAnnotation");
    Object[] args = pjp.getArgs();
    String subject = "";
    if (args[0] instanceof Integer) {
      subject = String.valueOf(args[0]);
    }
    return handleToken(pjp, subject);
  }

  /**
   * Called when a method with the {@link PathTwoTokenRequired} annotation is called.
   * This specific annotation is used the subject, or the relevant userId, is
   * the second integer argument of the given JoinPoint.
   *
   * @param pjp the method that would otherwise be called if not for the annotation
   * @return the result of {@link #handleToken(ProceedingJoinPoint, String)}
   */
  @Around("@annotation(pathTwoTokenRequired)")
  public Object pathTwoTokenRequiredWithAnnotation(ProceedingJoinPoint pjp,
                                                   PathTwoTokenRequired pathTwoTokenRequired)
      throws Throwable {
    log.info("Around pathTwoTokenRequiredWithAnnotation");
    Object[] args = pjp.getArgs();
    String subject = "";
    if (args[1] instanceof Integer) {
      subject = String.valueOf(args[1]);
    }
    return handleToken(pjp, subject);
  }


  /**
   * Called when a method with the {@link ReservationTokenRequired} annotation is called.
   * This specific annotation is used the subject, or the relevant reservationId, is
   * the first integer argument of the given JoinPoint.
   * but checks for the user that created the given reservation.
   *
   * @param pjp the method that would otherwise be called if not for the annotation
   * @return the result of {@link #handleToken(ProceedingJoinPoint, String)}
   */
  @Around("@annotation(reservationTokenRequired)")
  public Object reservationTokenRequiredWithAnnotation(ProceedingJoinPoint pjp,
                                                    ReservationTokenRequired reservationTokenRequired)
      throws Throwable {
    log.info("Around reservationTokenRequiredWithAnnotation");
    Object[] args = pjp.getArgs();
    String subject = "";
    Reservation reservation = null;
    if (args[0] instanceof Integer) {
      reservation = reservationService.getReservation((int) args[0]);
    }
    if (reservation == null) {
      HashMap<String, String> body = new HashMap<>();
      body.put("error", "that reservation does not exist");
      return ResponseEntity
          .badRequest()
          .body(body);
    }
    subject = String.valueOf(reservation.getUser().getUserId());
    return handleToken(pjp, subject);
  }

  /**
   * Check function that checks if the subject is correct or if the user is admin
   * Admin then for example has access to edit other users reservations
   * @param pjp
   * @param subject
   * @return Object
   * @throws Throwable
   */
  private Object handleToken(ProceedingJoinPoint pjp, String subject) throws Throwable {
    Map<String, String> body = new HashMap<>();
    try {
      log.info(
          "Handling token for pjp: [" + pjp.toString() + "] with subject [" + subject + "]");
      if (subject == null || subject.equals("")) {
        log.error("No subject");
        body.put("error", "no subject passed");

        return ResponseEntity
            .badRequest()
            .body(body);
      }
      ServletRequestAttributes reqAttributes =
          (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
      HttpServletRequest request = reqAttributes.getRequest();
      // checks for token in request header
      String tokenInHeader = request.getHeader("token");
      log.info("Token received: " + tokenInHeader);
      if (StringUtils.isEmpty(tokenInHeader)) {
        log.error("No token was passed in header");
        body.put("error", "empty token");
        return ResponseEntity
            .badRequest()
            .body(body);
      }
      Claims claims = Jwts.parser()
          .setSigningKey(DatatypeConverter.parseBase64Binary(securityService.getSecretKey()))
          .parseClaimsJws(tokenInHeader).getBody();
      if (claims == null || claims.getSubject() == null) {
        log.error("Claims was found to be null");
        body.put("error", "claim is null");

        return ResponseEntity
            .badRequest()
            .body(body);
      }
      User user = userService.getUser(Integer.parseInt(claims.getSubject()));
      if(user.getIsAdmin()){
        return pjp.proceed();
      }
      else if (!claims.getSubject().equalsIgnoreCase(subject)) {
          log.error("Subject does not match token");
          body.put("error", "subject mismatch");
          return ResponseEntity
              .badRequest()
              .body(body);
      } else {
        return pjp.proceed();
      }
    } catch (ExpiredJwtException e) {
      body.put("error", "expired token");
      return ResponseEntity
          .badRequest()
          .body(body);
    }
  }
}
