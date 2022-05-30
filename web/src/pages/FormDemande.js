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
            <div className='boutonEnvoyer'>Envoyer</div>
        </>
    );
};

export default FormDemande;