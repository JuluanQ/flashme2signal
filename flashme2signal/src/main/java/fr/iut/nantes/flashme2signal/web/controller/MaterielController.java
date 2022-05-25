package fr.iut.nantes.flashme2signal.web.controller;

import fr.iut.nantes.flashme2signal.dao.MaterielDao;
import fr.iut.nantes.flashme2signal.model.Materiel;
import fr.iut.nantes.flashme2signal.web.exceptions.MaterielNotFoundException;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MaterielController {

    @Autowired
    private MaterielDao materielDao;

    @ApiOperation(value = "Récupère tous les materiels")
    @RequestMapping(value = "/materiels", method = RequestMethod.GET)
    public List<Materiel> materielList() {
        List<Materiel> materiel = materielDao.findAll();
        return materiel;
    }

    @ApiOperation(value = "Récupère un materiel")
    @RequestMapping(value = "/materiel/{id}", method = RequestMethod.GET)
    public Materiel materiel(@PathVariable("id") int id) {
        Materiel materiel = materielDao.findById(id);
        if(materiel==null) throw new MaterielNotFoundException("Le materiel avec l'id " + id + " est INTROUVABLE.");
        return materiel;
    }

    @ApiOperation(value = "Créé un materiel")
    @RequestMapping(value = "/materiel", method = RequestMethod.POST)
    public Materiel createMateriel(@RequestBody Materiel materiel) {
        materielDao.save(materiel);
        return materiel;
    }

    @ApiOperation(value = "Modifie un materiel")
    @RequestMapping(value = "/materiel/{id}", method = RequestMethod.PUT)
    public Materiel updateMateriel(@PathVariable("id") int id, @RequestBody Materiel materiel) {
        Materiel materielToUpdate = materielDao.findById(id);
        materielToUpdate.setSalle(materiel.getSalle());
        materielDao.save(materielToUpdate);
        return materielToUpdate;
    }

    @ApiOperation(value = "Supprime un materiel")
    @RequestMapping(value = "/materiel/{id}", method = RequestMethod.DELETE)
    public void deleteMateriel(@PathVariable("id") int id) {
        Materiel materiel = materielDao.findById(id);
        materielDao.delete(materiel);
    }

}
