package IDATT2105.Reservation.models;

import javax.persistence.*;

@Entity
@Table(name = "section")
public class Section {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "section_id")
  private int section_id;

  @Column(name = "section_name")
  private String section_name;

  @ManyToOne(fetch = FetchType.EAGER)
  private Room room;

  public Section() {
  }

  public Section(String name, Room room) {
    this.section_name = name;
    this.room = room;
  }

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
    return section_name;
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

  public void resetRoom() {
    this.room = null;
  }



  @Override
  public String toString() {
    return
        "{" +
            "\n \"section_id\": " + section_id + "," +
            "\n \"section_name\": \"" + section_name + "\"," +
            "\n}";
  }

}
