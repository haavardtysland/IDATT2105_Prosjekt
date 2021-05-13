package IDATT2105.Reservation.controller;

import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.repo.RoomRepo;
import IDATT2105.Reservation.service.RoomService;
import IDATT2105.Reservation.util.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping(value="/room")
public class RoomController {
    Logger log = new Logger(RoomController.class.toString());
    @Autowired
    private RoomService service;

    @PostMapping(value="/add")
    public @ResponseBody
    boolean addRoom (@RequestBody HashMap<String, Object> map){
        Map<String, String> body = new HashMap<>();
        Room room = new Room();
        room.setName(map.get("name").toString());
        Set<String> keySet = map.keySet();
        room.setCapacity(Integer.parseInt(map.get("capacity").toString()));
        String sectionString = map.get("sections").toString();
        room.setSections(toSectionList(sectionString));
        return service.addRoom(room);
    }

    /**
     * Split csv string with sections
     * @return
     */
    private List<Section> toSectionList(String sectionString) {
        log.info("splitting sections");
        ArrayList<Section> sections = new ArrayList<>();
        for (String name : sectionString.split(",")) {
            name = name.toLowerCase();
            Section section = new Section(name);
            sections.add(section);
        }

        log.debug("final section list: " + sections.toString());
        return sections;
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
