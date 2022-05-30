import React from 'react';
import LeftMenu from '../components/LeftMenu';
import ButtonInput from '../components/ButtonInput';

// Imports
import { Tag, Select } from 'antd';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import InputText from '../components/InputText';

// CSS
import '../assets/css/DetailIssue.css';
import "antd/dist/antd.css";

const { Option } = Select;


const DetailIssue = () => {
    const params = useParams();
    const navigate = useNavigate();
    return (
        <>
            <LeftMenu />
            <div className='ContentIssue'>
                <p className='IssueTitle'>Demande <span id='IdIssue'>#{params.id}</span></p>
                <div>
                    <Tag className="red">Urgent</Tag>
                    <Tag className="green">En cours</Tag>
                </div>
                <div className='DetailContentIssue'>
                    <div className='DescriptionIssue'>
                        <p className='DescriptionText'>Description :</p>
                        <textarea type="textarea" id="iptDesc"></textarea>
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
                    <div className='ComputerIssue'>
                        <p className='ComputerTitle'>Ordinateur <span id='IdIssue'>#{params.device}</span></p>
                        <div className="Contain">
                            <div className="TxtInput">
                                <InputText title="Salle" type="text" disabled="true" />
                                <InputText title="Autres problèmes" type="text" disabled="true" />
                            </div>
                            <div className='boutons-descripfion' onClick={() => navigate('/DetailDevice')}>
                                <ButtonInput value="Voir plus" className="BtnVoirPlus" ></ButtonInput>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailIssue;