package IDATT2105.Reservation.models;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import java.sql.Time;
import java.sql.Timestamp;
import javax.annotation.processing.Generated;
import javax.persistence.*;

@Entity
public class Reservation {

  @Id
  @Column(name = "reservation_id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int reservation_id;
  @CascadeOnDelete
  @ManyToOne(targetEntity = Section.class)
  @JoinColumn(name = "section_id")
  private Section section;
  @Column(name = "from_date")
  private Timestamp from_date;
  @Column(name = "to_date")
  private Timestamp to_date;
  @CascadeOnDelete
  @ManyToOne(targetEntity = User.class)
  @JoinColumn(name = "user_id")
  private User user;
  @Column(name = "capacity")
  private int capacity;
  @Column(name = "description")
  private String description;

  public Reservation() {
  }

  public Reservation(int reservation_id, Section section, Timestamp from_date, Timestamp to_date, User user, int capacity,
                     String description) {
    this.reservation_id = reservation_id;
    this.section = section;
    this.from_date = from_date;
    this.to_date = to_date;
    this.user = user;
    this.capacity = capacity;
    this.description = description;
  }

  public Reservation(Reservation reservation){
    this.reservation_id = reservation.reservation_id;
    this.section = reservation.section;
    this.from_date = reservation.from_date;
    this.to_date = reservation.to_date;
    this.user = reservation.user;
    this.capacity = reservation.capacity;
    this.description = reservation.description;
  }


  public int getReservation_id() {return reservation_id; }

  public void setReservation_id(int reservation_id) {
    this.reservation_id = reservation_id;
  }

  public Section getSection() {
    return section;
  }

  public void setSection(Section section) {
    this.section = section;
  }

  public Timestamp getFromDate() {
    return from_date;
  }

  public void setFromDate(Timestamp fromDate) {
    this.from_date = fromDate;
  }

  public Timestamp getToDate() {
    return to_date;
  }

  public void setToDate(Timestamp toDate) {
    this.to_date = toDate;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
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
            "\n\"reservationId\": " + reservation_id + "," +
            "\n \"section\": " + section.toJSON() + "," +
            "\n \"from_date\":" + from_date + "," +
            "\n \"to_date\": " + to_date + "," +
            "\n \"user\": " + user.toJSON() + "," +
            "\n \"capacity\": " + capacity + ","+
            "\n \"description\": " + description +
            "\n}";
  }
}
