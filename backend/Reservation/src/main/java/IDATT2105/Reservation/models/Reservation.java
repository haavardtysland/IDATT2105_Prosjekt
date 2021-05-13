package IDATT2105.Reservation.models;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Reservation {

  @Id
  @Column(name = "seksjon_id")
  private Section section;
  @Column(name = "fra_dato")
  private Date fromDate;
  @Column(name = "til_dato")
  private Date toDate;
  @Id
  @Column(name = "bruker_id")
  private User user;
  @Column(name = "antall_personer")
  private int capacity;
  @Column(name = "beskjed")
  private String description;

  public Reservation() {

  }

  public Reservation(Section section, Date fromDate, Date toDate, User user, int capacity,
                     String description) {
    this.section = section;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.user = user;
    this.capacity = capacity;
    this.description = description;
  }

  public Section getSection() {
    return section;
  }

  public void setSectionId(int sectionId) {
    this.section = section;
  }

  public Date getFromDate() {
    return fromDate;
  }

  public void setFromDate(Date fromDate) {
    this.fromDate = fromDate;
  }

  public Date getToDate() {
    return toDate;
  }

  public void setToDate(Date toDate) {
    this.toDate = toDate;
  }

  public User getUser() {
    return user;
  }

  public void setUser(int userId) {
    this.user = user;
  }

  public int getCapacity() {
    return capacity;
  }

  public void setCapacity(int capacity) {
    this.capacity = capacity;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @Override
  public String toString() {
    return
        "{" +
            "\n \"sectionId\": " + section + "," +
            "\n \"fromDate\": \"" + fromDate + "\"," +
            "\n \"toDate\": \"" + toDate + "\"," +
            "\n \"userId\": " + user + "," +
            "\n \"capacity\": \"" + capacity + "\"" +
            "\n \"description\": \"" + description + "\"" +
            "\n}";
  }
}
