package IDATT2105.Reservation.service;

import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RoomService {
    @Autowired
    private RoomRepo repo;

    public boolean addRoom(Room room) {
        return this.repo.addRoom(room);
    }

    public ArrayList<Room> getRooms(){
        return this.repo.getRooms();
    }

}
