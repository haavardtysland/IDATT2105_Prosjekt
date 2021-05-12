package IDATT2105.Reservation.models;

import java.util.Base64;

@Entity
public class Room {
    @Id
    @Column(name = "rom_id")
    private int roomId;
    @Column(name = "navn")
    private String name;
    @Column(name = "antall_plasser")
    private int capacity;

    public Room() {

    }

    public Room(int roomId, String name, int capacity) {
      this.roomId = roomId;
      this.name = name;
      this.capacity = capacity;

    }

    public int getRoomId() {
      return roomId;
    }

    public void setRoomId(int roomId) {
      this.roomId = roomId;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public int getCapacity() {
      return capacity;
    }

    public void setCapacity(int capacity) {
      this.capacity = capacity;
    }

    @Override
    public String toString() {
      return
          "{" +
              "\n \"roomId\": " + roomId + "," +
              "\n \"name\": \"" + name + "\"," +
              "\n \"capacity\": \"" + capacity + "\"" +
              "\n}";
    }
}
