package fr.iut.nantes.flashme2signal;

import fr.iut.nantes.flashme2signal.web.exceptions.DemandeNotFoundException;
import fr.iut.nantes.flashme2signal.web.exceptions.EtatNotFoundException;
import fr.iut.nantes.flashme2signal.web.exceptions.MaterielNotFoundException;
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

	@Test
	@Order(1)
	public void addMateriel() throws Exception {
		String s = "{\"id\":1000000," +
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
	@Order(2)
	public void addEtat() throws Exception {
		String s = "{\"id\":4," +
				"\"libelle\":\"test\"}";

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
	@Order(3)
	public void addDemande1() throws Exception {
		String s = "{" +
				"\"id\":1000000," +
				"\"idMateriel\":{" +
				"\"id\":1000000," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"" +
				"}," +
				"\"severite\":\"Moyen\"," +
				"\"description\":\"Panne d'ecran test\"," +
				"\"dateDemande\":1653986668717," +
				"\"type\":\"panne\"," +
				"\"demandeur\":\"E21A421F\"," +
				"\"etat\":{" +
				"\"id\":4," +
				"\"libelle\":\"test\"" +
				"}" +
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
	@Order(4)
	public void Demande1() throws Exception {
		String s = "{" +
				"\"id\":1000000," +
				"\"idMateriel\":{" +
				"\"id\":1000000," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"" +
				"}," +
				"\"severite\":\"Moyen\"," +
				"\"description\":\"Panne d'ecran test\"," +
				"\"dateDemande\":1653986668717," +
				"\"type\":\"panne\"," +
				"\"demandeur\":\"E21A421F\"," +
				"\"etat\":{" +
				"\"id\":4," +
				"\"libelle\":\"test\"" +
				"}" +
				"}";

		this.mockMvc.perform(get("/demande/1000000"))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string(s));
	}

	@Test
	@Order(5)
	public void addDemande2() throws Exception {
		String s = "{" +
				"\"id\":1000000," +
				"\"idMateriel\":{" +
				"\"id\":1000000," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"" +
				"}," +
				"\"severite\":\"Mineure\"," +
				"\"description\":\"Panne test\"," +
				"\"dateDemande\":1653986668717," +
				"\"type\":\"panne\"," +
				"\"demandeur\":\"E21A221F\"," +
				"\"etat\":{" +
				"\"id\":4," +
				"\"libelle\":\"test\"" +
				"}" +
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
	@Order(6)
	public void Demande2() throws Exception {
		String s = "{" +
				"\"id\":1000000," +
				"\"idMateriel\":{" +
				"\"id\":1000000," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"" +
				"}," +
				"\"severite\":\"Mineure\"," +
				"\"description\":\"Panne test\"," +
				"\"dateDemande\":1653986668717," +
				"\"type\":\"panne\"," +
				"\"demandeur\":\"E21A221F\"," +
				"\"etat\":{" +
				"\"id\":4," +
				"\"libelle\":\"test\"" +
				"}" +
				"}";

		this.mockMvc.perform(get("/demande/1000000"))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string(s));
	}

	@Test
	@Order(7)
	public void addDemande3() throws Exception {
		String s = "{" +
				"\"id\":1000001," +
				"\"idMateriel\":{" +
				"\"id\":1000000," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"" +
				"}," +
				"\"severite\":\"Majeur\"," +
				"\"description\":\"Panne ecran test\"," +
				"\"dateDemande\":1653986668717," +
				"\"type\":\"panne\"," +
				"\"demandeur\":\"E21A251F\"," +
				"\"etat\":{" +
				"\"id\":4," +
				"\"libelle\":\"test\"" +
				"}" +
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
	@Order(8)
	public void Demande3() throws Exception {
		String s = "{" +
				"\"id\":1000001," +
				"\"idMateriel\":{" +
				"\"id\":1000000," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"" +
				"}," +
				"\"severite\":\"Majeur\"," +
				"\"description\":\"Panne ecran test\"," +
				"\"dateDemande\":1653986668717," +
				"\"type\":\"panne\"," +
				"\"demandeur\":\"E21A251F\"," +
				"\"etat\":{" +
				"\"id\":4," +
				"\"libelle\":\"test\"" +
				"}" +
				"}";
		this.mockMvc.perform(get("/demande/1000001"))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string(s));
	}

	@Test
	@Order(9)
	public void deleteDemande1() throws Exception {
		this.mockMvc.perform(
						delete("/demande/1000001")
				)
				.andDo(print())
				.andExpect(status().isOk());
	}

	@Test
	@Order(10)
	public void Demande4() throws Exception {
		String s = "{" +
				"\"id\":1000000," +
				"\"idMateriel\":{" +
				"\"id\":1000000," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"" +
				"}," +
				"\"severite\":\"Mineure\"," +
				"\"description\":\"Panne test\"," +
				"\"dateDemande\":1653986668717," +
				"\"type\":\"panne\"," +
				"\"demandeur\":\"E21A221F\"," +
				"\"etat\":{" +
				"\"id\":4," +
				"\"libelle\":\"test\"" +
				"}" +
				"}";
		this.mockMvc.perform(get("/demande/1000000"))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string(s));
	}

	@Test
	@Order(11)
	public void updateDemande() throws Exception {
		String s = "{" +
				"\"id\":1000000," +
				"\"idMateriel\":{" +
				"\"id\":1000000," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"" +
				"}," +
				"\"severite\":\"Majeur\"," +
				"\"description\":\"test\"," +
				"\"dateDemande\":1653986668717," +
				"\"type\":\"panne\"," +
				"\"demandeur\":\"E21A251F\"," +
				"\"etat\":{" +
				"\"id\":4," +
				"\"libelle\":\"test\"" +
				"}" +
				"}";
		this.mockMvc.perform(
						put("/demande/1000000")
								.contentType(MediaType.APPLICATION_JSON)
								.content(s)
				)
				.andDo(print())
				.andExpect(status().isOk());
	}

	@Test
	@Order(12)
	public void Demande5() throws Exception {
		String s = "{" +
				"\"id\":1000000," +
				"\"idMateriel\":{" +
				"\"id\":1000000," +
				"\"salle\":\"1\"," +
				"\"type\":\"tablette\"" +
				"}," +
				"\"severite\":\"Majeur\"," +
				"\"description\":\"test\"," +
				"\"dateDemande\":1653986668717," +
				"\"type\":\"panne\"," +
				"\"demandeur\":\"E21A221F\"," +
				"\"etat\":{" +
				"\"id\":4," +
				"\"libelle\":\"test\"" +
				"}" +
				"}";
		this.mockMvc.perform(get("/demande/1000000"))
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string(s));
	}

	@Test
	@Order(13)
	public void deleteDemande2() throws Exception {
		this.mockMvc.perform(
						delete("/demande/1000000")
				)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(result -> assertFalse(result.getResolvedException() instanceof DemandeNotFoundException));
	}

	@Test
	@Order(14)
	public void DemandeNotFoundException() throws Exception {
		this.mockMvc.perform(get("/demande/6000"))
				.andDo(print())
				.andExpect(status().isNotFound())
				.andExpect(result -> assertTrue(result.getResolvedException() instanceof DemandeNotFoundException));
	}

	@Test
	@Order(15)
	public void deleteEtat() throws Exception {
		this.mockMvc.perform(
						delete("/etat/4")
				)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(result -> assertFalse(result.getResolvedException() instanceof EtatNotFoundException));
	}

	@Test
	@Order(16)
	public void deleteMateriel() throws Exception {
		this.mockMvc.perform(
						delete("/materiel/1000000")
				)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(result -> assertFalse(result.getResolvedException() instanceof MaterielNotFoundException));
	}
}
