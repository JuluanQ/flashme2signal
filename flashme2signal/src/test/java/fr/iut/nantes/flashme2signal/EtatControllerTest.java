package fr.iut.nantes.flashme2signal;

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
public class EtatControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @Order(1)
    public void addEtat1() throws Exception {
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
    @Order(2)
    public void Etats1() throws Exception {
        String s = "{\"id\":4," +
                "\"libelle\":\"test\"}";
        this.mockMvc.perform(get("/etat/4"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(s));
    }


    @Test
    @Order(3)
    public void addEtat3() throws Exception {
        String s = "{\"id\":4," +
                "\"libelle\":\"test2\"}";

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
    public void Etats2() throws Exception {
        String s = "{\"id\":4," +
                "\"libelle\":\"test2\"}";
        this.mockMvc.perform(get("/etat/4"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(s));
    }

    @Test
    @Order(5)
    public void addEtat2() throws Exception {
        String s = "{\"id\":5," +
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
    @Order(6)
    public void Etats3() throws Exception {
        String s = "{\"id\":5," +
                "\"libelle\":\"test\"}";
        this.mockMvc.perform(get("/etat/5"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(s));
    }

    @Test
    @Order(7)
    public void deleteEtat1() throws Exception {
        this.mockMvc.perform(
                        delete("/etat/5")
                )
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(8)
    public void Etats4() throws Exception {
        String s = "{\"id\":4," +
                "\"libelle\":\"test2\"}";
        this.mockMvc.perform(get("/etat/4"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(s));
    }

    @Test
    @Order(9)
    public void updateEtat() throws Exception {
        String s = "{\"id\":4," +
                "\"libelle\":\"test33\"}";
        this.mockMvc.perform(
                        put("/etat/4")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(s)
                )
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(10)
    public void Etats5() throws Exception {
        String s = "{\"id\":4," +
                "\"libelle\":\"test33\"}";
        this.mockMvc.perform(get("/etat/4"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(s));
    }

    @Test
    @Order(11)
    public void deleteEtat2() throws Exception {
        this.mockMvc.perform(
                        delete("/etat/4")
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(result -> assertFalse(result.getResolvedException() instanceof EtatNotFoundException));
    }

    @Test
    @Order(12)
    public void EtatNotFoundException() throws Exception {
        this.mockMvc.perform(get("/etat/1500"))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof EtatNotFoundException));
    }
}
