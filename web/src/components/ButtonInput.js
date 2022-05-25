import React from 'react';

import '../assets/css/buttonInput.css'

const ButtonInput = (props) => {
    return (
        <>
            <input type="submit" value={props.value} />
        </>
    );
};

export default ButtonInput;