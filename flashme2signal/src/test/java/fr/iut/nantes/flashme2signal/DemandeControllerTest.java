package fr.iut.nantes.flashme2signal;

import fr.iut.nantes.flashme2signal.dao.DemandeDao;
import fr.iut.nantes.flashme2signal.dao.MaterielDao;
import fr.iut.nantes.flashme2signal.web.exceptions.DemandeNotFoundException;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class DemandeControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private MaterielDao materielDao;

	@Autowired
	private DemandeDao demandeDao;

	@Test
	@Order(1)
	public void emptyAll() throws Exception {
		demandeDao.deleteAll();
		materielDao.deleteAll();
		this.mockMvc.perform(get("/demandes"))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string("[]"));
	}

	@Test
	@Order(2)
	public void addMateriel() throws Exception {
		String s = "{\"id\":1," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"}";
		this.mockMvc.perform(
						post("/materiel")
								.contentType(MediaType.APPLICATION_JSON)
								.content(s)
				)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string(s));
	}

	@Test
	@Order(3)
	public void addEtat() throws Exception {
		String s = "{\"id\":1," +
				"\"libelle\":\"grave\"}";
		this.mockMvc.perform(
						post("/etat")
								.contentType(MediaType.APPLICATION_JSON)
								.content(s)
				)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string(s));
	}

	@Test
	@Order(4)
	public void addDemande1() throws Exception {
		String s = "{\"id\":1," +
				"\"idMateriel\":{" +
				"\"id\":1," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"}," +
				"\"severite\":\"mineur\"," +
				"\"description\":\"descri\"," +
				"\"dateDemande\":\"2022-05-25T06:33:44.116+00:00\"," +
				"\"type\":\"panne\"," +
				"\"etat\":{" +
				"\"id\":1," +
				"\"libelle\":\"grave\"}" +
				"}";

		this.mockMvc.perform(
						post("/demande")
								.contentType(MediaType.APPLICATION_JSON)
								.content(s)
				)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string(s));
	}

	@Test
	@Order(5)
	public void Demande1() throws Exception {
		String s = "{\"id\":1," +
				"\"idMateriel\":{" +
				"\"id\":1," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"}," +
				"\"severite\":\"mineur\"," +
				"\"description\":\"descri\"," +
				"\"dateDemande\":\"2022-05-25T06:33:44.116+00:00\"," +
				"\"type\":\"panne\"," +
				"\"etat\":{" +
				"\"id\":1," +
				"\"libelle\":\"grave\"}" +
				"}";

		this.mockMvc.perform(get("/demandes"))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string("["+s+"]"));
	}

	@Test
	@Order(6)
	public void addDemande2() throws Exception {
		String s = "{\"id\":1," +
				"\"idMateriel\":{" +
				"\"id\":1," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"}," +
				"\"severite\":\"majeur\"," +
				"\"description\":\"desc\"," +
				"\"dateDemande\":\"2022-05-25T06:33:44.116+00:00\"," +
				"\"type\":\"casse\"," +
				"\"etat\":{" +
				"\"id\":1," +
				"\"libelle\":\"grave\"}" +
				"}";

		this.mockMvc.perform(
						post("/demande")
								.contentType(MediaType.APPLICATION_JSON)
								.content(s)
				)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string(s));
	}

	@Test
	@Order(7)
	public void Demande2() throws Exception {
		String s = "{\"id\":1," +
				"\"idMateriel\":{" +
				"\"id\":1," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"}," +
				"\"severite\":\"majeur\"," +
				"\"description\":\"desc\"," +
				"\"dateDemande\":\"2022-05-25T06:33:44.116+00:00\"," +
				"\"type\":\"casse\"," +
				"\"etat\":{" +
				"\"id\":1," +
				"\"libelle\":\"grave\"}" +
				"}";

		this.mockMvc.perform(get("/demandes"))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string("["+s+"]"));
	}

	@Test
	@Order(8)
	public void addDemande3() throws Exception {
		String s = "{\"id\":2," +
				"\"idMateriel\":{" +
				"\"id\":1," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"}," +
				"\"severite\":\"mineur\"," +
				"\"description\":\"desc\"," +
				"\"dateDemande\":\"2022-05-25T06:33:44.116+00:00\"," +
				"\"type\":\"casse\"," +
				"\"etat\":{" +
				"\"id\":1," +
				"\"libelle\":\"grave\"}" +
				"}";

		this.mockMvc.perform(
						post("/demande")
								.contentType(MediaType.APPLICATION_JSON)
								.content(s)
				)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string(s));
	}

	@Test
	@Order(9)
	public void Demande3() throws Exception {
		String s1 = "{\"id\":1," +
				"\"idMateriel\":{" +
				"\"id\":1," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"}," +
				"\"severite\":\"majeur\"," +
				"\"description\":\"desc\"," +
				"\"dateDemande\":\"2022-05-25T06:33:44.116+00:00\"," +
				"\"type\":\"casse\"," +
				"\"etat\":{" +
				"\"id\":1," +
				"\"libelle\":\"grave\"}" +
				"}";
		String s2 = "{\"id\":2," +
				"\"idMateriel\":{" +
				"\"id\":1," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"}," +
				"\"severite\":\"mineur\"," +
				"\"description\":\"desc\"," +
				"\"dateDemande\":\"2022-05-25T06:33:44.116+00:00\"," +
				"\"type\":\"casse\"," +
				"\"etat\":{" +
				"\"id\":1," +
				"\"libelle\":\"grave\"}" +
				"}";
		this.mockMvc.perform(get("/demandes"))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string("["+s1+","+s2+"]"));
	}

	@Test
	@Order(10)
	public void deleteDemande1() throws Exception {
		this.mockMvc.perform(
						delete("/demande/1")
				)
				.andDo(print())
				.andExpect(status().isOk());
	}

	@Test
	@Order(11)
	public void Demande4() throws Exception {
		String s2 = "{\"id\":2," +
				"\"idMateriel\":{" +
				"\"id\":1," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"}," +
				"\"severite\":\"mineur\"," +
				"\"description\":\"desc\"," +
				"\"dateDemande\":\"2022-05-25T06:33:44.116+00:00\"," +
				"\"type\":\"casse\"," +
				"\"etat\":{" +
				"\"id\":1," +
				"\"libelle\":\"grave\"}" +
				"}";
		this.mockMvc.perform(get("/demandes"))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string("["+s2+"]"));
	}

	@Test
	@Order(12)
	public void updateDemande() throws Exception {
		String s = "{\"id\":2," +
				"\"idMateriel\":{" +
				"\"id\":1," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"}," +
				"\"severite\":\"majeur\"," +
				"\"description\":\"description\"," +
				"\"dateDemande\":\"2022-05-25T06:33:44.116+00:00\"," +
				"\"type\":\"panne\"," +
				"\"etat\":{" +
				"\"id\":1," +
				"\"libelle\":\"grave\"}" +
				"}";
		this.mockMvc.perform(
						put("/demande/2")
								.contentType(MediaType.APPLICATION_JSON)
								.content(s)
				)
				.andDo(print())
				.andExpect(status().isOk());
	}

	@Test
	@Order(13)
	public void Demande5() throws Exception {
		String s2 = "{\"id\":2," +
				"\"idMateriel\":{" +
				"\"id\":1," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"}," +
				"\"severite\":\"majeur\"," +
				"\"description\":\"description\"," +
				"\"dateDemande\":\"2022-05-25T06:33:44.116+00:00\"," +
				"\"type\":\"panne\"," +
				"\"etat\":{" +
				"\"id\":1," +
				"\"libelle\":\"grave\"}" +
				"}";
		this.mockMvc.perform(get("/demandes"))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string("["+s2+"]"));
	}

	@Test
	@Order(14)
	public void deleteDemande2() throws Exception {
		this.mockMvc.perform(
						delete("/demande/2")
				)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(result -> assertFalse(result.getResolvedException() instanceof DemandeNotFoundException));
	}

	@Test
	@Order(15)
	public void Demande6() throws Exception {
		String s2 = "";
		this.mockMvc.perform(get("/demandes"))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string("["+s2+"]"));
	}

	@Test
	@Order(16)
	public void DemandeNotFoundException() throws Exception {
		this.mockMvc.perform(get("/demande/6000"))
				.andDo(print())
				.andExpect(status().isNotFound())
				.andExpect(result -> assertTrue(result.getResolvedException() instanceof DemandeNotFoundException));
	}
}
