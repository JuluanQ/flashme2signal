import React from 'react';

import '../assets/css/Home/StatsCard.css'

// Icons
import { GoFileDirectory, GoIssueOpened } from 'react-icons/go';
import { RiAlarmWarningFill } from 'react-icons/ri';


const StatsCard = () => {

    return(
        <>
            <div className='StatsComponents'>

                <div className='CardOpenIssue'>
                    <GoFileDirectory className='imgStatsComp'/>
                    <div className='CardText'>
                        <p>Dossiers ouverts</p>
                        <p className='nCardOpenIssue'>3</p> 
                    </div>
                </div>

                <div className='CardOpenIssue'>
                    <GoIssueOpened className='imgStatsComp'/>
                    <div className='CardText'>
                        <p>Nouveaux dossiers</p>
                        <p className='nCardNewIssue'>3</p>
                    </div>
                </div>

                <div className='CardImportantIssue'>
                    <RiAlarmWarningFill className='imgImportantComp'/>  
                    <div className='CardText'>
                        <p>Dossiers urgent</p>
                        <p className='nCardNewIssue'>3</p>
                    </div>
                </div>

            </div>
        </>
    );

};

export default StatsCard;