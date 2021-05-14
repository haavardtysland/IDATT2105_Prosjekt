package IDATT2105.Reservation.service;

import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.repo.RoomRepo;
import IDATT2105.Reservation.util.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RoomService {
    private Logger log = new Logger(RoomService.class.toString());
    @Autowired
    private RoomRepo repo;

    public boolean addRoom(Room room) {
        log.info("Adding new room " + room);
        return this.repo.addRoom(room);
    }

    public ArrayList<Room> getRooms(){
        log.info("Getting all rooms");
        return this.repo.getRooms();
    }

    public boolean editRoom(int room_id, String name, int capacity){
        log.info("Editing room with room_id " + room_id);
        return this.repo.editRoom(room_id, name, capacity);
    }

    public Room getRoom(int room_id) {
        log.info("Finding room with room_id " + room_id);
        return this.repo.getRoom(room_id);
    }

    public boolean addSection(Room room){
        log.info("Adding section to room " + room);
        return this.repo.addSection(room);
    }

}
