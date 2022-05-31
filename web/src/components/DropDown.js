import React from 'react';

import '../assets/css/dropDown.css'
import {Select} from "antd";

const { Option } = Select;

const InputText = (props) => {
    return (
        <>
            <div className="containerDropDown">
                <p className='label'>{props.label} :</p>
                <Select id={props.label} className='selectDrop' size="small">
                    {props.options.map((element, i) => {
                        return (
                            <Option value={element}>{element}</Option>
                        )
                    })}
                </Select>
            </div>
        </>
    );
};

export default InputText;