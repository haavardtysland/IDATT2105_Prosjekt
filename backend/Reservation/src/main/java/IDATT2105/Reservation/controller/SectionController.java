package IDATT2105.Reservation.controller;


import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.service.RoomService;
import IDATT2105.Reservation.service.SectionService;
import IDATT2105.Reservation.util.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import static IDATT2105.Reservation.controller.ControllerUtil.formatJson;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Controller
@RequestMapping(value="/section/")
public class SectionController {

    Logger log = new Logger(SectionController.class.toString());

    @Autowired
    private SectionService sectionService;
    @Autowired
    private RoomService roomService;

    /**
     *
     * @param map which is sent by the client on the format:
     *            {
     *            "section_name": ""
     *            }
     * @param room_id the room that the admin wants to add sections to
     * @return true if the sections can be added, false if not
     */
    @PostMapping(value="{room_id}/add", produces="application/json")
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
             newSection.setRoom(room);
             newSection.setSectionName(section.get("section_name").toString());
             newSection.setCapacity(Integer.parseInt(section.get("capacity").toString()));
             sections.add(newSection);
             room.addSection(newSection);
         }
        boolean result =  roomService.addSection(room);
        if(result){
            log.info("Sucesfully added section to room " + id);
            header.add("Status", "200 OK");
            return ResponseEntity.ok().headers(header).body(formatJson(body));
        } else {
            log.info("Something went wrong while adding sections to room " + id);
            header.add("Status", "400 BAD REQUEST");
            body.put("error", "Something went wrong while adding sections to room " + id);
            return ResponseEntity.ok().headers(header).body(formatJson(body));
        }
    }

    @GetMapping(value="{section_id}", produces="application/json")
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
            return ResponseEntity.ok().headers(header).body("\"section\": \n " + section.toString());
        }  catch(Exception e) {
            log.info("Something went wrong while getting section with section_id " + section_id);
            header.add("STATUS", "400 BAD REQUEST");
            body.put("error", "Something went wrong while getting section with section_id " + section_id);
            return ResponseEntity.badRequest().headers(header).body(formatJson(body));
        }
    }

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
