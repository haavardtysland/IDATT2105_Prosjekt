package IDATT2105.Reservation.repo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.util.*;

import javax.persistence.EntityManager;
import javax.persistence.Query;

@Repository
public class UserRepo extends ProjectRepo {
  private Logger log = new Logger(UserRepo.class.toString());

  public UserRepo() throws IOException {
    connect();
  }

  @Override
  public void connect() throws IOException {
    super.connect();
  }

  public EntityManager getEm(){
    return super.emf.createEntityManager();
  }

  /**
   * @return null if no user is found
   */
  public User findUser(int userId){
    log.info("finding user " + userId );
    EntityManager em = getEm();
    User user = null;

    try {
      return user = em.find(User.class, userId);
    }catch (Exception e){
      log.error("finding user " + userId + " failed due to " + e.getMessage());
      return null;
    }finally {
      em.close();
    }
  }

  public ArrayList<User> getUsers(){
    EntityManager em = getEm();
    List<User> allUsers = null;
    try{
      Query q = em.createNativeQuery("SELECT * FROM User", User.class);
      allUsers = q.getResultList();
    } catch(Exception e) {

    } finally {
      em.close();
    }
    if(allUsers == null) {
      return new ArrayList<>();
    }
    return new ArrayList<>(allUsers);
  }

    public boolean addUser(User user) {
      EntityManager em = getEm();
      try{
        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit();
        return true;
      } catch(Exception e) {
        em.getTransaction().rollback();
        return false;
      } finally {
        em.close();
      }
    }

  public boolean deleteUser(int userId){
    log.info("deleting user with id: " + userId);
    EntityManager em = getEm();

    try{
      User user = findUser(userId);

      if(user != null){
        log.info("found user " + userId +  " to be deleted");
        em.getTransaction().begin();
        em.createQuery("DELETE FROM Reservation WHERE user = ?1 ", User.class)
            .setParameter(1, userId)
            .executeUpdate(); //sletter alle instanser av user i reservajsoen
        User temporaryUser = em.merge(user);
        em.remove(temporaryUser);
        em.getTransaction().commit();
        log.info("user " + userId + " deleted successfully");
        return true;
      }else {
        log.info("user to be deleted " + userId + " not found");
        em.getTransaction().rollback();
        return false;
      }
    }catch (Exception e){
      log.error("deleting user " + userId + " failed due to " + e.getMessage());
      return false;
    }finally {
      em.close();
    }
  }

    public User findUserByEmail(String email){
      EntityManager em = getEm();
      log.info("finding user by email " + email);
      try{
        TypedQuery q = em.createQuery("SELECT a FROM User a WHERE a.email = ?1", User.class);
        q.setParameter(1, email);
        log.info("found single result with email: " + email);
        return (User)q.getSingleResult();
      }catch (Exception e){
        log.error("finding user with email " + email + " failed due to " + e.getMessage());
        return null;
      }finally {
        em.close();
      }
    }
  }
