import React from 'react';

import '../assets/css/Home/StatsCard.css'

// Icons
import { GoFileDirectory, GoIssueOpened } from 'react-icons/go';
import { RiAlarmWarningFill } from 'react-icons/ri';


const StatsCard = (props) => {

    return (
        <>
            <div className='StatsComponents'>

                <div className='CardOpenIssue hvr-grow'>
                    <div className='CardSVG'>
                        <GoFileDirectory className='imgStatsComp' />
                    </div>
                    <div className='CardText'>
                        <p className='cardName'>Dossiers ouverts</p>
                        <p className='nCardOpenIssue cardValue'>{props.open}</p>
                    </div>
                </div>

                <div className='CardOpenIssue hvr-grow'>
                    <div className='CardSVG'>
                        <GoIssueOpened className='imgStatsComp' />
                    </div>
                    <div className='CardText'>
                        <p className='cardName'>Nouveaux dossiers</p>
                        <p className='nCardNewIssue cardValue'>{props.new}</p>
                    </div>
                </div>

                <div className='CardImportantIssue hvr-grow'>
                    <div className='CardSVG'>
                        <RiAlarmWarningFill className='imgImportantComp' />
                    </div>
                    <div className='CardText'>
                        <p className='cardName'>Dossiers urgents</p>
                        <p className='nCardImportantIssue cardValue'>{props.urgent}</p>
                    </div>
                </div>

            </div>
        </>
    );

};

export default StatsCard;