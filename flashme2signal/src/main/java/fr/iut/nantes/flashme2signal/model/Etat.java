package fr.iut.nantes.flashme2signal.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
@Table(name = "etat")
public class Etat {

    @Id
    private int id;

    @Column
    @NotNull
    private String libelle;

    public Etat() {
    }

    public Etat(int id, String libelle) {
        this.id = id;
        this.libelle = libelle;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Etat etat = (Etat) o;
        return id == etat.id && Objects.equals(libelle, etat.libelle);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, libelle);
    }
}
