package IDATT2105.Reservation.models;


import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.apache.tomcat.util.codec.binary.Base64;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import javax.persistence.*;
import org.apache.commons.codec.binary.Hex;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;

@Entity
public class User {
  @Id
  @Column(name = "userId")
  private int userId;
  @Column(name = "firstName")
  private String firstName;
  @Column(name = "sureName")
  private String surname;
  @Column(name = "email", unique = true)
  private String email;
  @Column(name = "password")
  private String password;
  @Column(name = "isAdmin")
  private Boolean isAdmin;
  @Column(name = "validDate")
  private Date validDate;
  @Column(name = "phoneNumber")
  private int phoneNumber;
  @CascadeOnDelete
  @OneToMany(targetEntity = Reservation.class, mappedBy="user", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Reservation> reservations = new ArrayList<>();

  @CascadeOnDelete
  @OneToMany(targetEntity = Message.class, mappedBy="user", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Message> messages = new ArrayList<>();
  private String salt;

  public User() {
  }

  public User(int id, String firstName, String surname, String email, Boolean isAdmin, Date validDate, String password,
              int phoneNumber) {
    this.userId = id;
    this.firstName = firstName;
    this.surname = surname;
    this.email = email;
    this.isAdmin = isAdmin;
    this.validDate = validDate;
    this.phoneNumber = phoneNumber;
    //generates random salt
    SecureRandom random = new SecureRandom();
    byte[] salt = new byte[16];
    random.nextBytes(salt);

    char[] passwordChars = password.toCharArray();
    byte[] hashedBytes = hashPassword(passwordChars, salt);

    //convert hashed password to string to store in database
    String hashedString = Hex.encodeHexString(hashedBytes);
    //convert byte to string
    this.salt = org.apache.commons.codec.binary.Base64.encodeBase64String(salt);
    this.password = hashedString;
  }

  private byte[] hashPassword(final char[] password, final byte[] salt) {
    //high iterations slows down algorithm
    int iterations = 10000;
    int keyLength = 512;

    try {
      SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
      //encodes password
      PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, keyLength);
      SecretKey key = skf.generateSecret(spec);
      return key.getEncoded();
    } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
      throw new IllegalArgumentException(e);
    }
  }

  public boolean verifyPassword(String testPassword) {
    //the password that is to be tested
    if (testPassword == null) {
      return false;
    }
    char[] passwordChars = testPassword.trim().toCharArray();
    byte[] saltBytes = Base64.decodeBase64(salt);
    byte[] hashedBytes = hashPassword(passwordChars, saltBytes);
    String hashedString = Hex.encodeHexString(hashedBytes);
    return (hashedString.equals(password));
  }

  public int getUserId() {
    return userId;
  }

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getSurname() {
    return surname;
  }

  public Boolean getIsAdmin() {
    return isAdmin;
  }

  public Date getValidDate() {
    return validDate;
  }

  public int getPhoneNumber() {
    return phoneNumber;
  }

  public String getSalt() {
    return salt;
  }

  public void setId(int id) {
    this.userId = id;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public void setSurname(String surname) {
    this.surname = surname;
  }

  public void setIsAdmin(Boolean isAdmin) {
    this.isAdmin = isAdmin;
  }

  public void setValidDate(Date validDate) {
    this.validDate = validDate;
  }


  public void setPhoneNumber(int phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public void setSalt(String salt) {
    this.salt = salt;
  }



  public void removeReservation(Reservation reservation) {
    for(int i = 0; i < this.reservations.size(); i++) {
      if(this.reservations.get(i).getReservation_id() == reservation.getReservation_id()) {
        this.reservations.remove(i);
      }
    }
    reservation.setSection(null);
  }

  public void addReservation(Reservation reservation) {
    reservation.setUser(this);
    this.reservations.add(reservation);
  }

  public void removeMesage(Message message) {
    for(int i = 0; i < this.messages.size(); i++) {
      if(this.messages.get(i).getMessageId() == message.getMessageId()) {
        this.reservations.remove(i);
      }
    }
    message.setUser(null);
  }

  public void addMessage(Message message) {
    message.setUser(this);
    this.messages.add(message);
  }

  public String toJSON() {
    return "\n  {" +
        "\n     \"userId\":" + userId + "," +
        "\n     \"firstName\":" + '\"' + firstName + '\"' + "," +
        "\n     \"surname\":" + '\"' + surname + '\"' + "," +
        "\n     \"email\":" + '\"' + email + '\"' + "," +
        "\n     \"isAdmin\":" + '\"' + isAdmin + '\"' + "," +
        "\n     \"validDate\":" + '\"' + validDate + '\"' + "," +
        "\n     \"phoneNumber\":" + '\"' + phoneNumber + '\"' +
        "\n }";
  }

  public String toString() {
    return "\n  {" +
        "\n     \"userId\":" + userId + "," +
        "\n     \"firstName\":" + '\"' + firstName + '\"' + "," +
        "\n     \"surname\":" + '\"' + surname + '\"' + "," +
        "\n     \"email\":" + '\"' + email + '\"' + "," +
        "\n     \"isAdmin\":" + '\"' + isAdmin + '\"' + "," +
        "\n     \"validDate\":" + '\"' + validDate + '\"' + "," +
        "\n     \"phoneNumber\":" + '\"' + phoneNumber + '\"' +
        "\n }";
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    User user = (User) o;
    return userId == user.userId && phoneNumber == user.phoneNumber &&
        email.equals(user.email) && password.equals(user.password) &&
        firstName.equals(user.firstName) && surname.equals(user.surname);
  }
}
