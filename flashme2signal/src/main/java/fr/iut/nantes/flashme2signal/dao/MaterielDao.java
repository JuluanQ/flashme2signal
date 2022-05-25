package fr.iut.nantes.flashme2signal.dao;

import fr.iut.nantes.flashme2signal.model.Materiel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterielDao extends JpaRepository<Materiel, Integer> {

    Materiel findById(int id);
}

