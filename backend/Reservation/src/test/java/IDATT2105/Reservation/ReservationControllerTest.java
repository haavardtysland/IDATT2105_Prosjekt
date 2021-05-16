package IDATT2105.Reservation;

import IDATT2105.Reservation.models.Room;
import IDATT2105.Reservation.models.Section;
import IDATT2105.Reservation.models.User;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

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

	@BeforeAll
	public void beforeAll() throws Exception{

		System.out.println("Starting the tests:\n");

		room1 = new Room(1, "Rom 1", 100);

		section1 = new Section(1, "Seksjon 1", 40);
		section2 = new Section(2, "Seksjon 2", 50);
		section3 = new Section(3, "Seksjon 3", 10);
		section4 = new Section(4, "Seksjon 4", 10);

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
		assert(room1.getRoom_id() == recievied_id);
		
	}

	@Test
	@Order(3)
	public void addSectionTest() throws Exception{
		System.out.println("Test 2");
		String section_id = mockMvc.perform(MockMvcRequestBuilders.post("/section/" + room1.getRoom_id()).contentType(MediaType.APPLICATION_JSON).content(
				"{\n" +
					"\"sections\" : [{\n" +
						"\"section_name\" : " + "\"" + section3.getSectionName() + "\"," + "\n" +
						"\"capacity\" : " + section3.getCapacity() + "\n" +
						"}]\n" +
						"}"
		)).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
	}

	/*
	@Test
	@Order(4)
	public void deleteSectionsTest() throws Exception{
		System.out.println("Test 3");

		String response = mockMvc.perform(MockMvcRequestBuilders.delete("/section/" + section2.getSectionId())).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
		assert(response.equals("{}"));

	}*/
}
