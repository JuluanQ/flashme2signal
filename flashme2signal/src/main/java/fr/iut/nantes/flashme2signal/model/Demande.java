package fr.iut.nantes.flashme2signal.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
public class Demande {

    @Id
    private int id;

    @Column
    @NotNull
    private String idMateriel;

    @Column
    @NotNull
    private String severite;

    @Column
    @NotNull
    private String description;

    @Column
    @NotNull
    private Date dateDemande;

    @Column
    @NotNull
    private String type;

    @Column
    @NotNull
    private String etat;

    public Demande() {
    }

    public Demande(String idMateriel, String severite, String description, Date dateDemande, String type, String etat) {
        this.idMateriel = idMateriel;
        this.severite = severite;
        this.description = description;
        this.dateDemande = dateDemande;
        this.type = type;
        this.etat = etat;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIdMateriel() {
        return idMateriel;
    }

    public void setIdMateriel(String idMateriel) {
        this.idMateriel = idMateriel;
    }

    public String getSeverite() {
        return severite;
    }

    public void setSeverite(String severite) {
        this.severite = severite;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDateDemande() {
        return dateDemande;
    }

    public void setDateDemande(Date date) {
        this.dateDemande = date;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Demande demande = (Demande) o;
        return id == demande.id && Objects.equals(idMateriel, demande.idMateriel) && Objects.equals(severite, demande.severite) && Objects.equals(description, demande.description) && Objects.equals(dateDemande, demande.dateDemande) && Objects.equals(type, demande.type) && Objects.equals(etat, demande.etat);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, idMateriel, severite, description, dateDemande, type, etat);
    }
}
