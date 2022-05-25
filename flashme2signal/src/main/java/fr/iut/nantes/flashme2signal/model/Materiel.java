package fr.iut.nantes.flashme2signal.model;

import com.sun.istack.NotNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Materiel {

    @Id
    private String id;

    @Column
    @NotNull
    private String salle;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSalle() {
        return salle;
    }

    public void setSalle(String salle) {
        this.salle = salle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Materiel materiel = (Materiel) o;

        if (id != null ? !id.equals(materiel.id) : materiel.id != null) return false;
        return salle != null ? salle.equals(materiel.salle) : materiel.salle == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (salle != null ? salle.hashCode() : 0);
        return result;
    }
}
