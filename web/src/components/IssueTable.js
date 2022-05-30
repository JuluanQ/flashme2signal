import React from 'react';
import { Table, Tag } from 'antd';


import '../assets/css/Home/IssueTable.css'
import "antd/dist/antd.css";
import { Navigate, useNavigate } from 'react-router-dom';

const IssueTable = () => {

    const navigate = useNavigate()

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',

        },
        {
            title: 'Appareil',
            dataIndex: 'appareil',
            key: 'appareil',

            responsive: ['sm'],
            width: '10%',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            responsive: ['sm'],
            width: '10%',
        },
        {
            title: 'Demandeur',
            dataIndex: 'demandeur',
            key: 'demandeur',
            responsive: ['sm'],
            width: '10%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '30%',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            responsive: ['sm'],
            width: '10%',
        },
        {
            title: 'Sévérité',
            dataIndex: 'severite',
            key: 'severite',
            responsive: ['sm'],
            width: '10%',
            render: (_, { severite }) => {
                if (severite === "Moyen") {
                    return (
                        <Tag className="orange" key={severite}>
                            {severite.toUpperCase()}
                        </Tag>
                    )
                }
                if (severite === "Urgent") {
                    return (
                        <Tag className="red" key={severite}>
                            {severite.toUpperCase()}
                        </Tag>
                    )
                }
                if (severite === "Mineur") {
                    return (
                        <Tag className="green" key={severite}>
                            {severite.toUpperCase()}
                        </Tag>
                    )
                }
            }
        },
        {
            title: 'Statut',
            dataIndex: 'statut',
            key: 'statut',
            width: '10%',
            render: (_, { statut }) => {
                if (statut === "En Cours") {
                    return (
                        <Tag className="orange" key={statut}>
                            {statut.toUpperCase()}
                        </Tag>
                    )
                }
                if (statut === "Annulé") {
                    return (
                        <Tag className="red" key={statut}>
                            {statut.toUpperCase()}
                        </Tag>
                    )
                }
                if (statut === "Terminé") {
                    return (
                        <Tag className="green" key={statut}>
                            {statut.toUpperCase()}
                        </Tag>
                    )
                }
            }
        }
    ];

    const data = [
        {
            id: '123',
            appareil: '#28',
            date: '12/03/2021',
            demandeur: 'E183247G',
            description: 'L’ordinateur ne démarre pas quand...',
            type: '',
            severite: 'Moyen',
            statut: 'En Cours',
        },
        {
            id: '123',
            appareil: '#28',
            date: '12/03/2021',
            demandeur: 'E183247G',
            description: 'L’ordinateur ne démarre pas quand...',
            type: '',
            severite: 'Urgent',
            statut: 'Annulé',
        },
        {
            id: '123',
            appareil: '#28',
            date: '12/03/2021',
            demandeur: 'E183247G',
            description: 'L’ordinateur ne démarre pas quand...',
            type: '',
            severite: 'Mineur',
            statut: 'Terminé',
        },
        {
            id: '123',
            appareil: '#28',
            date: '12/03/2021',
            demandeur: 'E183247G',
            description: 'L’ordinateur ne démarre pas quand...',
            type: '',
            severite: 'Moyen',
            statut: 'En Cours',
        },
        {
            id: '123',
            appareil: '#28',
            date: '12/03/2021',
            demandeur: 'E183247G',
            description: 'L’ordinateur ne démarre pas quand...',
            type: '',
            severite: 'Urgent',
            statut: 'Annulé',
        },
        {
            id: '123',
            appareil: '#28',
            date: '12/03/2021',
            demandeur: 'E183247G',
            description: 'L’ordinateur ne démarre pas quand...',
            type: '',
            severite: 'Mineur',
            statut: 'Terminé',
        },
        {
            id: '123',
            appareil: '#28',
            date: '12/03/2021',
            demandeur: 'E183247G',
            description: 'L’ordinateur ne démarre pas quand...',
            type: '',
            severite: 'Moyen',
            statut: 'En Cours',
        },
        {
            id: '123',
            appareil: '#28',
            date: '12/03/2021',
            demandeur: 'E183247G',
            description: 'L’ordinateur ne démarre pas quand...',
            type: '',
            severite: 'Urgent',
            statut: 'Annulé',
        },
        {
            id: '123',
            appareil: '#28',
            date: '12/03/2021',
            demandeur: 'E183247G',
            description: 'L’ordinateur ne démarre pas quand...',
            type: '',
            severite: 'Mineur',
            statut: 'Terminé',
        },
        {
            id: '123',
            appareil: '#28',
            date: '12/03/2021',
            demandeur: 'E183247G',
            description: 'L’ordinateur ne démarre pas quand...',
            type: '',
            severite: 'Moyen',
            statut: 'En Cours',
        },
        {
            id: '123',
            appareil: '#28',
            date: '12/03/2021',
            demandeur: 'E183247G',
            description: 'L’ordinateur ne démarre pas quand...',
            type: '',
            severite: 'Urgent',
            statut: 'Annulé',
        },
        {
            id: '123',
            appareil: '#28',
            date: '12/03/2021',
            demandeur: 'E183247G',
            description: 'L’ordinateur ne démarre pas quand...',
            type: '',
            severite: 'Mineur',
            statut: 'Terminé',
        },
    ];

    const param = {
        bordered: true,
        loading: false,
        pagination: false,
        size: 'default',
        sticky: true,

    }

    return (
        <div className='IssueTable'>
            <div className='tableContainer'>
                <div className='tableName'>
                    <h3>Liste demandes</h3>
                </div>
                <div className='tableData'>
                    <Table {...param} columns={columns} dataSource={data} className="tableDemandes"
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    navigate("/DetailIssue/" + record.id)
                                },
                            };
                        }}
                        scroll={{
                            y: 240,
                        }}
                    />
                </div>

            </div>

        </div>
    );
};

export default IssueTable;