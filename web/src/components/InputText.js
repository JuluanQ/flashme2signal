import React from 'react';

import '../assets/css/inputText.css'

const InputText = (props) => {
    return (
        <>
            <div className="inputText">
                <label htmlFor={props.title}>{props.title} :</label>
                <input id={props.title} type={props.type} />
            </div>
        </>
    );
};

export default InputText;