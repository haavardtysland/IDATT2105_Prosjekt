package IDATT2105.Reservation.models;

import javax.persistence.*;
import org.eclipse.persistence.annotations.CascadeOnDelete;

@Entity
public class Section {
  @Id
  @Column(name = "seksjon_id")
  private int sectionId;
  @Column(name = "seksjon_navn")
  private String sectionName;
  @Column(name = "rom_id")
  private int roomId;

  public Section() {
  }

  public Section(int sectionId, String sectionName, int roomId) {
    this.sectionId = sectionId;
    this.sectionName = sectionName;
    this.roomId = roomId;
  }


  public int getSectionId() {
    return sectionId;
  }

  public void setSectionId(int sectionId) {
    this.sectionId = sectionId;
  }

  public String getSectionName() {
    return sectionName;
  }

  public void setSectionName(String sectionName) {
    this.sectionName = sectionName;
  }

  public int getRoomId() {
    return roomId;
  }

  public void setRoomId(int roomId) {
    this.roomId = roomId;
  }

  @Override
  public String toString() {
    return
        "{" +
            "\n \"sectionId\": " + sectionId + "," +
            "\n \"name\": \"" + sectionName + "\"," +
            "\n \"roomId\": \"" + roomId + "\"" +
            "\n}";
  }

}
