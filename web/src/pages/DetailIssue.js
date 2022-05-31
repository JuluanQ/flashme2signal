import React, { useState, useEffect } from 'react';
import LeftMenu from '../components/LeftMenu';
import ButtonInput from '../components/ButtonInput';

// Imports
import { Tag, Select } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// CSS
import '../assets/css/DetailIssue.css';
import "antd/dist/antd.css";

const { Option } = Select;


const DetailIssue = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [data, setData] = useState();
    const [dataIssues, setDataIssues] = useState();
    const [allIssues, setAllIssues] = useState([]);
    const [dataDevice, setDataDevice] = useState();
    const [dateDifference, setDateDifference] = useState(0);

    const severiteColors = (severite) => {
        severite = severite.toLowerCase();
        if (severite === "majeur") {
            return "red"
        } else if (severite === "moyen") {
            return "orange"
        } else if (severite === "mineur") {
            return "green"
        }
    }

    const etatColors = (etat) => {
        etat = etat.toLowerCase();
        if (etat === "annulé") {
            return "red"
        } else if (etat === "en cours") {
            return "orange"
        } else if (etat === "terminé") {
            return "green"
        }
    }

    useEffect(() => {
        //Reset des states
        setData(undefined);
        setDataIssues(undefined);
        setAllIssues([]);
        setDataDevice(undefined);
        setDateDifference(undefined);

        fetch("http://212.227.3.231:8085/flashme2signal/demande/" + params.id)
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
            .catch(err => console.log(err))

    }, [location]);

    useEffect(() => {
        if (data !== undefined && dataIssues === undefined) {
            let json = {
                "id": data.id,
                "etat": data.etat,
                "date": data.dateDemande.split("T")[0],
                "description": data.description,
                "severite": data.severite,
            }
            if (data.idMateriel !== null) {
                fetch("http://212.227.3.231:8085/flashme2signal/materiel/" + data.idMateriel.id)
                    .then(res => res.json())
                    .then(data => {
                        let json = {
                            "id": data.id,
                            "salle": data.salle,
                            "type": data.type,
                        }
                        setDataDevice(json)
                    })
                    .catch(err => console.log(err))
            }
            if (data.etat != null) {
                json.etat = data.etat.libelle;
            }

            let now = new Date();
            let date = new Date(data.dateDemande);
            let diff = dateDiff(date, now);
            setDateDifference(diff.day);

            setDataIssues(json);
        }
    }, [data]);

    useEffect(() => {
        if (dataDevice !== undefined && allIssues.length === 0) {
            fetch("http://212.227.3.231:8085/flashme2signal/demandes/")
                .then(res => res.json())
                .then(data => {
                    data.forEach(issue => {
                        if (issue.idMateriel !== null) {
                            if (issue.idMateriel.id === dataDevice.id) {
                                allIssues.push(issue);
                            }
                        }
                    });
                    console.log(allIssues)
                })
                .catch(err => console.log(err))
        }
    }, [dataDevice]);

    return (
        <>
            <LeftMenu />
            <div className='ContentIssue'>
                <p className='IssueTitle'>Demande <span id='IdIssue'>#{params.id}</span></p>
                <div className="tag">
                    {dataIssues !== undefined ?
                        <>
                            <Tag className={severiteColors(dataIssues.severite)}>{dataIssues.severite}</Tag>
                            <Tag className={etatColors(dataIssues.etat)}>{dataIssues.etat}</Tag>
                        </>
                        : <></>
                    }

                </div>

                <div className='DetailContentIssue'>
                    <div className='DescriptionIssue'>
                        <p className='DescriptionText'>Description :</p>
                        <p id="iptDesc">{dataIssues !== undefined ? dataIssues.description : "..."}</p>
                        <p >Cette demande a été créée il y'a <span id="nCreation">{dateDifference} jours</span></p>
                        <p className='DescriptionText'>Sévérité :</p>
                        <Select className='SelectSeverity' size="small" placeholder={dataIssues ? dataIssues.severite : "..."}>
                            <Option value="Majeur">Majeur</Option>
                            <Option value="Moyen">Moyen</Option>
                            <Option value="Mineur">Mineur</Option>
                        </Select>
                        <div className='boutons-descripfion'>
                            <ButtonInput value="Sauvegarder"></ButtonInput>
                        </div>
                    </div>
                    <div className='ComputerIssue'>
                        <p className='ComputerTitle'>Appareil <span id='IdIssue'>#{dataDevice ? dataDevice.id : "?"}</span></p>
                        <div className="Contain">
                            <div className="TxtInput">
                                <div className="deviceInfos">
                                    <p>Salle :</p>
                                    {dataDevice !== undefined ? <p className="deviceInfo">{dataDevice.salle}</p> : <p className="deviceInfo">...</p>}
                                </div>
                                <div className="deviceInfos">
                                    <p>Type :</p>
                                    {dataDevice !== undefined ? <p className="deviceInfo">{dataDevice.type}</p> : <p className="deviceInfo">...</p>}
                                </div>
                                <div className='deviceInfos'>
                                    <p>Autres Problemes en cours :</p>
                                    {allIssues.length > 0 ?
                                        <div className="deviceInfo">
                                            {allIssues.map(issue => (
                                                <Tag className={severiteColors(issue.severite)}
                                                    onClick={() => navigate("/DetailIssue/" + issue.id)}>{issue.id}</Tag>
                                            ))}
                                        </div>
                                        : <p className="deviceInfo">...</p>
                                    }
                                </div>
                            </div>
                            {
                                dataDevice !== undefined ?
                                    <div className='boutons-descripfion' onClick={() => navigate('/DetailDevice/' + dataDevice.id)}>
                                        <ButtonInput value="Voir plus" className="BtnVoirPlus" ></ButtonInput>
                                    </div> : <></>
                            }

                        </div>
                    </div>
                </div>
                <div className='Btn-etat'>
                    <ButtonInput value="Terminé"></ButtonInput>
                    <ButtonInput value="Annuler" color="Red"></ButtonInput>
                </div>
            </div>
        </>
    );
};

export default DetailIssue;

function dateDiff(date1, date2) {
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;

    tmp = Math.floor(tmp / 1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes

    tmp = Math.floor((tmp - diff.sec) / 60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes

    tmp = Math.floor((tmp - diff.min) / 60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures

    tmp = Math.floor((tmp - diff.hour) / 24);   // Nombre de jours restants
    diff.day = tmp;

    return diff;
}