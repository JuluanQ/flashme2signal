package fr.iut.nantes.flashme2signal.web.controller;

import com.fasterxml.jackson.databind.annotation.JsonAppend;
import fr.iut.nantes.flashme2signal.dao.EtatDao;
import fr.iut.nantes.flashme2signal.model.Etat;
import fr.iut.nantes.flashme2signal.web.exceptions.EtatNotFoundException;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

public class EtatController {

    @Autowired
    private EtatDao etatDao;

    @ApiOperation(value = "Récupère tous les états")
    @RequestMapping(value = "/etats", method = RequestMethod.GET)
    public List<Etat> etatList() {
        List<Etat> etat = etatDao.findAll();
        System.out.println(etat);
        return etat;
    }

    @ApiOperation(value = "Récupère un état")
    @RequestMapping(value = "/etat/{id}", method = RequestMethod.GET)
    public Etat etat(@PathVariable("id") int id) {
        Etat etat = etatDao.findById(id);
        if(etat==null) throw new EtatNotFoundException("L'état avec l'id " + id + " est INTROUVABLE.");
        return etat;
    }

    @ApiOperation(value = "Créé un état")
    @RequestMapping(value = "/etat", method = RequestMethod.POST)
    public Etat createEtat(@RequestBody Etat etat) {
        etatDao.save(etat);
        return etat;
    }

    @ApiOperation(value = "Modifie un état")
    @RequestMapping(value = "/etat/{id}", method = RequestMethod.PUT)
    public Etat updateEtat(@PathVariable("id") int id, @RequestBody Etat etat) {
        Etat etatToUpdate = etatDao.findById(id);
        etatToUpdate.setId(etat.getId());
        etatToUpdate.setLibelle(etat.getLibelle());
        etatDao.save(etatToUpdate);
        return etatToUpdate;
    }

    @ApiOperation(value = "Supprime un état")
    @RequestMapping(value = "/etat/{id}", method = RequestMethod.DELETE)
    public void deleteEtat(@PathVariable("id") int id) {
        Etat etat = etatDao.findById(id);
        if(etat==null) throw new EtatNotFoundException("L'état avec l'id " + id + " est INTROUVABLE.");
        etatDao.delete(etat);
    }
}
