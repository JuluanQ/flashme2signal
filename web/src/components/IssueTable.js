import React, { useState } from 'react';
import { Table, Tag } from 'antd';


import '../assets/css/Home/IssueTable.css'
import "antd/dist/antd.css";
import { Navigate, useNavigate } from 'react-router-dom';
import ButtonInput from "./ButtonInput";

const IssueTable = (props) => {

    const DemandeFilters = {
        open: "EN COURS",
        urgent: "MAJEUR",
        new: new Date().toISOString().split('T')[0],
        none: ""
    };

    function filterData(filter) {
        var trs = document.querySelectorAll('tbody tr');
        for (var i = 1; i < trs.length; i++) {
            var td = null
            if (filter === DemandeFilters.open) {
                td = trs[i].getElementsByTagName("td")[7];
            } else if (filter === DemandeFilters.urgent) {
                td = trs[i].getElementsByTagName("td")[6];
            } else if (filter === DemandeFilters.new) {
                td = trs[i].getElementsByTagName("td")[2];
            }
            else if (filter === DemandeFilters.none) {
                trs[i].style.display = "";
                document.body.getElementsByClassName('buttonReset')[0].style.display = "none";
            }

            if (td && filter !== DemandeFilters.none) {
                var txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    trs[i].style.display = "";
                } else {
                    trs[i].style.display = "none";
                }
                document.body.getElementsByClassName('buttonReset')[0].style.display = "";
            }
        }
    }


    const navigate = useNavigate()

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '8%',
            sorter: (a, b) => a.id - b.id,
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
            sorter: (a, b) => new Date(b.dateDemande) - new Date(a.dateDemande),
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
            width: '25%',
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
                    text: 'Majeur',
                    value: 'Majeur',
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
            width: '12%',
            render: (_, { severite }) => {
                severite = severite.toLowerCase()
                if (severite === "moyen") {
                    return (
                        <Tag className="orange" key={severite}>
                            {severite.toUpperCase()}
                        </Tag>
                    )
                }
                if (severite === "majeur") {
                    return (
                        <Tag className="red" key={severite}>
                            {severite.toUpperCase()}
                        </Tag>
                    )
                }
                if (severite === "mineur") {
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
                    value: 'En cours',
                },
                {
                    text: 'Annulé',
                    value: 'Annulé',
                }
            ],
            onFilter: (value, record) => record.statut.indexOf(value) === 0,
            width: '12%',
            render: (_, { statut }) => {
                statut = statut.toLowerCase()
                if (statut === "en cours") {
                    return (
                        <Tag className="orange" key={statut}>
                            {statut.toUpperCase()}
                        </Tag>
                    )
                }
                if (statut === "annulé") {
                    return (
                        <Tag className="red" key={statut}>
                            {statut.toUpperCase()}
                        </Tag>
                    )
                }
                if (statut === "terminé") {
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
            <div className="buttonReset" onClick={() => filterData(DemandeFilters.none)} style={{ display: "none" }}>
                <ButtonInput value="Reset" />
            </div>
            <div className='tableContainer'>
                <div className='tableName'>
                    <h3>Liste des demandes :</h3>
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