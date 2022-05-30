import { Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ButtonInput from '../components/ButtonInput';
import IssueTable from '../components/IssueTable';
import LeftMenu from '../components/LeftMenu';

import '../assets/css/DetailDevice.css'

const DetailDevice = () => {

    const param = useParams()

    //Récupération des données
    useEffect(() => {
        //TODO
    }, []);

    return (
        <>
            <LeftMenu />
            <div className='ContentIssue'>
                <p className="IssueTitle">Appareil #{param.id}</p>

                    <div className="bottomNameContainer">
                        <Tag color="green">{0} problèmes</Tag>
                    </div>

                <div className='DetailContentIssue'>
                    <div className='DescriptionIssue'>
                        <p className="DescriptionText">Salle : </p>
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
                    <IssueTable />
                </div>
            </div>
        </>
    );
};

export default DetailDevice;