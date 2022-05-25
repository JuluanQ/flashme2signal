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
                    <div className='CardSVG'>
                        <GoFileDirectory className='imgStatsComp' />
                    </div>
                    <div className='CardText'>
                        <p className='cardName'>Dossiers ouverts</p>
                        <p className='nCardOpenIssue cardValue'>3</p>
                    </div>
                </div>

                <div className='CardOpenIssue'>
                    <div className='CardSVG'>
                        <GoIssueOpened className='imgStatsComp' />
                    </div>
                    <div className='CardText'>
                        <p className='cardName'>Nouveaux dossiers</p>
                        <p className='nCardNewIssue cardValue'>3</p>
                    </div>
                </div>

                <div className='CardImportantIssue'>
                    <div className='CardSVG'>
                        <RiAlarmWarningFill className='imgImportantComp' />
                    </div>
                    <div className='CardText'>
                        <p className='cardName'>Dossiers urgents</p>
                        <p className='nCardImportantIssue cardValue'>3</p>
                    </div>
                </div>

            </div>
        </>
    );

};

export default StatsCard;