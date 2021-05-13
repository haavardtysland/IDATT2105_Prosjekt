package IDATT2105.Reservation.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private int room_id = 0;
    @Column(name = "name")
    private String name;
    @Column(name = "capacity")
    private int capacity;
    @OneToMany(mappedBy="room", fetch=FetchType.EAGER, cascade = {CascadeType.ALL}, orphanRemoval = true)
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

    public void removeSection(Section section) {
        section.resetRoom();
        this.sections.remove(section);
    }

    public void addSection(Section section) {
        section.setRoom(this);
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
