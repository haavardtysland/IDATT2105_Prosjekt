package IDATT2105.Reservation;

import IDATT2105.Reservation.models.*;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.apache.commons.codec.binary.Hex;
import org.apache.tomcat.util.codec.binary.Base64;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedHashMap;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.MOCK;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;





@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
@AutoConfigureMockMvc //Trengs for dependency injection av MockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ReservationControllerTest {

	@Autowired
	private MockMvc mockMvc;

	private Room room1;
	private Section section1;
	private Section section2;
	private Section section3;
	private Section section4;
	private User adminUser;
	private User newUser;
	private Reservation reservation;
	private Message message;

	@BeforeAll
	public void beforeAll() throws Exception{

		System.out.println("Starting the tests:\n");

		room1 = new Room(1, "Rom 1", 100);

		section1 = new Section("Seksjon 1", 40);
		section2 = new Section("Seksjon 2", 50);
		section3 = new Section("Seksjon 3", 10);
		section4 = new Section("Seksjon 4", 10);

		adminUser = new User(1, "Admin", "User", "admin@gmail.com", true, new Date(1670835600000L), "123", 12312312);
		newUser = new User(1, "New", "User", "new@gmail.com", false, new Date(1670835600000L), "123", 12312312);

		reservation = new Reservation();
		message = new Message();

		room1.getSections().add(section1);
		room1.getSections().add(section2);



	}

	@Test
	@Order(1)
	public void registerRoomTest() throws Exception {
		System.out.println("Test 1");
		String room_id = mockMvc.perform(MockMvcRequestBuilders.post("/room").contentType(MediaType.APPLICATION_JSON).content(
				"{\n" +
						"\"name\" : \"" + room1.getName() + "\",\n" +
						"\"capacity\" : " + room1.getCapacity() + ",\n" +
						"\"sections\" : " + room1.getSections().toString() + "\n" +
						"}"
		)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.room_id").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.room_id").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject idJson = (JSONObject) parser.parse(room_id);
		room1.setRoom_id(idJson.getAsNumber("room_id").intValue());
		System.out.println(room1);

	}

	@Test
	@Order(2)
	public void getRoomTest() throws Exception{
		System.out.println("Test 2");
		String roomInfo = mockMvc.perform(MockMvcRequestBuilders.get("/room/" + room1.getRoom_id()).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.room_id").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.room_id").isNotEmpty())
				.andReturn().getResponse().getContentAsString();


		JSONParser parser = new JSONParser();
		JSONObject room = (JSONObject) parser.parse(roomInfo);
		int recievied_id = room.getAsNumber("room_id").intValue();
		String csv = room.get("sections").toString();
		JSONArray array = ((JSONArray) parser.parse(csv));

		for(int i = 0; i < room1.getSections().size(); i++){
			room1.getSections().get(i).setSectionId((Integer.parseInt(((JSONObject)array.get(i)).get("section_id").toString())));
		}

		assert(room1.getRoom_id() == recievied_id);

	}

	@Test
	@Order(3)
	public void getSectionTest() throws Exception{
		System.out.println("Test 3");
		String sectionInfo = mockMvc.perform(MockMvcRequestBuilders.get("/section/" + room1.getSections().get(0).getSectionId()).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.section_id").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.section_id").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject section = (JSONObject) parser.parse(sectionInfo);
		int recievied_id = section.getAsNumber("section_id").intValue();
		assert(recievied_id == section1.getSectionId());
	}

	@Test
	@Order(4)
	public void addSectionTest() throws Exception{
		System.out.println("Test 3");
		String section_id = mockMvc.perform(MockMvcRequestBuilders.post("/section/" + room1.getRoom_id()).contentType(MediaType.APPLICATION_JSON).content(
				"{\n" +
					"\"sections\" : [{\n" +
						"\"section_name\" : " + "\"" + section3.getSectionName() + "\"," + "\n" +
						"\"capacity\" : " + section3.getCapacity() + "\n" +
						"}]\n" +
						"}"
		)).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
	}

	@Test
	@Order(5)
	public void registerUserTest() throws Exception{
		System.out.println("Test 4");
		String result = mockMvc.perform(MockMvcRequestBuilders.post("/user").contentType(MediaType.APPLICATION_JSON).content(
		"\n  {" +
        "\n     \"firstName\":" + '\"' + newUser.getFirstName() + '\"' + "," +
        "\n     \"surName\":" + '\"' + newUser.getSurname() + '\"' + "," +
        "\n     \"email\":" + '\"' + newUser.getEmail() + '\"' + "," +
        "\n     \"isAdmin\":" +  newUser.getIsAdmin()  + "," +
        "\n     \"validDate\":" + '\"' + newUser.getValidDate() + '\"' + "," +
        "\n     \"phoneNumber\":"  + newUser.getPhoneNumber()  +
        "\n }"
		)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.userId").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.userId").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject idJson = (JSONObject) parser.parse(result);
		newUser.setId(idJson.getAsNumber("userId").intValue());
	}

	@Test
	@Order(6)
	public void registerUserWithAlreadyRegisteredEmail() throws Exception{
		System.out.println("Test 5");
		String error = mockMvc.perform(MockMvcRequestBuilders.post("/user").contentType(MediaType.APPLICATION_JSON).content(
				"\n  {" +
						"\n     \"firstName\":" + '\"' + newUser.getFirstName() + '\"' + "," +
						"\n     \"surName\":" + '\"' + newUser.getSurname() + '\"' + "," +
						"\n     \"email\":" + '\"' + newUser.getEmail() + '\"' + "," +
						"\n     \"isAdmin\":" +  newUser.getIsAdmin()  + "," +
						"\n     \"validDate\":" + '\"' + newUser.getValidDate() + '\"' + "," +
						"\n     \"phoneNumber\":"  + newUser.getPhoneNumber()  +
						"\n }"
		)).andExpect(status().isBadRequest()).andExpect(MockMvcResultMatchers.jsonPath("$.error").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.error").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject JSONError = (JSONObject) parser.parse(error);
		assert("En bruker med en emailen finnes allerede".equals(JSONError.get("error")));

	}


	@Test
	@Order(7)
	public void editUserTest() throws Exception{
		System.out.println("Test 7");
		String result = mockMvc.perform(MockMvcRequestBuilders.put("/user/edit/" + newUser.getUserId() + "/user").contentType(MediaType.APPLICATION_JSON).content(
				"\n  {" +
						"\n     \"firstName\":" + '\"' + "Nytt" + '\"' + "," +
						"\n     \"surName\":" + '\"' + "Navn" + '\"' + "," +
						"\n     \"email\":" + '\"' + newUser.getEmail() + '\"' + "," +
						"\n     \"isAdmin\":" +  newUser.getIsAdmin()  + "," +
						"\n     \"validDate\":" + '\"' + newUser.getValidDate() + '\"' + "," +
						"\n     \"password\":" + '\"' + "123" + '\"' + "," +
						"\n     \"phoneNumber\":"  + newUser.getPhoneNumber()  +
						"\n }"
		)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.id").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject idJson = (JSONObject) parser.parse(result);
		assert(idJson.getAsNumber("id").intValue()) == (newUser.getUserId());
	}

	@Test
	@Order(8)
	public void editAdminUserTest() throws Exception{
		System.out.println("Test 8");
		//Sends new password to the user, which is only accessible for the admin, admin can also change other info
		String result = mockMvc.perform(MockMvcRequestBuilders.put("/user/edit/" + newUser.getUserId()).contentType(MediaType.APPLICATION_JSON).content(
				"\n  {" +
						"\n     \"firstName\":" + '\"' + newUser.getFirstName() + '\"' + "," +
						"\n     \"surName\":" + '\"' + newUser.getSurname() + '\"' + "," +
						"\n     \"email\":" + '\"' + newUser.getEmail() + '\"' + "," +
						"\n     \"isAdmin\":" +  newUser.getIsAdmin()  + "," +
						"\n     \"validDate\":" + '\"' + newUser.getValidDate() + '\"' + "," +
						"\n     \"password\":" + '\"' + false + '\"' + "," +
						"\n     \"phoneNumber\":"  + "51525303"  +
						"\n }"
		)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.id").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty()).andReturn().getResponse().getContentAsString();


		JSONParser parser = new JSONParser();
		JSONObject idJson = (JSONObject) parser.parse(result);
		assert(idJson.getAsNumber("id").intValue()) == (newUser.getUserId());
	}

	@Test
	@Order(8)
	public void getUserTest() throws Exception{
		System.out.println("Test 9");

		String userInfo = mockMvc.perform(MockMvcRequestBuilders.get("/user/" + newUser.getUserId()).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.userId").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.userId").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject section = (JSONObject) parser.parse(userInfo);
		int recievied_id = section.getAsNumber("userId").intValue();
		assert(recievied_id == newUser.getUserId());
	}

	@Test
	@Order(8)
	public void loginTest() throws Exception{
		System.out.println("Test 8");
		String result = mockMvc.perform(MockMvcRequestBuilders.post("/login").contentType(MediaType.APPLICATION_JSON).content(
				"\n {" +
						"\n     \"email\" :" + '\"' + newUser.getEmail() + '\"' + "," +
						"\n     \"password\": " + '\"' + "123" + '\"' +
						"\n }"
		)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.id").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject idJson = (JSONObject) parser.parse(result);
		assert(idJson.getAsNumber("id").intValue()) == (newUser.getUserId());
	}

	@Test
	@Order(9)
	public void loginWithWrongEmailTest() throws Exception{
		System.out.println("Test 9");
		String error = mockMvc.perform(MockMvcRequestBuilders.post("/login").contentType(MediaType.APPLICATION_JSON).content(
				"\n {" +
						"\n     \"email\" :" + '\"' + "wrong.mail@gmail.com"+ '\"' + "," +
						"\n     \"password\": " + '\"' + "123" + '\"' +
						"\n }"
		)).andExpect(status().isBadRequest()).andExpect(MockMvcResultMatchers.jsonPath("$.error").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.error").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject JSONError = (JSONObject) parser.parse(error);
		assert("Finnes ingen bruker med denne email-en wrong.mail@gmail.com".equals(JSONError.get("error")));
	}

	@Test
	@Order(9)
	public void loginWithWrongPasswordTest() throws Exception{
		System.out.println("Test 9");
		String error = mockMvc.perform(MockMvcRequestBuilders.post("/login").contentType(MediaType.APPLICATION_JSON).content(
				"\n {" +
						"\n     \"email\" :" + '\"' + newUser.getEmail() + '\"' + "," +
						"\n     \"password\": " + '\"' + "321" + '\"' +
						"\n }"
		)).andExpect(status().isBadRequest()).andExpect(MockMvcResultMatchers.jsonPath("$.error").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.error").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject JSONError = (JSONObject) parser.parse(error);
		assert("Passordet er feil eller brukeren er ikke gyldig lenger".equals(JSONError.get("error")));
	}


	@Test
	@Order(8)
	public void registerReservationTest() throws Exception {
		System.out.println("Test 6");
		reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
		reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
		reservation.setToDate(Timestamp.valueOf("2021-06-05 12:00:00.0"));
		reservation.setCapacity(10);
		reservation.setDescription("Test reservasjon");

		String reservation_id = mockMvc.perform(MockMvcRequestBuilders.post("/reservation").contentType(MediaType.APPLICATION_JSON).content(
				"{" +
						"\n \"user_id\": " + newUser.getUserId() + "," +
						"\n \"section_id\": " + room1.getSections().get(0).getSectionId() + "," +
						"\n \"from_date\": " + "\"" + "2021-05-05 12:00:00.0" + "\"" + "," +
						"\n \"to_date\": " + "\"" + "2021-06-05 12:00:00.0" + "\"" + "," +
						"\n \"capacity\": " + 10 + ","+
						"\n \"description\": " + "\"" + "Test reservasjon" + "\"" +
						"\n}"
		)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.reservationId").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.reservationId").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject idJson = (JSONObject) parser.parse(reservation_id);
		reservation.setReservation_id(idJson.getAsNumber("reservationId").intValue());
		reservation.setUser(newUser);
		reservation.setSection(section1);
		section1.addReservation(reservation);
		newUser.addReservation(reservation);
	}

	@Test
	@Order(8)
	public void registerDuplicateReservationTest() throws Exception{
			System.out.println("Test 6");
			reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
			reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
			reservation.setToDate(Timestamp.valueOf("2021-06-05 12:00:00.0"));
			reservation.setCapacity(10);
			reservation.setDescription("Test reservasjon");

			String error = mockMvc.perform(MockMvcRequestBuilders.post("/reservation").contentType(MediaType.APPLICATION_JSON).content(
					"{" +
							"\n \"user_id\": " + newUser.getUserId() + "," +
							"\n \"section_id\": " + room1.getSections().get(0).getSectionId() + "," +
							"\n \"from_date\": " + "\"" + "2021-05-05 12:00:00.0" + "\"" + "," +
							"\n \"to_date\": " + "\"" + "2021-06-05 12:00:00.0" + "\"" + "," +
							"\n \"capacity\": " + 10 + ","+
							"\n \"description\": " + "\"" + "Test reservasjon" + "\"" +
							"\n}"
			)).andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();


		JSONParser parser = new JSONParser();
		JSONObject JSONError = (JSONObject) parser.parse(error);
		assert("Tidspunktet er allerede reservert".equals(JSONError.get("error")));
		}

	@Test
	@Order(9)
	public void getReservationsForUserTest() throws Exception{
		System.out.println("Test 7");
		String reservationInfo = mockMvc.perform(MockMvcRequestBuilders.get("/reservation/" + newUser.getUserId() + "/user").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.reservations").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.reservations").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject json = (JSONObject) parser.parse(reservationInfo);
		String csv = json.get("reservations").toString();
		JSONArray jsonArray = (JSONArray) parser.parse(csv);

		assert((Integer.parseInt(((JSONObject)jsonArray.get(0)).get("reservationId").toString())) == reservation.getReservation_id());
	}

	@Test
	@Order(10)
	public void getReservationsForSectionTest() throws Exception{
		System.out.println("Test 8");
		String reservationInfo = mockMvc.perform(MockMvcRequestBuilders.get("/reservation/" + room1.getSections().get(0).getSectionId() + "/section").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.reservations").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.reservations").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject json = (JSONObject) parser.parse(reservationInfo);
		String csv = json.get("reservations").toString();
		JSONArray jsonArray = (JSONArray) parser.parse(csv);

		assert((Integer.parseInt(((JSONObject)jsonArray.get(0)).get("reservationId").toString())) == reservation.getReservation_id());
	}


	@Test
	@Order(11)
	public void getReservationsForRoomTest() throws Exception{
		System.out.println("Test 8");
		String reservationInfo = mockMvc.perform(MockMvcRequestBuilders.get("/reservation/" + room1.getRoom_id() + "/room").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.reservations").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.reservations").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject json = (JSONObject) parser.parse(reservationInfo);
		String csv = json.get("reservations").toString();
		JSONArray jsonArray = (JSONArray) parser.parse(csv);

		assert((Integer.parseInt(((JSONObject)jsonArray.get(0)).get("reservationId").toString())) == reservation.getReservation_id());
	}

	@Test
	@Order(12)
	public void getSectionStatistics() throws Exception{
		System.out.println("Test 11");
		Long start = section1.getReservations().get(0).getFromDate().getTime();
		Long end = section1.getReservations().get(0).getToDate().getTime();
		Long duration = end - start;
		String time = mockMvc.perform(MockMvcRequestBuilders.get("/section/" + section1.getSectionId() + "/" + start + "/" + end).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.time").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.time").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject info = (JSONObject) parser.parse(time);
		Long recievedTime = Long.parseLong(info.get("time").toString());

		assert(recievedTime.equals(duration));
	}

	@Test
	@Order(13)
	public void addMessage() throws Exception{
		message.setUser(newUser);
		message.setMessage("Test melding");

		String messageId = mockMvc.perform(MockMvcRequestBuilders.post("/section/" + section1.getSectionId() + "/message").contentType(MediaType.APPLICATION_JSON).content(
				"{" +
						"\"user_id\" : " + newUser.getUserId() + ",\n" +
						"\"message\" : " + "\"" + message.getMessage() + "\"" + "\n" +
						"}"
		)).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject info = (JSONObject) parser.parse(messageId);
		System.out.println(info.toString());

	}
	@Test
	@Order(14)
	public void deleteUserTest() throws Exception{
		System.out.println("Test 5");
		String user_id = mockMvc.perform(MockMvcRequestBuilders.delete("/user/" + newUser.getUserId()).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		System.out.println(user_id.toString());
	}

	@Test
	@Order(15)
	public void deleteRoomTest() throws Exception {
		System.out.println("Test 4");
		String room_id = mockMvc.perform(MockMvcRequestBuilders.delete("/room/" + room1.getRoom_id()).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

		assert(room_id.equals("{}"));
	}
}
