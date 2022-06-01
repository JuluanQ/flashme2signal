import React, { useState, useEffect } from 'react';
import LeftMenu from '../components/LeftMenu';
import ButtonInput from '../components/ButtonInput';

// Imports
import { Tag, Select, notification } from 'antd';
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
    const [allIssues, setAllIssues] = useState();
    const [dataDevice, setDataDevice] = useState();
    const [dateDifference, setDateDifference] = useState(0);

    const [severite, setSeverite] = useState();

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
        setAllIssues(undefined);
        setDataDevice(undefined);
        setDateDifference(undefined);
        setSeverite(undefined);

        fetch("http://212.227.3.231:8085/flashme2signal/demande/" + params.id)
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
            .catch(err => console.log(err))

    }, [location]);

    useEffect(() => {
        if (data !== undefined && dataIssues === undefined) {
            let dateD = new Date(data.dateDemande);
            dateD = dateD.toISOString().split('T')[0]
            let json = {
                "id": data.id,
                "etat": data.etat,
                "date": dateD,
                "description": data.description,
                "severite": data.severite,
            }
            //mettre la première lettre en majuscule
            setSeverite("")
            let str = data.severite.toLowerCase();
            str = str.charAt(0).toUpperCase() + str.slice(1);
            setSeverite(str);

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
            setDataIssues(json);

            if (allIssues === undefined) {
                fetch("http://212.227.3.231:8085/flashme2signal/demandes/")
                    .then(res => res.json())
                    .then(dataIss => {
                        setAllIssues([]);
                        dataIss.forEach(issue => {
                            let dateD = new Date(issue.dateDemande);
                            issue.dateDemande = dateD.toISOString().split('T')[0]
                            if (issue.idMateriel !== null) {
                                //si l'etat de l'issue est en cours
                                let str = issue.etat.libelle.toLowerCase();
                                if (str === "en cours") {
                                    if (issue.idMateriel.id === data.idMateriel.id) {
                                        setAllIssues(allIssues => [...allIssues, issue]);
                                    }
                                }

                            }
                        });
                    })
                    .catch(err => console.log(err))
            }

            let now = new Date();
            let date = new Date(data.dateDemande);
            let diff = dateDiff(date, now);
            setDateDifference(diff.day);
        }
    }, [data]);

    function handleSauvegarder(data, navig) {
        let description = document.getElementById("iptDesc").value;
        let severite = document.getElementsByClassName("SelectSeverity")[0].textContent;
        data.dateDemande = (new Date(data.dateDemande)).toISOString()
        data.description = description;
        data.severite = severite;
        console.log(data);

        fetch("http://212.227.3.231:8085/flashme2signal/demande/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.status == 200) {

                    navigate("/DetailIssue/" + data.id);
                    notification["success"]({
                        style: {
                            backgroundColor: '#2F2E31',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            textAlign: 'left',
                            padding: '10px',
                        },
                        message: (<h3 style={{ color: "#fff", }}>Updated</h3>),
                        description: "Les modifications ont été enregistrées",
                        closeIcon: (<></>),
                        maxCount: 1,
                    });
                }
            })
            .catch(err => console.log(err))

    }

    return (
        <>
            <LeftMenu />
            <div className='ContentIssue'>
                <p className='IssueTitle'>Demande <span id='IdIssue'>#{params.id}</span></p>
                <div className="tag">
                    <div className="tagColor">
                        {dataIssues !== undefined ?
                            <>
                                <Tag className={severiteColors(dataIssues.severite)}>{dataIssues.severite}</Tag>
                                <Tag className={etatColors(dataIssues.etat)}>{dataIssues.etat}</Tag>
                            </>
                            : <></>
                        }
                    </div>
                    <div className='Btn-etat'>
                        <ButtonInput value="Annuler" color="Red"></ButtonInput>
                        <ButtonInput value="Terminé"></ButtonInput>
                    </div>

                </div>

                <div className='DetailContentIssue'>
                    <div className='DescriptionIssue'>
                        <label className='DescriptionText'>Description :</label>
                        {dataIssues ?
                            <textarea id="iptDesc" name="descriptionDemande" defaultValue={dataIssues.description}></textarea>
                            : <></>}

                        <p >Cette demande a été créée il y'a <span id="nCreation">{dateDifference} jours</span></p>
                        <div className="comboboxSeverite">
                            <label className='DescriptionText'>Sévérité :</label>
                            <Select className='SelectSeverity' size="small" value={severite ? severite : "..."} onChange={(value) => setSeverite(value)}>
                                <Option value="Majeur">Majeur</Option>
                                <Option value="Moyen">Moyen</Option>
                                <Option value="Mineur">Mineur</Option>
                            </Select>
                        </div>

                        <div className='boutons-descripfion' onClick={() => handleSauvegarder(data, navigate)}>
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
                                    <p>Autres demandes en cours :</p>
                                    {allIssues ?
                                        <div className="deviceInfo">
                                            {allIssues.map(issue => (
                                                <Tag className={severiteColors(issue.severite) + " hvr-grow"}
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

