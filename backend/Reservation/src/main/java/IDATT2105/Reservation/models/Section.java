package IDATT2105.Reservation.models;

@Entity
public class Section {
  @Id
  @Column(name = "seksjons_id")
  private int sectionId;
  @Column(name = "seksjons_navn")
  private String sectionName;
  @Column(name = "rom_id")
  private Room room; //eller private romId???????????

  public Section() {
  }

  public Section(int sectionId, String sectionName, Room room) {
    this.sectionId = sectionId;
    this.sectionName = sectionName;
    this.room = room;
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

  public Room getRoom() {
    return room;
  }

  public void setRoom(Room room) {
    this.room = room;
  }

  @Override
  public String toString() {
    return
        "{" +
            "\n \"sectionId\": " + sectionId + "," +
            "\n \"name\": \"" + sectionName + "\"," +
            "\n \"room\": \"" + room + "\"" +
            "\n}";
  }

}
