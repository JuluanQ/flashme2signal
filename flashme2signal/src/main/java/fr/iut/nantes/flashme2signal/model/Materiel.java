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

    public Materiel(int id, String salle) {
        this.id = id;
        this.salle = salle;
    }

    public Materiel() {}

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
        return Objects.equals(id, materiel.id) && Objects.equals(salle, materiel.salle);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, salle);
    }
}
