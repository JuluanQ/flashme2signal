import React from 'react';
import ConnectionCard from '../components/ConnectionCard';

import '../assets/css/Connexion.css'

const Connexion = () => {
    return (
        <div className='ConnexionContainer'>
            <div className='LogoUnivNantes'>
                <img src={require("../assets/icons/Logo_Blanc.png")} alt='Logo Université Nantes' className='LogoUnivNanteMenu' />
            </div>
            <div className='connectionCard'>
                <ConnectionCard />
            </div>
        </div>
    );
};

export default Connexion;