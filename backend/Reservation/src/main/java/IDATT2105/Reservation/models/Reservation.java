package IDATT2105.Reservation.models;

import javax.annotation.processing.Generated;
import javax.persistence.*;
import java.sql.Date;

@Entity
public class Reservation {

  @Id
  @Column(name = "reservation_id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int reservation_id;
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "section_id")
  private Section section;
  @Column(name = "from_date")
  private Date from_date;
  @Column(name = "to_date")
  private Date to_date;
  @OneToOne
  @JoinColumn(name = "user_id")
  private User user;
  @Column(name = "capacity")
  private int capacity;
  @Column(name = "description")
  private String description;

  public Reservation() {
  }

  public Reservation(Section section, Date from_date, Date to_date, User user, int capacity,
                     String description) {
    this.section = section;
    this.from_date = from_date;
    this.to_date = to_date;
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
    return from_date;
  }

  public void setFromDate(Date fromDate) {
    this.from_date = fromDate;
  }

  public Date getToDate() {
    return to_date;
  }

  public void setToDate(Date toDate) {
    this.to_date = toDate;
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
            "\n \"section\": " + section + "," +
            "\n \"from_date\": \"" + from_date + "\"," +
            "\n \"to_date\": \"" + to_date + "\"," +
            "\n \"user\": " + user + "," +
            "\n \"capacity\": \"" + capacity + "\"" +
            "\n \"description\": \"" + description + "\"" +
            "\n}";
  }
}
