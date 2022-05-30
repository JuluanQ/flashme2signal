import { Table } from 'antd';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LeftMenu from '../components/LeftMenu';

import '../assets/css/Appareils/Appareils.css'
import ButtonInput from '../components/ButtonInput';
import InputText from '../components/InputText';



const Appareils = () => {

    const navigate = useNavigate()

    //Get the data from the API
    useEffect(() => {
        //TODO
    }, []);

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
            title: 'Nb demandes',
            dataIndex: 'nbDemande',
            key: 'nbDemande',
            //sort this column
            sorter: (a, b) => a.nbDemande - b.nbDemande,
        },
    ]

    const data = [
        {
            key: '1',
            id: '1',
            salle: 'Salle 1',
            type: 'Ordinateur',
            nbDemande: '10',
        },
        {
            key: '2',
            id: '2',
            salle: 'Salle 2',
            type: 'Ordinateur',
            nbDemande: '10',
        },
        {
            key: '3',
            id: '3',
            salle: 'Salle 3',
            type: 'Ordinateur',
            nbDemande: '12',
        },
        {
            key: '4',
            id: '4',
            salle: 'Salle 4',
            type: 'Ordinateur',
            nbDemande: '9',
        },
    ];

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
            <div className='mainContainer'>
                <div className='tableContainer'>
                    {
                        data ?
                            <Table {...tableParam} columns={columns} dataSource={data}
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