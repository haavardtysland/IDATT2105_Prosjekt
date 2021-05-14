package IDATT2105.Reservation.controller;

import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.service.RoomService;
import IDATT2105.Reservation.util.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import static IDATT2105.Reservation.controller.ControllerUtil.formatJson;


import java.util.*;

@Controller
@RequestMapping(value="/room")
public class RoomController {
    Logger log = new Logger(RoomController.class.toString());
    @Autowired
    private RoomService service;

    /**
     * @param map which is sent by the client on the format:
     * {
     *     "name": "String",
     *     "capacity": INT,
     *     "sections": [{
     *             "section_name": STRING,
     *             "capacity": INT
     *     },
     *     {
     *         "section_name": STRING,
     *         "capacity": INT
     *     }]
     * }
     * @return true if the room was succesfully added, false if not
     */
    @PostMapping(value="/add")
    public @ResponseBody
    ResponseEntity addRoom (@RequestBody HashMap<String, Object> map){
        log.info("Recieved postmappping to add room");
        HttpHeaders header = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        Room room = new Room();
        room.setName(map.get("name").toString());
        room.setCapacity(Integer.parseInt(map.get("capacity").toString()));
        ArrayList<LinkedHashMap> sectionList = (ArrayList) map.get("sections");

        room.setSections(toSectionList(sectionList, room));
        boolean result = service.addRoom(room);
        if(result){
            log.info("Posted room successfully");
            header.add("Status", "200 OK");
            return ResponseEntity.ok().headers(header).body(formatJson(body));
        } else {
            log.error("Unable to post new room");
            body.put("error", "posting failed");
            header.add("Status", "40 BAD REQUEST");
            return ResponseEntity.badRequest().headers(header).body(formatJson(body));
        }
    }

    /**
     * Split csv string with sections
     * @return a list of sections
     */
    private ArrayList<Section> toSectionList(ArrayList<LinkedHashMap> sectionList, Room room) {
        log.info("splitting sections");
        ArrayList<Section> sections = new ArrayList<>();
        for(LinkedHashMap section : sectionList) {
            Section newSection = new Section();
            newSection.setRoom(room);
            newSection.setSectionName(section.get("section_name").toString());
            newSection.setCapacity(Integer.parseInt(section.get("capacity").toString()));
            sections.add(newSection);
        }
        log.debug("final section list: " + sections.toString());
        return sections;
    }

    /**
     *
     * @param map sent by the client as json on the format
     * {
     *     "name": "String",
     *     "capacity": INT,
     * }
     * @param room_id
     * @return
     */
    @PutMapping(value="/edit/{room_id}")
    public @ResponseBody
    ResponseEntity editRoom(@RequestBody HashMap<String, Object> map, @PathVariable String room_id){
        log.info("Recieved put mapping for room with id " + room_id);
        HttpHeaders header = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        int id = Integer.parseInt(room_id);
        String name = map.get("name").toString();
        int capacity = Integer.parseInt(map.get("capacity").toString());
        boolean result = service.editRoom(id, name, capacity);
        //TODO ADD EDITING SECTIONS
        /*String sectionString = map.get("sections").toString();
        ArrayList<Section> sections = toSectionList()*/
        if(result){
            log.info("Sucesfully edited room with room_id " + room_id);
            header.add("STATUS", "200 OK");
            return ResponseEntity.ok().headers(header).body(formatJson(body));
        }
        log.info("Something went wrong with editing room with room_id " + room_id);
        header.add("STATUS", "400 BAD REQUEST");
        return ResponseEntity.ok().headers(header).body(formatJson(body));
    }

    /**
     * Getting all the rooms in the database
     * @return A ResponseEntity with the rooms
     */
    @GetMapping(value="", produces="application/json")
    public ResponseEntity GetRooms(
    ) {
        List<Room> rooms;
        HttpHeaders header = new HttpHeaders();
        try {
            rooms = service.getRooms();
            header.add("Status", "200 OK");
            return ResponseEntity.ok().headers(header).body("\"rooms\": \n" + rooms.toString() + "\n");
        } catch (Exception e) {
            e.printStackTrace();
            log.error("An unexpected error was caught while getting all the rooms " + e.getCause() + " with message " + e.getMessage());
            HashMap<String, String> body = new HashMap<>();
            header.add("Status", "400 BAD REQUEST");
            body.put("error", "something went wrong");
            return ResponseEntity.badRequest().headers(header).body(formatJson(body));
        }
    }
}
