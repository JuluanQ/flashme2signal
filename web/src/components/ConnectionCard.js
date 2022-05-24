import React from 'react';

import '../assets/css/connectionCard.css'
import ButtonInput from './ButtonInput';
import InputText from './InputText';


const ConnectionCard = () => {
    return (
        <>
            <div className="connectionCardContainer">
                <h3 className='connexionHeader'>Connexion</h3>
                <div className="formContainer">
                    <form action="">
                        <InputText title="Identifiant" type="text" />
                        <InputText title="Mot de passe" type="password" />
                        <div className="submitConnexion">
                            <ButtonInput value="Se connecter" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ConnectionCard;