package IDATT2105.Reservation.controller;

import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.service.RoomService;
import IDATT2105.Reservation.util.Logger;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import static IDATT2105.Reservation.controller.ControllerUtil.formatJson;
import static IDATT2105.Reservation.controller.ControllerUtil.getRandomID;
import java.sql.Timestamp;
import java.util.*;

@CrossOrigin(origins = "*")
@Controller
@RequestMapping(value="/room")
public class RoomController {
    Logger log = new Logger(RoomController.class.toString());
    @Autowired
    private RoomService roomService;

    /**
     * @param map which is sent by the client on the format:
    {
        "name": STRING,
        "capacity": INT,
        "sections": [
        {
            "section_name": STRING,
            "capacity": INT
        },
        {
            "section_name": STRING,
            "capacity": INT
        }
        ]
    }
     * @return true if the room was succesfully added, false if not
     */
    @ApiOperation(value = "Add a room")
    @PostMapping(value="")
    public @ResponseBody
    ResponseEntity addRoom (@RequestBody HashMap<String, Object> map){
        log.info("Recieved postmappping to add room");
        HttpHeaders header = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        Room room = new Room();
        room.setRoom_id(getRandomID());
        room.setName(map.get("name").toString());
        room.setCapacity(Integer.parseInt(map.get("capacity").toString()));
        ArrayList<LinkedHashMap> sectionList = (ArrayList) map.get("sections");

        if(sectionList.size() == 0){
            Section section = new Section();
            section.setSectionName("hele rommet");
            section.setCapacity(room.getCapacity());
            section.setSectionId(getRandomID());
            section.setRoom(room);
            room.addSection(section);
        }
        else {
            ArrayList<Section> sections = toSectionList(sectionList, room);
            room.setSections(sections);
        }
        boolean result = roomService.addRoom(room);
        if(result){
            log.info("Posted room successfully");
            header.add("Status", "200 OK");
            body.put("room_id", Integer.toString(room.getRoom_id()));
            return ResponseEntity.ok().headers(header).body(formatJson(body));
        } else {
            log.error("Unable to post new room");
            body.put("error", "posting failed");
            header.add("Status", "40 BAD REQUEST");
            return ResponseEntity.badRequest().headers(header).body(formatJson(body));
        }
    }

