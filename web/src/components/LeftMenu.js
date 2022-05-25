import React from 'react';

import '../assets/css/LeftMenu.css'

import { NavLink } from 'react-router-dom';

const LeftMenu = () => {

    return (
        <>
            <div className='mobileDisplay'>
                <div className="mobileMenuContainer">
                    <img src={require("../assets/icons/ComponentMenu.png")} onClick={() => dropDownClick()} className="dropbtn" alt="menu button" />
                    <div id="myDropdown" className="dropdown-content">
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><h3>Demandes</h3></NavLink>
                        <NavLink to="/Appareils" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><h3>Appareils</h3></NavLink>
                        {/* TODO Deconnexion */}
                        <h3 className='Deconnexion'>Se Déconnecter</h3>
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
                        {/* TODO Deconnexion */}
                        <h3 className='Deconnexion'>Se Déconnecter</h3>
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
        document.getElementById("myDropdown").style.display = "none"
    }
}

export default LeftMenu;