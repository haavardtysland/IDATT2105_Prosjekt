package IDATT2105.Reservation.models;

import javax.persistence.*;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private int room_id = 0;
    @Column(name = "name")
    private String name;
    @Column(name = "available")
    private int available;

    public int getRoom_id() {
        return room_id;
    }

    public String getName() {
        return name;
    }

    public int getAvailable() {
        return available;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAvailable(int available) {
        this.available = available;
    }

    public void setRoom_id(int room_id) {
        this.room_id = room_id;
    }

    public String toString() {
        return "{" +
                "\n\"name\": " + "\"" + name + "\"" +
                ", \n\"available\":" + available +

                "}";

    }


}
