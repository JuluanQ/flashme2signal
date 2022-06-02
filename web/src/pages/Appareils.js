import { Select, Table, notification } from 'antd';

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import LeftMenu from '../components/LeftMenu';

import '../assets/css/Appareils/Appareils.css'
import ButtonInput from '../components/ButtonInput';
import InputText from '../components/InputText';



const Appareils = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState();
    const [dataDevices, setDataDevices] = useState();
    const [dataDemandes, setDataDemandes] = useState();

    //Get the data from the API
    useEffect(() => {
        //reset the states
        setData(undefined);
        setDataDevices(undefined);
        setDataDemandes(undefined);

        fetch("http://212.227.3.231:8085/flashme2signal/materiels")
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
            .catch(err => console.log(err))
        fetch("http://212.227.3.231:8085/flashme2signal/demandes/")
            .then(res => res.json())
            .then(data => {
                setDataDemandes(data)
            })
            .catch(err => console.log(err))
    }, [location]);

    useEffect(() => {
        if (data && dataDemandes && !dataDevices) {
            setDataDevices([])
            data.forEach(device => {
                let json = {
                    id: device.id,
                    salle: device.salle,
                    type: device.type,
                }
                let nbD = 0;
                json.nbDemande = 0;

                dataDemandes.forEach(demande => {
                    if (demande.idMateriel.id === device.id) {
                        if (demande.etat.libelle === "En cours") {
                            nbD++;
                        }
                    }
                });
                json.nbDemande = nbD;
                setDataDevices(dataDevices => [...dataDevices, json]);
            });
        }
    }, [data && dataDemandes]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            //sort this column
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Salle',
            dataIndex: 'salle',
            key: 'salle',
            //sort this column
            sorter: (a, b) => a.salle - b.salle,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            responsive: ['sm'],
        },
        {
            title: 'Nb demandes en cours',
            dataIndex: 'nbDemande',
            key: 'nbDemande',
            //sort this column
            sorter: (a, b) => a.nbDemande - b.nbDemande,
        },
    ]

    const tableParam = {
        columns,
        pagination: false,
        size: 'small',
        scroll: { y: 'calc(100vh - 300px)' },
        bordered: true,
        loading: false,
        sticky: true,
    }

    function handleAddDevice(data) {
        let salle = document.getElementById("Numero de Salle").value;
        let type = document.body.getElementsByClassName("SelectType")[0].textContent;
        fetch("http://212.227.3.231:8085/flashme2signal/materiel",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    salle: salle,
                    type: type,
                })
            })
            .then(response => {
                if (response.status === 200) {

                    navigate("/Appareils/");
                    notification["success"]({
                        style: {
                            backgroundColor: '#2F2E31',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            textAlign: 'left',
                            padding: '10px',
                        },
                        placement: "topRight",
                        message: (<h3 style={{ color: "#fff", }}>Updated</h3>),
                        description: "Les modifications ont été enregistrées",
                        closeIcon: (<></>),
                        maxCount: 1,
                    });
                }
            })
    }

    return (
        <>
            <LeftMenu />
            <div className='mainAppareilContainer'>
                <div className='tableAppareilContainer'>
                    <div className='tableName'>
                        <h3>Liste appareils</h3>
                    </div>
                    <hr />
                    {
                        dataDevices ?
                            <Table {...tableParam} columns={columns} dataSource={dataDevices}
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: event => {
                                            navigate("/DetailDevice/" + record.id)
                                        },
                                    };
                                }
                                }
                            /> : <></>
                    }
                </div>
                <div className='addDeviceContainer'>
                    <div className='addDeviceC'>
                        <InputText title="Numero de Salle" />
                        <Select className='SelectType' defaultValue="Ordinateur" >
                            <Select.Option value="Ordinateur">Ordinateur</Select.Option>
                            <Select.Option value="Tablette">Tablette</Select.Option>
                            <Select.Option value="Projecteur">Projecteur</Select.Option>
                        </Select>

                        <div class="addDeviceBtn" onClick={() => handleAddDevice(data)}>
                            <ButtonInput value="Ajouter" />
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default Appareils;

