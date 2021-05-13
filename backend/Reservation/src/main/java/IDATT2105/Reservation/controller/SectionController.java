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

    @PostMapping(value="{room_id}/add")
    public @ResponseBody
    boolean addSection(@RequestBody HashMap<String, Object> map, @PathVariable String room_id) {
        Map<String, String> body = new HashMap<>();

        Section section = new Section();
        int id = Integer.parseInt(room_id);
        section.setSectionName(map.get("section_name").toString());
        Room room = roomService.getRoom(id);
        room.addSection(section);
        return roomService.addSection(room);
    }
}
