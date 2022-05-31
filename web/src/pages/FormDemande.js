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
        console.log("submit");
        const data = {
            idAppareil: params.idApp,
            severite: document.getElementById('Sévérité').parentElement.parentElement.textContent,
            type: document.getElementById('Type').parentElement.parentElement.textContent,
            identifiant: document.getElementById('Identifiant').value,
            description: document.getElementById('description').value
        };

        console.log(data);

    }

};

export default FormDemande;