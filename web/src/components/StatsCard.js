import React from 'react';

import '../assets/css/Home/StatsCard.css'

// Icons
import { GoFileDirectory, GoIssueOpened } from 'react-icons/go';
import { RiAlarmWarningFill } from 'react-icons/ri';


const StatsCard = () => {

    return (
        <>
            <div className='StatsComponents'>

                <div className='CardOpenIssue'>
                    <div className='CardText'>
                        <GoFileDirectory className='imgStatsComp' />
                        <p>Dossiers ouverts</p>
                    </div>
                    <p className='nCardOpenIssue'>3</p>
                </div>

                <div className='CardOpenIssue'>
                    <div className='CardText'>
                        <GoIssueOpened className='imgStatsComp' />
                        <p>Nouveaux dossiers</p>
                    </div>
                    <p className='nCardNewIssue'>3</p>
                </div>

                <div className='CardImportantIssue'>
                    <div className='CardText'>
                        <RiAlarmWarningFill className='imgImportantComp' />
                        <p>Dossiers urgent</p>
                    </div>
                    <p className='nCardImportantIssue'>3</p>
                </div>

            </div>
        </>
    );

};

export default StatsCard;