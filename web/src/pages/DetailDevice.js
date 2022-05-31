import { Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ButtonInput from '../components/ButtonInput';
import IssueTable from '../components/IssueTable';
import LeftMenu from '../components/LeftMenu';

import '../assets/css/DetailDevice.css'

const DetailDevice = () => {

    const param = useParams()
    const [device, setDevice] = useState()

    const [dataIssues, setDataIssues] = useState([]);
    const [issues, setIssues] = useState([])
    const [data, setData] = useState()

    const [nbIssues, setNbIssues] = useState(0)

    //Récupération des données
    useEffect(() => {
        fetch("http://212.227.3.231:8085/flashme2signal/materiel/" + param.id)
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
            .catch(err => console.log(err))
    }, [param.id]);

    useEffect(() => {
        if (data !== undefined && device === undefined) {
            fetch("http://212.227.3.231:8085/flashme2signal/demandes/")
                .then(res => res.json())
                .then(data => {
                    data.forEach(issue => {
                        if (issue.idMateriel !== null) {
                            if (issue.idMateriel.id === param.id) {
                                setDataIssues(dataIssues => [...dataIssues, issue])
                                if (issue.etat === "En cours") {
                                    setNbIssues(nbIssues => nbIssues + 1)
                                }
                            }
                        }
                    });
                })
                .catch(err => console.log(err))
            let json = {
                "id": data.id,
                "salle": data.salle,
                "type": data.type,
            }
            setDevice(json)
        }
    }, [data]);

    useEffect(() => {
        if (dataIssues !== undefined) {
            dataIssues.forEach(issue => {
                let json = {
                    "id": issue.id,
                    "appareil": issue.idMateriel.id,
                    "dateDemande": issue.dateDemande.split('T')[0],
                    "demandeur": issue.demandeur,
                    "description": issue.description,
                    "type": issue.type,
                    "severite": issue.severite,
                }
                if (issue.description.length > 50) {
                    json.description = issue.description.substring(0, 50) + "..."
                }
                if (issue.etat !== null) {
                    json.statut = issue.etat.libelle;
                }
                setIssues(issues => [...issues, json])
            });
        }
    }, [dataIssues]);

    return (
        <>
            <LeftMenu />
            <div className='ContentIssue'>
                <div className="TopAppareil">
                    <p className="IssueTitle">Appareil #{param.id}</p>
                    <p className="DescriptionText">Salle : {device !== undefined ? device.salle : "..."}</p>
                </div>
                <div className="bottomNameContainer">
                    <Tag color="green">{nbIssues} problèmes</Tag>
                </div>

                <div className='DetailContentIssueAppareil'>
                    <div className='DescriptionIssueAppareil'>
                        <div className="issuesContainerAppareil">
                            {issues ? <IssueTable data={issues} /> : <></>}
                        </div>

                    </div>
                    <div className='ComputerIssue'>
                        <div className="qrCodeContainer">
                            <img src="" alt="" width="10em" height="10em" />
                        </div>
                        <div className="boutons-descripfion">
                            <ButtonInput value="Générer" />
                            <DownloadOutlined className='downloadButton' />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default DetailDevice;