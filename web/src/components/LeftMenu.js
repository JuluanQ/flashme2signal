import React from 'react';

import '../assets/css/LeftMenu.css'

import { NavLink } from 'react-router-dom';

const LeftMenu = () => {
    return (
        <div className='LeftMenuContainer'>
            <div className='LogoContainer'>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <img src={require("../assets/icons/Logo_Blanc.png")} alt='Logo Université Nantes' className='LogoUnivNanteMenu' />
                </NavLink>
            </div>
            <div className='MenusContainer'>
                <NavLink to="/Demandes" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><h3>Demandes</h3></NavLink>
                <NavLink to="/Appareils" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><h3>Appareils</h3></NavLink>
                {/* TODO Deconnexion */}
                <h3 className='Deconnexion'>Se Déconnecter</h3>
            </div>


        </div>
    );
};

export default LeftMenu;