package IDATT2105.Reservation.service;

import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.repo.SectionRepo;
import IDATT2105.Reservation.util.Logger;
import IDATT2105.Reservation.util.ReservationTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;

@Service
public class SectionService {
    private Logger log = new Logger(SectionService.class.toString());
    @Autowired
    private SectionRepo repo;

    public boolean addSection(Section section) {
        log.info("Adding new section " + section);
        return this.repo.addSection(section);
    }

    public Section getSection(int section_id) {
        log.info("Finding section with section_id " + section_id);
        return this.repo.findSection(section_id);
    }

    public boolean deleteSection(int section_id) {
        log.info("Deleting section with section_id " + section_id);
        return this.repo.deleteSection(section_id);
    }

    public ArrayList<ReservationTime> getSectionAvailability(int section_id){
        log.info("Getting reservation times for a section");
        return this.repo.getSectionAvailability(section_id);
    }

    public ArrayList<Section> getSections(){
        log.info("Getting all the sections");
        return this.repo.getSections();
    }

    public Long getSectionStatistics(int section_id, Timestamp start, Timestamp end){
        log.info("Getting statistics for section with section_id " + section_id);
        return this.repo.getSectionStatistics(section_id, start, end);
    }

}
