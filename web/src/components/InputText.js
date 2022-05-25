import React from 'react';

import '../assets/css/inputText.css'

const InputText = (props) => {
    return (
        <>
            <div className="inputText">
                <label htmlFor={props.title}>{props.title} :</label>
                <input type={props.type} id={props.title} />
            </div>
        </>
    );
};

export default InputText;