package IDATT2105.Reservation.service;

import IDATT2105.Reservation.models.Reservation;
import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.repo.UserRepo;
import IDATT2105.Reservation.util.Logger;
import java.sql.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private Logger log = new Logger(UserService.class.toString());
  @Autowired
  private UserRepo repo;

  public User getUser(int userId) {
    log.info("getting user with id " + userId);
    return repo.findUser(userId);
  }

  public List<User> getUsers() {
    log.info("getting all users");
    return repo.getUsers();
  }

  public User getUser(String email) {
    log.info("getting user by email: " + email);
    return repo.findUserByEmail(email);
  }

  public User login(String email) {
    log.info("logging in user with email " + email.trim());
    return getUser(email.trim());
  }

  public User registerUser(int id, String firstname, String surname, String email, Boolean isAdmin, Date validDate, String password, int phoneNumber) {

    User newUser = new User(id, firstname, surname, email, isAdmin, validDate,  password, phoneNumber);
    log.info("creating new user: " + newUser.getUserId());
    log.info("creating new password: " + newUser.getPassword());
    boolean result = repo.addUser(newUser);
    log.info("adding new user was " + result);
    if (result) {
      return newUser;
    }
    return null;
  }


  public boolean deleteUser(int userId) {
    log.info("deleting user " + userId);
    return repo.deleteUser(userId);
  }

   /* public boolean login(String email, String password) {
    log.info("logging in user with email " + email.trim());
    return getUser(email.trim()).verifyPassword(password);
  }*/

}