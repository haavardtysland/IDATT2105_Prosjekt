package IDATT2105.Reservation.controller;


import IDATT2105.Reservation.models.Message;
import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.models.User;
import IDATT2105.Reservation.service.RoomService;
import IDATT2105.Reservation.service.SectionService;
import IDATT2105.Reservation.service.UserService;
import IDATT2105.Reservation.util.Logger;
import IDATT2105.Reservation.util.PathTokenRequired;
import java.sql.Timestamp;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import static IDATT2105.Reservation.controller.ControllerUtil.formatJson;
import static IDATT2105.Reservation.controller.ControllerUtil.getRandomID;
import java.util.*;

@CrossOrigin(origins = "*")
@Controller
@RequestMapping(value="/section")
public class SectionController {

    Logger log = new Logger(SectionController.class.toString());

    @Autowired
    private SectionService sectionService;
    @Autowired
    private RoomService roomService;
    @Autowired
    private UserService userService;

    @ApiOperation(value = "Delete a message")
    @PathTokenRequired
    @DeleteMapping(value="/message/{message_id}")
    public @ResponseBody
    ResponseEntity deleteMessage(@PathVariable String message_id) {
        Map<String, String> body = new HashMap<>();
        HttpHeaders header = new HttpHeaders();
        int messageId = Integer.parseInt(message_id);
        boolean result =  sectionService.deleteMessage(messageId);
        if(result){
            log.info("Deleting message with messageId " + messageId);
            header.add("STATUS", "200 OK");
            return ResponseEntity.ok().headers(header).body(formatJson(body));
        }
        log.info("Something went wrong during deletion of message with messageId " + messageId);
        body.put("error", "message could not be deleted");
        header.add("STATUS", "400 BAD REQUEST");
        return ResponseEntity.badRequest().headers(header).body(formatJson(body));
    }

    /**
     * Adding a massage to section
     *  {
     *     "user_id": 1819766832,
     *     "message": "test"
     * }
     * @param map
     * @param section_id
     * @return confirmation and id
     */
    @ApiOperation(value = "Add a message for a section")
    @PostMapping(value="/{section_id}/message", produces="application/json")
    public @ResponseBody
    ResponseEntity addMessage(@RequestBody HashMap<String, Object> map, @PathVariable String section_id) {
        Map<String, String> body = new HashMap<>();
        HttpHeaders header = new HttpHeaders();
        int id = Integer.parseInt(section_id);
        Section section = sectionService.getSection(id);
        if(section == null){
            header.add("Status", "400 BAD REQUEST");
            body.put("error", "Adding message to section " + id + " failed, are you sure the section exists?");
            return ResponseEntity.badRequest().headers(header).body(formatJson(body));
        }
        Message message = new Message();
            message.setMessageId(getRandomID());
            User user = userService.getUser(Integer.parseInt(map.get("user_id").toString()));
            message.setUser(user);
            message.setSection(section);
            message.setMessage(map.get("message").toString());
            Timestamp currentTime = new Timestamp(new Date().getTime());
            message.setTimeCreated(currentTime);
            section.addMessage(message);
            user.addMessage(message);

        boolean result =  sectionService.addMessage(section);
        if(result){
            log.info("Sucesfully added message to section " + id);
            header.add("Status", "200 OK");
            return ResponseEntity.ok().headers(header).body(message.toString());
        } else {
            log.info("Something went wrong while adding message to section " + id);
            header.add("Status", "400 BAD REQUEST");
            body.put("error", "Something went wrong while adding message to section " + id);
            return ResponseEntity.ok().headers(header).body(formatJson(body));
        }
    }

    /**
     *
     * @param map which is sent by the client on the format:
     *            "sections": [
     *            {
     *            "section_name": STRING,
     *            "capacity": INT
     *            }]
     * @param room_id the room that the admin wants to add sections to
     * @return true if the sections can be added, false if not
     */
    @ApiOperation(value = "Add one or more sections to a room")
    @PostMapping(value="/{room_id}", produces="application/json")
    public @ResponseBody
    ResponseEntity addSections(@RequestBody HashMap<String, Object> map, @PathVariable String room_id) {
        Map<String, String> body = new HashMap<>();
        HttpHeaders header = new HttpHeaders();
        int id = Integer.parseInt(room_id);
        Room room = roomService.getRoom(id);
        if(room == null){
            header.add("Status", "400 BAD REQUEST");
            body.put("error", "Adding section to room " + id + " failed, are you sure the room exists?");
            return ResponseEntity.badRequest().headers(header).body(formatJson(body));
        }
         ArrayList<LinkedHashMap> sectionList = (ArrayList) map.get("sections");
         ArrayList<Section> sections = new ArrayList<>();
         for(LinkedHashMap section : sectionList) {
             Section newSection = new Section();
             newSection.setSectionId(getRandomID());
             newSection.setRoom(room);
             newSection.setSectionName(section.get("section_name").toString());
             newSection.setCapacity(Integer.parseInt(section.get("capacity").toString()));
             sections.add(newSection);
             room.addSection(newSection);
         }
        boolean result =  roomService.addSection(room);
        if(result){
            log.info("Sucesfully added sections to room " + id);
            header.add("Status", "200 OK");
            return ResponseEntity.ok().headers(header).body(formatJson(body));
        } else {
            log.info("Something went wrong while adding sections to room " + id);
            header.add("Status", "400 BAD REQUEST");
            body.put("error", "Something went wrong while adding sections to room " + id);
            return ResponseEntity.ok().headers(header).body(formatJson(body));
        }
    }


