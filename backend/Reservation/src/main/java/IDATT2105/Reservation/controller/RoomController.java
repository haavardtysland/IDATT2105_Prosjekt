package IDATT2105.Reservation.controller;

import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@Controller
@RequestMapping(value="/room")
public class RoomController {
    @Autowired
    private RoomRepo repo;

    @PostMapping(path="/add")
    public @ResponseBody
    boolean addRoom (@RequestParam int rom_id, @RequestParam String navn, @RequestParam int antall_plasser){
        Room room = new Room();
        room.setRom_id(rom_id);
        room.setNavn(navn);
        room.setAntall_plasser(antall_plasser);
        return repo.addRoom(room);
    }

    @GetMapping(value="")
    public ResponseEntity GetRooms(
    ) {
        List<Room> rooms;
        try {
            System.out.println("hei");
            rooms = repo.getRooms();
            return ResponseEntity.ok().body("{\"rooms\": \n" + rooms.toString() + "\n");
        } catch (Exception e) {

        }
        return null;
    }

}
