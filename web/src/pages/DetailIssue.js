import React from 'react';
import LeftMenu from '../components/LeftMenu';
import ButtonInput from '../components/ButtonInput';

// Imports
import { Tag, Select, Button } from 'antd';

// CSS
import '../assets/css/DetailIssue.css';
import "antd/dist/antd.css";

const { Option } = Select;


const DetailIssue = () => {
    return (
        <>
            <LeftMenu />
            <div className='ContentIssue'>
                <p className='IssueTitle'>Demande <span id='IdIssue'>#1234</span></p>
                <div>
                    <Tag color="#F04949">Urgent</Tag>
                    <Tag color="#F09149">En cours</Tag>
                </div>
                <div className='DetailContentIssue'>
                    <div className='DescriptionIssue'>
                        <p className='DescriptionText'>Description :</p>
                        <input type="text" id="iptDesc"></input>
                        <p>Cette demande a été créée il y'a <span id="nCreation">2 jours</span></p>
                        <p className='DescriptionText'>Sévérité :</p>
                        <Select className='SelectSeverity' size="small">
                            <Option value="Majeur">Urgent</Option>
                            <Option value="Moyen">Moyen</Option>
                            <Option value="Mineur">Mineur</Option>
                        </Select>
                        <div className='boutons-descripfion'>
                            <ButtonInput value="Terminé"></ButtonInput>
                            <ButtonInput value="Annuler" color="Red"></ButtonInput>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailIssue;