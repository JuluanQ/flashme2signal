package fr.iut.nantes.flashme2signal.model;

import com.sun.istack.NotNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "Materiel")
public class Materiel {

    @Id
    private int id;

    @Column
    @NotNull
    private String salle;

    @Column
    @NotNull
    private String type;

    public Materiel(int id, String salle, String type) {
        this.id = id;
        this.salle = salle;
        this.type = type;
    }

    public Materiel() {}

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

        if (id != materiel.id) return false;
        if (salle != null ? !salle.equals(materiel.salle) : materiel.salle != null) return false;
        return type != null ? type.equals(materiel.type) : materiel.type == null;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (salle != null ? salle.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        return result;
    }
}
