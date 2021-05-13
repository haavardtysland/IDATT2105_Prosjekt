package IDATT2105.Reservation.controller;


import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.service.RoomService;
import IDATT2105.Reservation.service.SectionService;
import IDATT2105.Reservation.util.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    @PostMapping(value="{room_id}/add")
    public @ResponseBody
    boolean addSections(@RequestBody HashMap<String, Object> map, @PathVariable String room_id) {
        Map<String, String> body = new HashMap<>();
        int id = Integer.parseInt(room_id);
        Room room = roomService.getRoom(id);
        String[] sections = map.get("section_name").toString().split(",");
        for(String name : sections) {
            Section section = new Section(name);
            section.setRoom(room);
            room.addSection(section);
        }
        return roomService.addSection(room);
    }

    @DeleteMapping(value="/{section_id}")
    public @ResponseBody
    boolean deleteSection(@PathVariable String section_id) {
        int sectionID = Integer.parseInt(section_id);
        return sectionService.deleteSection(sectionID);

    }

}
