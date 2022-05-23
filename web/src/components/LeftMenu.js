import React from 'react';

import '../assets/css/LeftMenu.css'

import { NavLink, useNavigate } from 'react-router-dom';

const LeftMenu = () => {

    const navigate = useNavigate()

    return (
        <div className='LeftMenuContainer'>
            <div className='LogoContainer'>
                <img src='..\assets\icons\Logo_Blanc.png' alt='Logo Université Nantes' className='LogoUnivNanteMenu' />
            </div>

            {navigate ?
                <div className='MenusContainer'>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><h3>Home</h3></NavLink>
                    <NavLink to="/Demandes" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><h3>Demandes</h3></NavLink>
                    <NavLink to="/Appareils" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><h3>Appareils</h3></NavLink>
                    <h3 className='Deconnexion'>Se Déconnecter</h3>
                </div>
                : <></>
            }


        </div>
    );
};

export default LeftMenu;