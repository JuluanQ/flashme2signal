import React from 'react';
import { useParams } from 'react-router-dom';

// Components
import FormCard from '../components/FormCard';

// CSS
import '../assets/css/FormDemande.css'

const FormDemande = () => {
    const params = useParams();
    return (
        <>
            <div className='FormContainer'>
                <div className='LogoUnivNantes-min'>
                    <img src={require("../assets/icons/Logo_Blanc.png")} alt='Logo Université Nantes' className='LogoUnivNanteMenu' />
                </div>
                <FormCard />
            </div>
            <button className='boutonEnvoyer' onClick={handleSubmit}>Envoyer</button>
        </>
    );


    function handleSubmit() {
        let etat ={
            id : 1,
            libelle: "En cours"
        }
        
        fetch("http://212.227.3.231:8085/flashme2signal/materiel/" + params.id)
            .then(res => res.json())
            .then(dataMat => {

                let materiel = {
                    id: dataMat.id,
                    salle: dataMat.salle,
                    type: dataMat.type
                }

                const data = {
                    dateDemande: new Date().toISOString(),
                    demandeur: document.getElementById('Identifiant').value,
                    description: document.getElementById('description').value,
                    severite: document.getElementById('Sévérité').parentElement.parentElement.textContent,
                    type: document.getElementById('Type').parentElement.parentElement.textContent,
                    etat: etat,
                    idMateriel: materiel
                };
                console.log(data);
        
                fetch("http://212.227.3.231:8085/flashme2signal/demande", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data),
                });
            })
            .catch(err => {
                console.log(err);
            });
            
        
        

    }

};

export default FormDemande;