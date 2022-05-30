import { Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import React from 'react';
import { useParams } from 'react-router-dom';

import ButtonInput from '../components/ButtonInput';
import IssueTable from '../components/IssueTable';
import LeftMenu from '../components/LeftMenu';

import '../assets/css/DetailDevice.css'

const DetailDevice = () => {

    const param = useParams()

    return (
        <>
            <LeftMenu />
            <div className='mainContainer'>
                <div className='nameContainer'>
                    <div className="topNameContainer">
                        <h3>Appareil n°{param.id}</h3>
                    </div>
                    <div className="bottomNameContainer">
                        <Tag color="green">{0} problèmes</Tag>
                    </div>
                </div>
                <div className='bodyContainer'>
                    <div className='leftBodyContainer'>
                        <h4>Salle : </h4>
                    </div>
                    <div className='rightBodyContainer'>
                        <div className="qrCodeContainer">
                            <img src="" alt="" width="10em" height="10em" />
                        </div>
                        <div className="buttonsContainer">
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