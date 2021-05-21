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
	private String token;
	private String adminToken;

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
	public void registerUserTest() throws Exception{
		System.out.println("Test 4");
		String result = mockMvc.perform(MockMvcRequestBuilders.post("/user").contentType(MediaType.APPLICATION_JSON).content(
				"\n  {" +
						"\n     \"firstName\":" + '\"' + newUser.getFirstName() + '\"' + "," +
						"\n     \"surName\":" + '\"' + newUser.getSurname() + '\"' + "," +
						"\n     \"email\":" + '\"' + newUser.getEmail() + '\"' + "," +
						"\n     \"isAdmin\":" +  newUser.getIsAdmin()  + "," +
						"\n     \"validDate\":" + '\"' + newUser.getValidDate() + '\"' + "," +
						"\n     \"phoneNumber\":"  + newUser.getPhoneNumber()  +  "," +
						"\n\"password\": " + '\"' + "123" + '\"' +
						"\n }"
		)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.userId").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.userId").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject idJson = (JSONObject) parser.parse(result);
		newUser.setId(idJson.getAsNumber("userId").intValue());

	}

	@Test
	@Order(2)
	public void registerAdminTest() throws Exception{
		System.out.println("Test 2");
		String result = mockMvc.perform(MockMvcRequestBuilders.post("/user").contentType(MediaType.APPLICATION_JSON).content(
				"\n  {" +
						"\n     \"firstName\":" + '\"' + adminUser.getFirstName() + '\"' + "," +
						"\n     \"surName\":" + '\"' + adminUser.getSurname() + '\"' + "," +
						"\n     \"email\":" + '\"' + adminUser.getEmail() + '\"' + "," +
						"\n     \"isAdmin\":" +  adminUser.getIsAdmin()  + "," +
						"\n     \"validDate\":" + '\"' + adminUser.getValidDate() + '\"' + "," +
						"\n     \"phoneNumber\":"  + adminUser.getPhoneNumber()  +  "," +
						"\n\"password\": " + '\"' + "123" + '\"' +
						"\n }"
		)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.userId").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.userId").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject idJson = (JSONObject) parser.parse(result);
		adminUser.setId(idJson.getAsNumber("userId").intValue());
	}


	@Test
	@Order(3)
	public void registerUserWithAlreadyRegisteredEmail() throws Exception{
		System.out.println("Test 3");
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
		assert("En bruker med den emailen finnes allerede".equals(JSONError.get("error")));

	}


	@Test
	@Order(4)
	public void loginTest() throws Exception{
		System.out.println("Test 4");
		String result = mockMvc.perform(MockMvcRequestBuilders.post("/login").contentType(MediaType.APPLICATION_JSON).content(
				"\n {" +
						"\n\"email\":" + "\"" + newUser.getEmail() + '\"' + "," +
						"\n\"password\":" + "\"" + "123" + "\""  +
						"\n }"
		)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.id").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject idJson = (JSONObject) parser.parse(result);
		assert(idJson.getAsNumber("id").intValue()) == (newUser.getUserId());
		token = idJson.get("token").toString();
	}


	@Test
	@Order(5)
	public void loginAdminTest() throws Exception{
		System.out.println("Test 5");
		String result = mockMvc.perform(MockMvcRequestBuilders.post("/login").contentType(MediaType.APPLICATION_JSON).content(
				"\n {" +
						"\n\"email\":" + "\"" + adminUser.getEmail() + '\"' + "," +
						"\n\"password\":" + "\"" + "123" + "\""  +
						"\n }"
		)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.id").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject idJson = (JSONObject) parser.parse(result);
		assert(idJson.getAsNumber("id").intValue()) == (adminUser.getUserId());
		adminToken = idJson.get("token").toString();
	}

	@Test
	@Order(6)
	public void editUserTest() throws Exception{
		System.out.println("Test 6");
		String result = mockMvc.perform(MockMvcRequestBuilders.put("/user/edit/" + newUser.getUserId() + "/user").header("token",token).contentType(MediaType.APPLICATION_JSON).content(
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
	@Order(7)
	public void editAdminUserTest() throws Exception{
		System.out.println("Test 7");
		//Sends new password to the user, which is only accessible for the admin, admin can also change other info
		String result = mockMvc.perform(MockMvcRequestBuilders.put("/user/edit/" + newUser.getUserId()).header("token", adminToken).contentType(MediaType.APPLICATION_JSON).content(
				"\n  {" +
						"\n     \"firstName\":" + '\"' + adminUser.getFirstName() + '\"' + "," +
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
	public void editUserWrongInfo() throws Exception {
		System.out.println("Test 8");
		String error = mockMvc.perform(MockMvcRequestBuilders.put("/user/edit/" + newUser.getUserId() + "/user").header("token",token).contentType(MediaType.APPLICATION_JSON).content(
				"\n  {" +
						"\n     \"firstName\":" + '\"' + "Nytt" + '\"' + "," +
						"\n     \"surName\":" + '\"' + "Navn" + '\"' + "," +
						"\n     \"email\":" + '\"' + "feil@gmail.com" + '\"' + "," +
						"\n     \"isAdmin\":" +  newUser.getIsAdmin()  + "," +
						"\n     \"validDate\":" + '\"' + newUser.getValidDate() + '\"' + "," +
						"\n     \"password\":" + '\"' + "123" + '\"' + "," +
						"\n     \"phoneNumber\":"  + newUser.getPhoneNumber()  +
						"\n }"
		)).andExpect(status().isBadRequest()).andExpect(MockMvcResultMatchers.jsonPath("$.error").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.error").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject JSONError = (JSONObject) parser.parse(error);
		assert("Passord eller email er feil".equals(JSONError.get("error")));
	}


	@Test
	@Order(9)
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
	@Order(10)
	public void loginWithWrongEmailTest() throws Exception{
		System.out.println("Test 10");
		String error = mockMvc.perform(MockMvcRequestBuilders.post("/login").contentType(MediaType.APPLICATION_JSON).content(
				"\n {" +
						"\n     \"email\":" + '\"' + "wrong.mail@gmail.com"+ '\"' + "," +
						"\n     \"password\": " + '\"' + "123" + '\"' +
						"\n }"
		)).andExpect(status().isBadRequest()).andExpect(MockMvcResultMatchers.jsonPath("$.error").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.error").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject JSONError = (JSONObject) parser.parse(error);
		assert("Finnes ingen bruker med denne email-en wrong.mail@gmail.com".equals(JSONError.get("error")));
	}

	@Test
	@Order(11)
	public void loginWithWrongPasswordTest() throws Exception{
		System.out.println("Test 11");
		String error = mockMvc.perform(MockMvcRequestBuilders.post("/login").contentType(MediaType.APPLICATION_JSON).content(
				"\n {" +
						"\n     \"email\" :" + '\"' + newUser.getEmail() + '\"' + "," +
						"\n     \"password\": " + '\"' + "321" + '\"' +
						"\n }"
		)).andExpect(status().isForbidden()).andExpect(MockMvcResultMatchers.jsonPath("$.error").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.error").isNotEmpty()).andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject JSONError = (JSONObject) parser.parse(error);
		assert("Passordet er feil".equals(JSONError.get("error")));
	}


	@Test
	@Order(12)
	public void registerRoomTest() throws Exception {
		System.out.println("Test 12");
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

	}

	@Test
	@Order(13)
	public void getRoomTest() throws Exception{
		System.out.println("Test 13");
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
	@Order(14)
	public void editRoomTest() throws Exception{
		System.out.println("Test 14");
		String room_id = mockMvc.perform(MockMvcRequestBuilders.put("/room/edit/" + room1.getRoom_id()).contentType(MediaType.APPLICATION_JSON).content(
				"{\n" +
						"\"name\" : \"" + room1.getName() + "\",\n" +
						"\"capacity\" : " + 125 + ",\n" +
						"\"sections\" : " + room1.getSections().toString() + "\n" +
						"}"
		)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.room_id").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.room_id").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject idJson = (JSONObject) parser.parse(room_id);
		assert(room1.getRoom_id() == idJson.getAsNumber("room_id").intValue());
	}

	@Test
	@Order(15)
	public void getSectionTest() throws Exception{
		System.out.println("Test 15");
		String sectionInfo = mockMvc.perform(MockMvcRequestBuilders.get("/section/" + room1.getSections().get(0).getSectionId()).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.section_id").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.section_id").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject section = (JSONObject) parser.parse(sectionInfo);
		int recievied_id = section.getAsNumber("section_id").intValue();
		assert(recievied_id == section1.getSectionId());
	}

	@Test
	@Order(16)
	public void addSectionTest() throws Exception{
		System.out.println("Test 16");
		String section_id = mockMvc.perform(MockMvcRequestBuilders.post("/section/" + room1.getRoom_id()).contentType(MediaType.APPLICATION_JSON).content(
				"{\n" +
					"\"sections\" : [{\n" +
						"\"section_name\" : " + "\"" + section3.getSectionName() + "\"," + "\n" +
						"\"capacity\" : " + section3.getCapacity() + "\n" +
						"}]\n" +
						"}"
		)).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

		assert(section_id.equals("{}"));
	}


	@Test
	@Order(17)
	public void registerReservationTest() throws Exception {
		System.out.println("Test 17");
		reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
		reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
		reservation.setToDate(Timestamp.valueOf("2021-06-05 12:00:00.0"));
		reservation.setCapacity(10);
		reservation.setDescription("Test reservasjon");

		String reservation_id = mockMvc.perform(MockMvcRequestBuilders.post("/reservation").header("token", token).accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(
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
	@Order(18)
	public void registerReservationWithWrongSectionTest() throws Exception {
		System.out.println("Test 18");
		reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
		reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
		reservation.setToDate(Timestamp.valueOf("2021-06-05 12:00:00.0"));
		reservation.setCapacity(10);
		reservation.setDescription("Test reservasjon");

		String error = mockMvc.perform(MockMvcRequestBuilders.post("/reservation").header("token",token).accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(
				"{" +
						"\n \"user_id\": " + newUser.getUserId() + "," +
						"\n \"section_id\": " + -1 + "," +
						"\n \"from_date\": " + "\"" + "2021-05-05 12:00:00.0" + "\"" + "," +
						"\n \"to_date\": " + "\"" + "2021-06-05 12:00:00.0" + "\"" + "," +
						"\n \"capacity\": " + 10 + ","+
						"\n \"description\": " + "\"" + "Test reservasjon" + "\"" +
						"\n}"
		)).andExpect(status().isBadRequest()).andExpect(MockMvcResultMatchers.jsonPath("$.error").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.error").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject JSONError = (JSONObject) parser.parse(error);
		assert(JSONError.get("error").equals("Ingen seksjon med denne id"));
	}

	@Test
	@Order(19)
	public void registerReservationWithNoToken() throws Exception {
		System.out.println("Test 19");
		reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
		reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
		reservation.setToDate(Timestamp.valueOf("2021-06-05 12:00:00.0"));
		reservation.setCapacity(10);
		reservation.setDescription("Test reservasjon");

		String error = mockMvc.perform(MockMvcRequestBuilders.post("/reservation").accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(
				"{" +
						"\n \"user_id\": " + newUser.getUserId() + "," +
						"\n \"section_id\": " + room1.getSections().get(0).getSectionId() + "," +
						"\n \"from_date\": " + "\"" + "2021-05-05 12:00:00.0" + "\"" + "," +
						"\n \"to_date\": " + "\"" + "2021-06-05 12:00:00.0" + "\"" + "," +
						"\n \"capacity\": " + 10 + ","+
						"\n \"description\": " + "\"" + "Test reservasjon" + "\"" +
						"\n}"
		)).andExpect(status().isBadRequest()).andExpect(MockMvcResultMatchers.jsonPath("$.error").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.error").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject JSONError = (JSONObject) parser.parse(error);
		assert(JSONError.get("error").equals("empty token"));
	}

	@Test
	@Order(20)
	public void registerReservationWithWrongUserId() throws Exception {
		System.out.println("Test 20");
		reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
		reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
		reservation.setToDate(Timestamp.valueOf("2021-06-05 12:00:00.0"));
		reservation.setCapacity(10);
		reservation.setDescription("Test reservasjon");

		String error = mockMvc.perform(MockMvcRequestBuilders.post("/reservation").header("token", token).accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON).content(
				"{" +
						"\n \"user_id\": " + -1 + "," +
						"\n \"section_id\": " + room1.getSections().get(0).getSectionId() + "," +
						"\n \"from_date\": " + "\"" + "2021-05-05 12:00:00.0" + "\"" + "," +
						"\n \"to_date\": " + "\"" + "2021-06-05 12:00:00.0" + "\"" + "," +
						"\n \"capacity\": " + 10 + ","+
						"\n \"description\": " + "\"" + "Test reservasjon" + "\"" +
						"\n}"
		)).andExpect(status().isBadRequest()).andExpect(MockMvcResultMatchers.jsonPath("$.error").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.error").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject JSONError = (JSONObject) parser.parse(error);
		assert(JSONError.get("error").equals("subject mismatch"));
	}

	@Test
	@Order(21)
	public void registerDuplicateReservationTest() throws Exception{
			System.out.println("Test 21");
			reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
			reservation.setFromDate(Timestamp.valueOf("2021-05-05 12:00:00.0"));
			reservation.setToDate(Timestamp.valueOf("2021-06-05 12:00:00.0"));
			reservation.setCapacity(10);
			reservation.setDescription("Test reservasjon");

			String error = mockMvc.perform(MockMvcRequestBuilders.post("/reservation").header("token",token).contentType(MediaType.APPLICATION_JSON).content(
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
	@Order(22)
	public void getReservationsForUserTest() throws Exception{
		System.out.println("Test 22");
		String reservationInfo = mockMvc.perform(MockMvcRequestBuilders.get("/reservation/" + newUser.getUserId() + "/user").header("token",token).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.reservations").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.reservations").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject json = (JSONObject) parser.parse(reservationInfo);
		String csv = json.get("reservations").toString();
		JSONArray jsonArray = (JSONArray) parser.parse(csv);

		assert((Integer.parseInt(((JSONObject)jsonArray.get(0)).get("reservationId").toString())) == reservation.getReservation_id());
	}

	@Test
	@Order(23)
	public void getReservationsForSectionTest() throws Exception{
		System.out.println("Test 23");
		String reservationInfo = mockMvc.perform(MockMvcRequestBuilders.get("/reservation/" + room1.getSections().get(0).getSectionId() + "/section").header("token",token).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.reservations").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.reservations").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject json = (JSONObject) parser.parse(reservationInfo);
		String csv = json.get("reservations").toString();
		JSONArray jsonArray = (JSONArray) parser.parse(csv);

		assert((Integer.parseInt(((JSONObject)jsonArray.get(0)).get("reservationId").toString())) == reservation.getReservation_id());
	}

	@Test
	@Order(24)
	public void getReservationsForSectionWithinTimeframeTest() throws Exception{
		System.out.println("Test 24");
		Long start = reservation.getFromDate().getTime();
		Long end = reservation.getToDate().getTime();
		String reservationInfo = mockMvc.perform(MockMvcRequestBuilders.get("/reservation/" + room1.getSections().get(0).getSectionId() + "/section" + "/" + start + "/" + end).header("token",token).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.reservations").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.reservations").isNotEmpty())
				.andReturn().getResponse().getContentAsString();


		JSONParser parser = new JSONParser();
		JSONObject json = (JSONObject) parser.parse(reservationInfo);
		String csv = json.get("reservations").toString();
		JSONArray jsonArray = (JSONArray) parser.parse(csv);

		assert((Integer.parseInt(((JSONObject)jsonArray.get(0)).get("reservationId").toString())) == reservation.getReservation_id());

	}


	@Test
	@Order(25)
	public void getReservationsForRoomTest() throws Exception{
		System.out.println("Test 25");
		String reservationInfo = mockMvc.perform(MockMvcRequestBuilders.get("/reservation/" + room1.getRoom_id() + "/room").header("token",token).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.reservations").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.reservations").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject json = (JSONObject) parser.parse(reservationInfo);
		String csv = json.get("reservations").toString();
		JSONArray jsonArray = (JSONArray) parser.parse(csv);

		assert((Integer.parseInt(((JSONObject)jsonArray.get(0)).get("reservationId").toString())) == reservation.getReservation_id());
	}

	@Test
	@Order(26)
	public void getSectionStatistics() throws Exception{
		System.out.println("Test 26");
		Long start = section1.getReservations().get(0).getFromDate().getTime();
		Long end = section1.getReservations().get(0).getToDate().getTime();
		Long duration = end - start;
		String time = mockMvc.perform(MockMvcRequestBuilders.get("/section/" + section1.getSectionId() + "/" + start + "/" + end).header("token",token).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.time").exists())
				.andExpect(MockMvcResultMatchers.jsonPath("$.time").isNotEmpty())
				.andReturn().getResponse().getContentAsString();

		JSONParser parser = new JSONParser();
		JSONObject info = (JSONObject) parser.parse(time);
		Long recievedTime = Long.parseLong(info.get("time").toString());

		assert(recievedTime.equals(duration));
	}

	@Test
	@Order(27)
	public void addMessage() throws Exception{
		System.out.println("Test 27");

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
		assert(info.toString().equals("{}"));
	}

	@Test
	@Order(28)
	public void editReservationTest() throws Exception{
		System.out.println("Test 28");
		String reservationId = mockMvc.perform(MockMvcRequestBuilders.put("/reservation/" + reservation.getReservation_id()).header("token",token).contentType(MediaType.APPLICATION_JSON).content(
				"{" +
						"\n \"user_id\": " + newUser.getUserId() + "," +
						"\n \"section_id\": " + room1.getSections().get(0).getSectionId() + "," +
						"\n \"from_date\": " + "\"" + "2021-05-05 12:00:00.0" + "\"" + "," +
						"\n \"to_date\": " + "\"" + "2021-06-05 12:00:00.0" + "\"" + "," +
						"\n \"capacity\": " + 10 + ","+
						"\n \"description\": " + "\"" + "Test reservasjon redigert" + "\"" +
						"\n}"
		)).andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.reservationId").exists()).andExpect(MockMvcResultMatchers.jsonPath("$.reservationId").isNotEmpty()).andReturn().getResponse().getContentAsString();
		JSONParser parser = new JSONParser();
		JSONObject info = (JSONObject) parser.parse(reservationId);
		assert(reservation.getReservation_id() == Integer.parseInt(info.get("reservationId").toString()));
	}

	@Test
	@Order(29)
	public void deleteSectionTest() throws Exception{
		System.out.println("Test 29");
		String sectionId = mockMvc.perform(MockMvcRequestBuilders.delete("/section/" + section2.getSectionId()).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		JSONParser parser = new JSONParser();
		JSONObject info = (JSONObject) parser.parse(sectionId);
		assert(info.toString().equals("{}"));
	}
	@Test
	@Order(30)
	public void deleteReservationTest() throws Exception{
		System.out.println("Test 30");
		String reservationId = mockMvc.perform(MockMvcRequestBuilders.delete("/reservation/" + reservation.getReservation_id()).header("token",token).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		JSONParser parser = new JSONParser();
		JSONObject info = (JSONObject) parser.parse(reservationId);
		assert(reservation.getReservation_id() == Integer.parseInt(info.get("reservationId").toString()));

	}
	@Test
	@Order(31)
	public void deleteUserTest() throws Exception{
		System.out.println("Test 31");
		String user_id = mockMvc.perform(MockMvcRequestBuilders.delete("/user/" + newUser.getUserId()).header("token",token).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		assert(user_id.equals("{}"));
	}

	@Test
	@Order(32)
	public void deleteAdminTest() throws Exception{
		System.out.println("Test 32");
		String user_id = mockMvc.perform(MockMvcRequestBuilders.delete("/user/" + adminUser.getUserId()).header("token", adminToken).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		assert(user_id.equals("{}"));
	}

	@Test
	@Order(33)
	public void deleteRoomTest() throws Exception {
		System.out.println("Test 33");
		String room_id = mockMvc.perform(MockMvcRequestBuilders.delete("/room/" + room1.getRoom_id()).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

		assert(room_id.equals("{}"));
	}
}