    /**
     * Split ArrayList of LinkedHashMap with sections
     * @return a list of sections
     */
    private ArrayList<Section> toSectionList(ArrayList<LinkedHashMap> sectionList, Room room) {
        log.info("splitting sections");
        ArrayList<Section> sections = new ArrayList<>();
        for(LinkedHashMap section : sectionList) {
            Section newSection = new Section();
            newSection.setSectionName(section.get("section_name").toString());
            newSection.setCapacity(Integer.parseInt(section.get("capacity").toString()));
            if (section.get("section_id") == null) {
                newSection.setSectionId(getRandomID());
            } else if(Integer.parseInt(section.get("section_id").toString()) == 0) {
                newSection.setSectionId(getRandomID());
            } else {
                newSection.setSectionId(Integer.parseInt(section.get("section_id").toString()));
            }
            newSection.setRoom(room);
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
     *     "sections": [
     *            {
     *          "section_name": STRING,
     *          "capacity": INT
     *     }
     *            ]
     * }
     * @param room_id
     * @return
     */
    @ApiOperation(value = "Edit a room")
    @PutMapping(value="/edit/{room_id}")
    public @ResponseBody
    ResponseEntity editRoom(@RequestBody HashMap<String, Object> map, @PathVariable String room_id){
        log.info("Recieved put mapping for room with id " + room_id);
        HttpHeaders header = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        int id = Integer.parseInt(room_id);
        Room room = roomService.getRoom(id);
        String name = map.get("name").toString();
        int capacity = Integer.parseInt(map.get("capacity").toString());
        ArrayList<LinkedHashMap> sectionList = (ArrayList) map.get("sections");
        room.setCapacity(capacity);
        room.setName(name);
        ArrayList<Section> sections = toSectionList(sectionList, room);
        if(sections == null) {
            log.info("Capacity is full");
            header.add("STATUS", "400 BAD REQUEST");
            body.put("error", "Ikke nok kapasitet i rommet til alle seksjonene");
            return ResponseEntity.badRequest().headers(header).body(formatJson(body));
        }
        room.setSections(sections);
        boolean result = roomService.editRoom(room);
        if(result){
            log.info("Succesfully edited room with room_id " + room_id);
            header.add("STATUS", "200 OK");
            body.put("room_id", String.valueOf(room.getRoom_id()));
            return ResponseEntity.ok().headers(header).body(formatJson(body));
        }
        log.info("Something went wrong with editing room with room_id " + room_id);
        header.add("STATUS", "400 BAD REQUEST");
        return ResponseEntity.badRequest().headers(header).body(formatJson(body));
    }

    /**
     * Getting all the available rooms within the parameters
     * @param from_date the starting time of the search
     * @param to_date the end time of the search
     * @param capacity The wanted capacity
     * @return A ResponseEntity with the rooms that are available
     */
    @ApiOperation(value = "Get the available rooms within a timeframe and a given capacity")
    @GetMapping(value = "/{from_date}/{to_date}/{capacity}", produces="application/json")
    public ResponseEntity getAvailableRooms(@PathVariable String from_date, @PathVariable String to_date, @PathVariable String capacity){
        List<Room> rooms;
        HttpHeaders header = new HttpHeaders();
        long start = Long.parseLong(from_date);
        long end = Long.parseLong(to_date);
        int room_capacity = Integer.parseInt(capacity);
        Timestamp start_time = new Timestamp(start);
        Timestamp end_time = new Timestamp(end);
        try{
            rooms = roomService.getAvailableRooms(start_time, end_time, room_capacity);
            header.add("STATUS", "200 OK ");
            return ResponseEntity.ok().headers(header).body("{\"rooms\": \n" + rooms.toString() + "\n}");
        } catch(Exception e){
            log.info("Could not get available rooms due to " + e.getMessage());
            HashMap<String, String> body = new HashMap<>();
            header.add("STATUS", "400 BAD REQUEST");
            return ResponseEntity.badRequest().headers(header).body(formatJson(body));
        }
    }

    /**
     * Getting all the rooms in the database
     * @return A ResponseEntity with the rooms
     */
    @ApiOperation(value = "Get all the rooms")
    @GetMapping(value="", produces="application/json")
    public ResponseEntity getRooms(
    ) {
        List<Room> rooms;
        HttpHeaders header = new HttpHeaders();
        try {
            rooms = roomService.getRooms();
            header.add("STATUS", "200 OK");
            return ResponseEntity.ok().headers(header).body("{\"rooms\": \n" + rooms.toString() + "\n}");
        } catch (Exception e) {
            e.printStackTrace();
            log.error("An unexpected error was caught while getting all the rooms " + e.getCause() + " with message " + e.getMessage());
            HashMap<String, String> body = new HashMap<>();
            header.add("STATUS", "400 BAD REQUEST");
            body.put("error", "something went wrong");
            return ResponseEntity.badRequest().headers(header).body(formatJson(body));
        }
    }

    /**
     * Delete a room
     * @param room_id
     * @return ResponseEntity based on if the room could be deleted
     */
    @ApiOperation(value = "Delete a room")
    @DeleteMapping(value="/{room_id}")
    public @ResponseBody
    ResponseEntity deleteRoom(@PathVariable String room_id){
        Map<String, String> body = new HashMap<>();
        HttpHeaders header = new HttpHeaders();
        int id = Integer.parseInt(room_id);
        boolean result = roomService.deleteRoom(id);
        if(result){
            log.info("Deleting room with section_id " + room_id + " was a success");
            header.add("STATUS", "200 OK");
            return ResponseEntity.ok().headers(header).body(formatJson(body));
        }
        log.info("Something went wrong during deletion of room with room_id " + room_id);
        body.put("error", "room could not be deleted");
        header.add("STATUS", "400 BAD REQUEST");
        return ResponseEntity.badRequest().headers(header).body(formatJson(body));
    }

    @ApiOperation(value = "Get a certain room by it id")
    @GetMapping(value = "/{room_id}", produces= "application/json")
    public @ResponseBody ResponseEntity getRoom(@PathVariable String room_id){
        Room room;
        HttpHeaders header = new HttpHeaders();
        try {
            int id = Integer.parseInt(room_id);
            room = roomService.getRoom(id);
            header.add("Status", "200 OK");
            return ResponseEntity.ok().headers(header).body(room.toString());
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
