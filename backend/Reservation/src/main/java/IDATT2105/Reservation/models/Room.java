package IDATT2105.Reservation.models;

import io.swagger.annotations.ApiModel;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@ApiModel(description = "Room model")
@Entity
public class Room {
    @Id
    @Column(name = "room_id")
    private int room_id;
    @Column(name = "name")
    private String name;
    @Column(name = "capacity")
    private int capacity;
    @CascadeOnDelete
    @OneToMany(targetEntity = Section.class, mappedBy="room", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Section> sections = new ArrayList<>();

    public Room(int room_id, String name, int capacity) {
        this.room_id = room_id;
        this.name = name;
        this.capacity = capacity;
    }

    public Room(){}

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

    public void setSections(ArrayList<Section> sections) {
        this.sections = sections;
    }

    public void removeSection(Section section) {
        for(int i = 0; i < this.sections.size(); i++) {
            System.out.println(this.sections.get(i).getSectionId());
            if(this.sections.get(i).getSectionId() == section.getSectionId()) {
                this.sections.remove(i);
            }
        }
        section.setRoom(null);
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

    public int getSectionCapacaties(){
        int capacities = 0;
        for(Section section : this.sections){
            capacities += section.getCapacity();
        }
        return capacities;
    }

    public String toString() {
        return "{" +
                "\n\"room_id\": "  + room_id  +
                ",\n\"name\": " + "\"" + name + "\"" +
                ",\n\"capacity\":" + capacity +
                ",\n\"sections\":" + sections.toString()  +
                "\n}";
    }
}
