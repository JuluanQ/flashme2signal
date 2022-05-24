package fr.iut.nantes.flashme2signal.dao;

import com.sun.xml.bind.v2.model.core.ID;
import fr.iut.nantes.flashme2signal.model.Demande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeDao extends JpaRepository<Demande, Integer> {

    Demande findById(int id);
}

