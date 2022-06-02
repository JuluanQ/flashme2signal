package fr.iut.nantes.flashme2signal;

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

    @Test
    @Order(1)
    public void addMateriel1() throws Exception {
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
    public void Materiels1() throws Exception {
        String s = "{\"id\":1000000," +
                "\"salle\":\"1\"," +
                "\"type\":\"tablette\"}";
        this.mockMvc.perform(get("/materiel/1000000"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(s));
    }

    @Test
    @Order(3)
    public void addMateriel3() throws Exception {
        String s = "{\"id\":1000000," +
                "\"salle\":\"2\"," +
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
    @Order(4)
    public void Materiels2() throws Exception {
        String s = "{\"id\":1000000," +
                "\"salle\":\"2\"," +
                "\"type\":\"pc\"}";
        this.mockMvc.perform(get("/materiel/1000000"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(s));
    }

    @Test
    @Order(5)
    public void addMateriel2() throws Exception {
        String s = "{\"id\":1000001," +
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
    @Order(6)
    public void Materiels3() throws Exception {
        String s = "{\"id\":1000001," +
                "\"salle\":\"1\"," +
                "\"type\":\"tablette\"}";
        this.mockMvc.perform(get("/materiel/1000001"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(s));
    }

    @Test
    @Order(7)
    public void deleteMateriel1() throws Exception {
        this.mockMvc.perform(
                        delete("/materiel/1000001")
                )
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(8)
    public void updateMateriel() throws Exception {
        String s = "{\"id\":1000000," +
                "\"salle\":\"salle2\"," +
                "\"type\":\"tablette\"}";
        this.mockMvc.perform(
                        put("/materiel/1000000")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(s)
                )
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(9)
    public void Materiels5() throws Exception {
        String s = "{\"id\":1000000," +
                "\"salle\":\"salle2\"," +
                "\"type\":\"tablette\"}";
        this.mockMvc.perform(get("/materiel/1000000"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(s));
    }

    @Test
    @Order(10)
    public void deleteMateriel2() throws Exception {
        this.mockMvc.perform(
                        delete("/materiel/1000000")
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(result -> assertFalse(result.getResolvedException() instanceof MaterielNotFoundException));
    }

    @Test
    @Order(11)
    public void MaterielNotFoundException() throws Exception {
        this.mockMvc.perform(get("/materiel/1500"))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof MaterielNotFoundException));
    }
}
