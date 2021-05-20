package IDATT2105.Reservation.models;

import io.swagger.annotations.ApiModel;
import org.eclipse.persistence.annotations.CascadeOnDelete;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@ApiModel(description = "Section model")
@Entity
public class Section {
  @Id
  @Column(name = "section_id")
  private int section_id;

  @Column(name = "section_name")
  private String section_name;

  @Column(name = "capacity")
  private int capacity;

  @CascadeOnDelete
  @ManyToOne(targetEntity = Room.class)
  private Room room;

  @CascadeOnDelete
  @OneToMany(targetEntity = Reservation.class, mappedBy="section", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Reservation> reservations = new ArrayList<>();

  @CascadeOnDelete
  @OneToMany(targetEntity = Message.class, mappedBy="section", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Message> messages = new ArrayList<>();

  public Section( String section_name, int capacity) {
    this.section_name = section_name;
    this.capacity = capacity;
  }

  public Section(String name, int capacity, Room room) {
    this.section_name = name;
    this.capacity = capacity;
    this.room = room;
  }

  public Section(){}

  public Section(String name) {
    this.section_name = name;
  }


  public int getSectionId() {
    return section_id;
  }

  public void setSectionId(int sectionId) {
    this.section_id = sectionId;
  }

  public String getSectionName() {
    return this.section_name;
  }

  public void setSectionName(String sectionName) {
    this.section_name = sectionName;
  }

  public Room getRoom(){
    return this.room;
  }

  public void setRoom(Room room) {
    this.room = room;
  }

  public int getCapacity() {
    return this.capacity;
  }

  public void setCapacity(int capacity){
    this.capacity = capacity;
  }


  public List<Message> getMessages() {
    return messages;
  }
  public void setMessages(List<Message> messages) {
    this.messages = messages;
  }

  public void removeMessage(Message message) {
    for(int i = 0; i < this.messages.size(); i++) {
      if(this.messages.get(i).getMessageId() == message.getMessageId()) {
        this.messages.remove(i);
      }
    }
    message.setSection(null);
  }

  public void addMessage(Message message) {
    message.setSection(this);
    this.messages.add(message);
  }

  public List<Reservation> getReservations() {
    return reservations;
  }

  public void setReservations(List<Reservation> reservations) {
    this.reservations = reservations;
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
    reservation.setSection(this);
    this.reservations.add(reservation);
  }

  @Override
  public String toString() {
      return
              "{" +
                      "\n \"section_id\": " + section_id + "," +
                      "\n \"section_name\": \"" + section_name + "\"," +
                      "\n\"capacity\":" + capacity + "," +
                      "\n\"messages\":" + messages.toString() +
                      "\n}";
  }

  public String toJSON() {
    return "\n {" +
            "\n \"section_id\": " + section_id + "," +
            "\n \"section_name\": \"" + section_name + "\"," +
            "\n\"capacity\":" + capacity + "," +
            "\n\"messages\":" + messages.toString() +
            "\n}";
  }
}
