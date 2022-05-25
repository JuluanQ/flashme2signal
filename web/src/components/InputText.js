import React from 'react';

import '../assets/css/inputText.css'

const InputText = (props) => {
    return (
        <>
            <div className="inputText">
                <label htmlFor="">{props.title} :</label>
                <input type={props.type} />
            </div>
        </>
    );
};

export default InputText;