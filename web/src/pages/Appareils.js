import { Table } from 'antd';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LeftMenu from '../components/LeftMenu';

import '../assets/css/Appareils/Appareils.css'
import ButtonInput from '../components/ButtonInput';
import InputText from '../components/InputText';



const Appareils = () => {

    const navigate = useNavigate()
    const [data, setData] = useState();
    const [dataDevices, setDataDevices] = useState([]);
    const [dataDemandes, setDataDemandes] = useState([]);
    const [finished, setFinished] = useState(false);

    //Get the data from the API
    useEffect(() => {
        fetch("http://212.227.3.231:8085/flashme2signal/materiels")
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
            .catch(err => console.log(err))
        fetch("http://212.227.3.231:8085/flashme2signal/demandes/")
            .then(res => res.json())
            .then(data => {
                data.forEach(issue => {
                    if (issue.idMateriel !== null) {
                        dataDemandes.push(issue)
                    }
                });
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if (data !== undefined && dataDemandes !== undefined && dataDevices.length === 0) {

            data.forEach(device => {
                let json = {
                    id: device.id,
                    salle: device.salle,
                    type: device.type,
                }
                let nbD = 0;
                json.nbDemande = nbD;
                dataDemandes.forEach(issue => {
                    if (issue.idMateriel.id === device.id) {
                        if (issue.etat.libelle === "En cours") {
                            json.nbDemande = nbD;
                        }
                    }
                    nbD++;
                });
                dataDevices.push(json);
            });
            setFinished(true)
        }
    }, [data && dataDemandes && !finished]);

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
        bordered: false,
        loading: false,
        sticky: true,
    }

    return (
        <>
            <LeftMenu />
            <div className='mainAppareilContainer'>
                <div className='tableAppareilContainer'>
                    {
                        finished ?
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
                    <form action="">
                        <InputText title="Numero de Salle" />
                        <InputText title="Type d'appareil" />
                        <ButtonInput value="Ajouter" />
                    </form>

                </div>

            </div>
        </>
    );
};

export default Appareils;