package fr.iut.nantes.flashme2signal.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "Demande")
public class Demande {

    @Id
    private int id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_materiel")
    private Materiel idMateriel;

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
    private String demandeur;


    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_etat")
    private Etat etat;

    public Demande() {
    }

    public Demande(Materiel idMateriel, String severite, String description, Date dateDemande, String type, Etat etat, String demandeur) {
        this.idMateriel = idMateriel;
        this.severite = severite;
        this.description = description;
        this.dateDemande = dateDemande;
        this.type = type;
        this.etat = etat;
        this.demandeur = demandeur;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Materiel getIdMateriel() {
        return idMateriel;
    }

    public void setIdMateriel(Materiel idMateriel) {
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

    public Etat getEtat() {
        return etat;
    }

    public void setEtat(Etat etat) {
        this.etat = etat;
    }

    public String getDemandeur() {
        return demandeur;
    }

    public void setDemandeur(String demandeur) {
        this.demandeur = demandeur;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Demande demande = (Demande) o;
        return id == demande.id && Objects.equals(idMateriel, demande.idMateriel) && Objects.equals(severite, demande.severite) && Objects.equals(description, demande.description) && Objects.equals(dateDemande, demande.dateDemande) && Objects.equals(type, demande.type) && Objects.equals(demandeur, demande.demandeur) && Objects.equals(etat, demande.etat);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, idMateriel, severite, description, dateDemande, type, demandeur, etat);
    }
}
