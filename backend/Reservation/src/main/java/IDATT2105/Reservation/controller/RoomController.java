package IDATT2105.Reservation.controller;

import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.repo.RoomRepo;
import IDATT2105.Reservation.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Controller
@RequestMapping(value="/room")
public class RoomController {
    @Autowired
    private RoomService service;

    @PostMapping(path="/add")
    public @ResponseBody
    boolean addRoom (@RequestBody HashMap<String, Object> map){
        Map<String, String> body = new HashMap<>();

        Room room = new Room();
        room.setRoom_id(Integer.parseInt(map.get("room_id").toString()));
        room.setName(map.get("name").toString());
        room.setAvailable(Integer.parseInt(map.get("available").toString()));
        return service.addRoom(room);
    }

    @GetMapping(value="", produces="application/json")
    public ResponseEntity GetRooms(
    ) {
        List<Room> rooms;
        try {
            rooms = service.getRooms();
            return ResponseEntity.ok().body("{\"rooms\": \n" + rooms.toString() + "\n");
        } catch (Exception e) {

        }
        return null;
    }

}
