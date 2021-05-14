package IDATT2105.Reservation.repo;


import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Properties;
import javax.persistence.EntityManagerFactory;

import IDATT2105.Reservation.models.Room;
import org.springframework.stereotype.Repository;

@Repository
public abstract class ProjectRepo {
    protected static EntityManagerFactory emf;

    /**
     * connects to database given in application.properties
     * @throws IOException reads the application.properties file
     */
    public void connect() throws IOException {
        Properties prop = new Properties();
        HashMap<String, String> newProperties = new HashMap<>();
        //loads the local .properties file
        InputStream input = getClass().getClassLoader().getResourceAsStream("application.properties");
        // load a properties file
        prop.load(input);
        assert input != null;
        input.close();

        String jdbcUrl = "jdbc:mysql://" + prop.getProperty("RDSHOSTNAME") + ":" + prop.getProperty("RDSPORT") + "/" + prop.getProperty("RDSDBNAME") + "?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
        newProperties.put("javax.persistence.jdbc.url", jdbcUrl);
        newProperties.put("javax.persistence.jdbc.user", prop.getProperty("RDSUSERNAME"));
        newProperties.put("javax.persistence.jdbc.password", prop.getProperty("RDSPASSWORD"));
        emf = javax.persistence.Persistence.createEntityManagerFactory("DatabaseFullstack", newProperties);
    }

}
