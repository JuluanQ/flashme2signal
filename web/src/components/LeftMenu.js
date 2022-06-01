import React, { useState } from 'react';

import '../assets/css/LeftMenu.css'

import { NavLink } from 'react-router-dom';
import {useCookies} from "react-cookie";

const LeftMenu = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    return (
        <>
            <div className='mobileDisplay'>
                <div className="mobileMenuContainer">
                    <img src={require("../assets/icons/ComponentMenu.png")} onClick={() => dropDownClick()} className="dropbtn" alt="menu button" />
                    <div id="myDropdown" className="dropdown-content">
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><h3>Demandes</h3></NavLink>
                        <NavLink to="/Appareils" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><h3>Appareils</h3></NavLink>
                        <NavLink to="/co"><h3 className='Deconnexion'>Se Déconnecter</h3></NavLink>
                    </div>
                    <div className='LogoContainer'>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                            <img src={require("../assets/icons/Logo_Blanc.png")} alt='Logo Université Nantes' className='LogoUnivNanteMenu' />
                        </NavLink>
                    </div>
                </div>

            </div>
            <div className='desktopDisplay'>
                <div className='MenuContainer'>
                    <div className='LogoContainer'>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                            <img src={require("../assets/icons/Logo_Blanc.png")} alt='Logo Université Nantes' className='LogoUnivNanteMenu' />
                        </NavLink>
                    </div>
                    <div className='MenusContainer'>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><h3>Demandes</h3></NavLink>
                        <NavLink to="/Appareils" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><h3>Appareils</h3></NavLink>
                        <NavLink to="/co" onClick={() => {
                            removeCookie('user');
                        }}><h3 className='Deconnexion'>Se Déconnecter</h3></NavLink>
                    </div>
                </div>
            </div>
        </>

    );
};

function dropDownClick() {
    if (document.getElementById("myDropdown").style.display === "block") {
        document.getElementById("myDropdown").style.display = "none"
    }
    else { document.getElementById("myDropdown").style.display = "block" }

}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        //est-ce que mobileDisplay est en display block ?
        if (document.body.getElementsByClassName("mobileDisplay")[0].style.display === "block") {
            document.getElementById("myDropdown").style.display = "none"
        }

    }
}

export default LeftMenu;