package fr.iut.nantes.flashme2signal;

import fr.iut.nantes.flashme2signal.dao.DemandeDao;
import fr.iut.nantes.flashme2signal.dao.MaterielDao;
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
public class MaterielControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MaterielDao materielDao;

    @Autowired
    private DemandeDao demandeDao;

    @Test
    @Order(1)
    public void emptyMateriel() throws Exception {
        demandeDao.deleteAll();
        materielDao.deleteAll();
        this.mockMvc.perform(get("/materiels"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("[]"));
    }

    @Test
    @Order(2)
    public void addMateriel1() throws Exception {
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
    public void Materiels1() throws Exception {
        String s = "{\"id\":1," +
                "\"salle\":\"1\"," +
                "\"type\":\"tablette\"}";
        this.mockMvc.perform(get("/materiels"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("["+s+"]"));
    }

    @Test
    @Order(4)
    public void addMateriel3() throws Exception {
        String s = "{\"id\":1," +
                "\"salle\":\"12\"," +
                "\"type\":\"pc\"}";

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
    @Order(5)
    public void Materiels2() throws Exception {
        String s = "{\"id\":1," +
                "\"salle\":\"12\"," +
                "\"type\":\"pc\"}";
        this.mockMvc.perform(get("/materiels"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("["+s+"]"));
    }

    @Test
    @Order(6)
    public void addMateriel2() throws Exception {
        String s = "{\"id\":2," +
                "\"salle\":\"salle2\"," +
                "\"type\":\"telephone\"}";

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
    @Order(7)
    public void Materiels3() throws Exception {
        String s1 = "{\"id\":1," +
                "\"salle\":\"12\"," +
                "\"type\":\"pc\"}";
        String s2 = "{\"id\":2," +
                "\"salle\":\"salle2\"," +
                "\"type\":\"telephone\"}";
        this.mockMvc.perform(get("/materiels"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("["+s1+","+s2+"]"));
    }

    @Test
    @Order(8)
    public void deleteMateriel1() throws Exception {
        this.mockMvc.perform(
                        delete("/materiel/1")
                )
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(9)
    public void Materiels4() throws Exception {
        String s2 = "{\"id\":2," +
                "\"salle\":\"salle2\"," +
                "\"type\":\"telephone\"}";
        this.mockMvc.perform(get("/materiels"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("["+s2+"]"));
    }

    @Test
    @Order(10)
    public void updateMateriel() throws Exception {
        String s = "{\"id\":2," +
                "\"salle\":\"salle12\"," +
                "\"type\":\"pc\"}";
        this.mockMvc.perform(
                        put("/materiel/2")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(s)
                )
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(11)
    public void Materiels5() throws Exception {
        String s = "{\"id\":2," +
                "\"salle\":\"salle12\"," +
                "\"type\":\"pc\"}";
        this.mockMvc.perform(get("/materiels"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("["+s+"]"));
    }

    @Test
    @Order(12)
    public void deleteMateriel2() throws Exception {
        this.mockMvc.perform(
                        delete("/materiel/2")
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(result -> assertFalse(result.getResolvedException() instanceof MaterielNotFoundException));
    }

    @Test
    @Order(13)
    public void Materiels6() throws Exception {
        String s2 = "";
        this.mockMvc.perform(get("/materiels"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("["+s2+"]"));
    }

    @Test
    @Order(14)
    public void MaterielNotFoundException() throws Exception {
        this.mockMvc.perform(get("/materiel/1500"))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof MaterielNotFoundException));
    }
}