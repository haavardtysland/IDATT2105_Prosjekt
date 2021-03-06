package IDATT2105.Reservation.util;


import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SendEmailService {
  private Logger log = new Logger(SendEmailService.class.toString());

  @Autowired
  private JavaMailSender javaMailSender;

  /**
   * Mail service that is used when a user is created
   * Sends mail to the user with parameter's:
   * @param email
   * @param password
   */
  public void sendUserEmail(String email, String password){
    log.info("sending mail");
    SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
    simpleMailMessage.setFrom("reservasjonapp@gmail.com");
    simpleMailMessage.setTo(email);
    simpleMailMessage.setSubject("Reservasjon brukernavn og passord");
    simpleMailMessage.setText("Ditt brukernavn : " + email + "\n" + "Ditt passord: " + password);
    javaMailSender.send(simpleMailMessage);
    log.info("sending sent");
  }

  /**
   * Send's mail when a user is edited by a admin user
   * @param email
   * @param password
   */
  public void sendEditUserEmail(String email, String password){
    log.info("sending mail");
    SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
    simpleMailMessage.setFrom("reservasjonapp@gmail.com");
    simpleMailMessage.setTo(email);
    simpleMailMessage.setSubject("Brukeren din har no blit endret. Nytt passord og brukernavn");
    simpleMailMessage.setText("Ditt brukernavn : " + email + "\n" + "Ditt passord: " + password);
    javaMailSender.send(simpleMailMessage);
    log.info("sending sent");
  }

}
