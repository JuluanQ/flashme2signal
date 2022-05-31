import React from 'react';
import FormCard from '../components/FormCard';

import '../assets/css/FormDemande.css'

const FormDemande = () => {
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
            severite: document.getElementById('Sévérité').value,
            type: document.getElementById('Type').value,
            identifiant: document.getElementById('Identifiant').value,
            description: document.getElementById('description').value
        };

        console.log(document.getElementById('Sévérité'));

        console.log(data);

    }

};

export default FormDemande;