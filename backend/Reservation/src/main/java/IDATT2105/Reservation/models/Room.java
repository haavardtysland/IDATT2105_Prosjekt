package IDATT2105.Reservation.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id", unique = true)
    private int room_id = 0;
    @Column(name = "name")
    private String name;
    @Column(name = "capacity")
    private int capacity;
    @OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.PERSIST)
    private List<Section> sections = new ArrayList<>();

    public int getRoom_id() {
        return room_id;
    }

    public String getName() {
        return name;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Section> getSections() {
        return this.sections;
    }

    public void setSections(List<Section> sections) {
        this.sections = sections;
    }

    public void addSection(Section section) {
        this.sections.add(section);
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public void setRoom_id(int room_id) {
        this.room_id = room_id;
    }

    public String toString() {
        return "{" +
                "\n\"room_id\": " + "\"" + room_id + "\"" +
                ",\n\"name\": " + "\"" + name + "\"" +
                ",\n\"capacity\":" + capacity +
                "\n\"sections:\":" + sections + "\"" +
                "\n\"}";
    }
}
