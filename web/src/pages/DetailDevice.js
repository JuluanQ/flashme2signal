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
                            if (issue.idMateriel.id == param.id) {
                                setIssues(issues => [...issues, issue])
                                if (issue.etat !== "Terminé") {
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

    return (
        <>
            <LeftMenu />
            <div className='ContentIssue'>
                <p className="IssueTitle">Appareil #{param.id}</p>

                <div className="bottomNameContainer">
                    <Tag color="green">{nbIssues} problèmes</Tag>
                </div>

                <div className='DetailContentIssue'>
                    <div className='DescriptionIssue'>
                        <p className="DescriptionText">Salle :{device !== undefined ? device.salle : "..."}</p>
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
                <div className="issuesContainer">
                    {issues ? <IssueTable data={issues} /> : <></>}
                </div>
            </div>
        </>
    );
};

export default DetailDevice;