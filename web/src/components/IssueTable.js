import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';


import '../assets/css/Home/IssueTable.css'
import "antd/dist/antd.css";
import { Navigate, useNavigate } from 'react-router-dom';

const IssueTable = (props) => {

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
            dataIndex: 'dateDemande',
            key: 'dateDemande',
            responsive: ['sm'],
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
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
            filters: [
                {
                    text: 'Urgent',
                    value: 'Urgent',
                },
                {
                    text: 'Moyen',
                    value: 'Moyen',
                },
                {
                    text: 'Mineur',
                    value: 'Mineur',
                }
            ],
            onFilter: (value, record) => record.severite.indexOf(value) === 0,
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
            filters: [
                {
                    text: 'Terminé',
                    value: 'Terminé',
                },
                {
                    text: 'En cours',
                    value: 'En Cours',
                },
                {
                    text: 'Annulé',
                    value: 'Annulé',
                }
            ],
            onFilter: (value, record) => record.statut.indexOf(value) === 0,
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
                    <Table {...param} columns={columns} dataSource={props.data} className="tableDemandes"
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