package fr.iut.nantes.flashme2signal.dao;

import fr.iut.nantes.flashme2signal.model.Etat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EtatDao extends JpaRepository<Etat, Integer> {

    Etat findById(int id);
}
