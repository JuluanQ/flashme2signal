import { notification, Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ButtonInput from '../components/ButtonInput';
import IssueTable from '../components/IssueTable';
import LeftMenu from '../components/LeftMenu';

import '../assets/css/DetailDevice.css'

const DetailDevice = () => {

    const param = useParams()
    const location = useLocation();
    const [device, setDevice] = useState()

    const [dataIssues, setDataIssues] = useState([]);
    const [issues, setIssues] = useState()
    const [data, setData] = useState()

    const [finished, setFinished] = useState(false);
    const [nbIssues, setNbIssues] = useState(0)

    //Récupération des données
    useEffect(() => {
        //Reset des states
        setDevice(undefined);
        setDataIssues([]);
        setIssues(undefined);
        setData(undefined);
        setFinished(false);
        setNbIssues(0)

        fetch("http://212.227.3.231:8085/flashme2signal/materiel/" + param.id)
            .then(res => res.json())
            .then(data => {
                setData(data);
                let json = {
                    "id": data.id,
                    "salle": data.salle,
                    "type": data.type,
                }
                setDevice(json)
            })
            .catch(err => console.log(err))
    }, [location]);

    useEffect(() => {
        if (data !== undefined && dataIssues.length === 0) {
            fetch("http://212.227.3.231:8085/flashme2signal/demandes/")
                .then(res => res.json())
                .then(data => {
                    data.forEach(issue => {
                        if (issue.idMateriel.id === parseInt(param.id)) {
                            dataIssues.push(issue)
                        }
                    });
                    setFinished(true)
                })
                .catch(err => console.log(err))
        }
    }, [data]);

    useEffect(() => {
        if (dataIssues.length > 0) {
            setIssues([])
            dataIssues.forEach(issue => {
                let dateD = new Date(issue.dateDemande);
                dateD = dateD.toISOString().split('T')[0]
                let json = {
                    "id": issue.id,
                    "appareil": issue.idMateriel.id,
                    "dateDemande": dateD,
                    "demandeur": issue.demandeur,
                    "description": issue.description,
                    "type": issue.type,
                    "severite": issue.severite,
                    "statut": issue.etat.libelle,
                }
                if (issue.description.length > 50) {
                    json.description = issue.description.substring(0, 50) + "..."
                }
                if (issue.etat.libelle === "En cours") {
                    setNbIssues(nbIssues => nbIssues + 1)
                }
                setIssues(issues => [...issues, json])
            });
        }
    }, [finished]);

    function generateQrCode() {

    }

    return (
        <>
            <LeftMenu />
            <div className='ContentIssue'>
                <div className="TopAppareil">
                    <p className="IssueTitle">{device !== undefined ? device.type : "Appareil"} <span id='IdIssue'>#{param.id}</span></p>
                    <p className="DescriptionText">Salle : {device !== undefined ? device.salle : "..."}</p>
                </div>
                <div className="bottomNameContainer">
                    <Tag className="orange">{nbIssues} demande en cours</Tag>
                </div>

                <div className='DetailContentIssueAppareil'>
                    <div className='DescriptionIssueAppareil'>
                        <div className="issuesContainerAppareil">
                            {issues ? <IssueTable data={issues} /> : <></>}
                        </div>

                    </div>
                    <div className='DetailQRCode'>
                        <img className="img-qrcode" src={'/qrcode/' + param.id + '-qrcode.png'} alt="" />
                        <div className="boutons-descripfion">
                            <ButtonInput onClick={() => handleGenerateQrCode(param.id)} value="Générer" />
                            <a className="download-button" href={'/qrcode/' + param.id + '-qrcode.png'} download>
                                <DownloadOutlined className='downloadButton' />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default DetailDevice;

function handleGenerateQrCode(id) {

    fetch("http://212.227.3.231:8085/flashme2signal/demande/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => {
        if (response.status === 200) {

            let img = document.getElementById("img-qrcode");
            img.src = '/qrcode/' + id + '-qrcode.png';

        }
    })
        .catch(err => console.log(err))
}