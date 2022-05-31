import React from 'react';

import '../assets/css/formCard.css'
import InputText from './InputText';
import DropDown from "./DropDown";

const FormCard = () => {

    const optionsSeverite = ["Urgent", "Moyen", "Mineur"];
    const optionsType = ["Matériel détérioré", "Matériel manquant", "Panne"];

    return (
        <>
            <div className="formCardContainer">
                <DropDown label="Sévérité" options={optionsSeverite}/>
                <DropDown label="Type" options={optionsType}/>
                <InputText title="Identifiant" type="text" />
                <p className='label'>Description :</p>
                <textarea id="description" className='textArea' type="textarea"></textarea>
            </div>
        </>
    );
};

export default FormCard;