package IDATT2105.Reservation.models;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

  @OneToMany(targetEntity = Reservation.class, mappedBy="section", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Reservation> reservations;

  public Section(int section_id, String section_name, int capacity) {
    this.section_id = section_id;
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
                "\n\"capacity\":" + capacity +
            "\n}";
  }

  public String toJSON() {
    return
        "{" +
            "\n \"section_id\": " + section_id + "," +
            "\n \"section_name\": \"" + section_name + "\"," +
            "\n\"capacity\":" + capacity +
            "\n}";
  }

}
