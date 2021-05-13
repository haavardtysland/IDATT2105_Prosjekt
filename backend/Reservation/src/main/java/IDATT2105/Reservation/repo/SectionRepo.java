package IDATT2105.Reservation.repo;

import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.util.Logger;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.io.IOException;


@Repository
public class SectionRepo extends ProjectRepo {

        Logger log = new Logger(SectionRepo.class.toString());
        public SectionRepo() throws IOException {
            connect();
        }

        public EntityManager getEm(){
            return super.emf.createEntityManager();
        }

        @Override
        public void connect() throws IOException {
            super.connect();
        }


    public boolean addSection(Section section) {
        EntityManager em = getEm();
        try{
            em.getTransaction().begin();
            em.persist(section);
            em.getTransaction().commit();
            log.info("Sucessfully added section " + section);
            return true;
        } catch(Exception e) {
            log.info("Failed adding section" + e.getMessage());
            em.getTransaction().rollback();
            return false;
        } finally {
            em.close();
        }
    }
}
