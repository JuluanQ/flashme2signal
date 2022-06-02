import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { notification } from 'antd';

// Components
import FormCard from '../components/FormCard';

// CSS
import '../assets/css/FormDemande.css'

const FormDemande = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const id = searchParams.get("id");

    const navigate = useNavigate();

    return (
        <>
            <div className='FormContainer'>
                <div className='LogoUnivNantes-min'>
                    <img src={require("../assets/icons/Logo_Blanc.png")} alt='Logo Université Nantes' className='LogoUnivNanteMenu' />
                </div>
                <FormCard />
            </div>
            <button className='boutonEnvoyer' onClick={handleSubmit}>Envoyer</button>
        </>
    );


    function handleSubmit() {
        let etat ={
            id : 1,
            libelle: "En cours"
        }
        
        fetch("http://212.227.3.231:8085/flashme2signal/materiel/" + id)
            .then(res => res.json())
            .then(dataMat => {

                let materiel = {
                    id: dataMat.id,
                    salle: dataMat.salle,
                    type: dataMat.type
                }

                const data = {
                    dateDemande: new Date().toISOString(),
                    demandeur: document.getElementById('Identifiant').value,
                    description: document.getElementById('description').value,
                    severite: document.getElementById('Sévérité').parentElement.parentElement.textContent,
                    type: document.getElementById('Type').parentElement.parentElement.textContent,
                    etat: etat,
                    idMateriel: materiel
                };
                console.log(data);
        
                fetch("http://212.227.3.231:8085/flashme2signal/demande", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data),
                }).then(res => {
                    if (res.status === 200) {
                        //recharger le page
                        navigate('/form?id=' + id);
                        //Vider les input
                        document.getElementById('Identifiant').value = '';
                        document.getElementById('description').value = '';
                        document.body.getElementsByClassName('ant-select-selection-item')[0].textContent = '';
                        document.body.getElementsByClassName('ant-select-selection-item')[1].textContent = '';
                        //Notification de succès
                        notification["success"]({
                            style: {
                                backgroundColor: '#2F2E31',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '10px',
                            },
                            placement: "top",
                            message: (<></>),
                            description: "Demande enregistrées",
                            closeIcon: (<></>),
                            maxCount: 1,
                        });
                    }
                })
            })
            .catch(err => {
                console.log(err);
            });
            
        
        

    }

};

export default FormDemande;