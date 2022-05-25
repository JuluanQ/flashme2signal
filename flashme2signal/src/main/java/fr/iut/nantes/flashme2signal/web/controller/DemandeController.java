package fr.iut.nantes.flashme2signal.web.controller;

import fr.iut.nantes.flashme2signal.web.exceptions.DemandeNotFoundException;
import io.swagger.annotations.ApiOperation;
import fr.iut.nantes.flashme2signal.dao.DemandeDao;
import fr.iut.nantes.flashme2signal.model.Demande;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DemandeController {

    @Autowired
    private DemandeDao demandeDao;

    @ApiOperation(value = "Récupère toutes les demandes")
    @RequestMapping(value = "/demandes", method = RequestMethod.GET)
    public List<Demande> demandeList() {
        List<Demande> demande = demandeDao.findAll();
        System.out.println(demande);
        return demande;
    }

    @ApiOperation(value = "Récupère une demande")
    @RequestMapping(value = "/demande/{id}", method = RequestMethod.GET)
    public Demande demande(@PathVariable("id") int id) {
        Demande demande = demandeDao.findById(id);
        if(demande==null) throw new DemandeNotFoundException("La demande avec l'id " + id + " est INTROUVABLE.");
        return demande;
    }

    @ApiOperation(value = "Créé une demande")
    @RequestMapping(value = "/demande", method = RequestMethod.POST)
    public Demande createDemande(@RequestBody Demande demande) {
        demandeDao.save(demande);
        return demande;
    }

    @ApiOperation(value = "Modifie une demande")
    @RequestMapping(value = "/demande/{id}", method = RequestMethod.PUT)
    public Demande updateDemande(@PathVariable("id") int id, @RequestBody Demande demande) {
        Demande demandeToUpdate = demandeDao.findById(id);
        demandeToUpdate.setIdMateriel(demande.getIdMateriel());
        demandeToUpdate.setSeverite(demande.getSeverite());
        demandeToUpdate.setDescription(demande.getDescription());
        demandeToUpdate.setDateDemande(demande.getDateDemande());
        demandeToUpdate.setType(demande.getType());
        demandeToUpdate.setEtat(demande.getEtat());
        demandeDao.save(demandeToUpdate);
        return demandeToUpdate;
    }

    @ApiOperation(value = "Supprime une demande")
    @RequestMapping(value = "/demande/{id}", method = RequestMethod.DELETE)
    public void deleteDemande(@PathVariable("id") int id) {
        Demande demande = demandeDao.findById(id);
        demandeDao.delete(demande);
    }

}