    /**
     * Getting all the taken times for a section
     * @param section_id section_id of the section you would like to check
     * @return A json object on the form, which represents the ms the section has been reserved for this period:
     * {
     * "time: 18000
     * }
     */
    @ApiOperation(value = "Get the statistics for a section within a timeframe")
    @GetMapping(value="/{section_id}/{from_date}/{to_date}", produces="application/json")
    public ResponseEntity getSectionStatistics(@PathVariable String section_id, @PathVariable String from_date, @PathVariable String to_date){
        Map<String, String> body = new HashMap<>();
        HttpHeaders header = new HttpHeaders();
        try{
            log.info("Getting section with section id " + section_id);
            int id = Integer.parseInt(section_id);
            long start = Long.parseLong(from_date);
            long end = Long.parseLong(to_date);
            Timestamp start_time = new Timestamp(start);
            Timestamp end_time = new Timestamp(end);
            Long hours_used = sectionService.getSectionStatistics(id, start_time, end_time);
            if(hours_used == -1L) {
                header.add("STATUS", "400 BAD REQUEST");
                body.put("error", "Are you sure there is a section with id " + id + "?")          ;
                return ResponseEntity.ok().headers(header).body(formatJson(body));
            }
            header.add("STATUS", "200 OK");
            return ResponseEntity.ok().headers(header).body("{\n\"time\": " + hours_used + "\n}");
        }  catch(Exception e) {
            log.info("Something went wrong while getting section with section_id " + section_id);
            header.add("STATUS", "400 BAD REQUEST");
            body.put("error", "Something went wrong while getting section with section_id " + section_id);
            return ResponseEntity.badRequest().headers(header).body(formatJson(body));
        }
    }

    @ApiOperation(value = "Get the all the sections")
    @GetMapping(value="", produces="application/json")
    public ResponseEntity getSections(){
        List<Section> sections;
        HttpHeaders header = new HttpHeaders();
        try {
            sections = sectionService.getSections();
            header.add("STATUS", "200 OK");
            return ResponseEntity.ok().headers(header).body("{\"sections\": \n" + sections.toString() + "\n}");
        } catch (Exception e) {
            e.printStackTrace();
            log.error("An unexpected error was caught while getting all the sections " + e.getCause() + " with message " + e.getMessage());
            HashMap<String, String> body = new HashMap<>();
            header.add("STATUS", "400 BAD REQUEST");
            body.put("error", "something went wrong");
            return ResponseEntity.badRequest().headers(header).body(formatJson(body));
        }
    }

    @ApiOperation(value = "Get a section by its id")
    @GetMapping(value="/{section_id}", produces="application/json")
    public ResponseEntity getSection(@PathVariable String section_id){
        Section section;
        Map<String, String> body = new HashMap<>();
        HttpHeaders header = new HttpHeaders();
        try{
            log.info("Getting section with section id " + section_id);
            int id = Integer.parseInt(section_id);
            section = sectionService.getSection(id);
            if(section == null) {
                header.add("STATUS", "400 BAD REQUEST");
                body.put("error", "Are you sure there is a section with id " + id + "?")          ;
                return ResponseEntity.badRequest().headers(header).body(formatJson(body));
            }
            header.add("STATUS", "200 OK");
            return ResponseEntity.ok().headers(header).body(section.toString());
        }  catch(Exception e) {
            log.info("Something went wrong while getting section with section_id " + section_id);
            header.add("STATUS", "400 BAD REQUEST");
            body.put("error", "Something went wrong while getting section with section_id " + section_id);
            return ResponseEntity.badRequest().headers(header).body(formatJson(body));
        }
    }

    /**
     * Deletes section with section_id
     *
     * @param section_id
     * @return confirmation and id
     */
    @ApiOperation(value = "Delete a section")
    @DeleteMapping(value="/{section_id}")
    public @ResponseBody
    ResponseEntity deleteSection(@PathVariable String section_id) {
        Map<String, String> body = new HashMap<>();
        HttpHeaders header = new HttpHeaders();
        int sectionID = Integer.parseInt(section_id);
        boolean result =  sectionService.deleteSection(sectionID);
        if(result){
            log.info("Deleting section with section_id " + section_id);
            header.add("STATUS", "200 OK");
            return ResponseEntity.ok().headers(header).body(formatJson(body));
        }
        log.info("Something went wrong during deletion of section with section_id " + section_id);
        body.put("error", "section could not be deleted");
        header.add("STATUS", "400 BAD REQUEST");
        return ResponseEntity.badRequest().headers(header).body(formatJson(body));
    }

}
