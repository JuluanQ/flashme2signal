import React from 'react';

import '../assets/css/Home/StatsCard.css'

//import { NavLink } from 'react-router-dom';

const StatsCard = () => {

    return(
        <>
            <div className='StatsComponents'>

                <div className='CardOpenIssue'>
                    <img src={require("../assets/icons/OpenIssue.png")} alt='Dossiers ouverts' className='imgStatsComp'/>
                    <div className='CardText'>
                        <p>Dossiers ouverts</p>
                        <p className='nCardOpenIssue'>3</p> 
                    </div>
                </div>

                <div className='CardOpenIssue'>
                    <img src={require("../assets/icons/NewIssue.png")} alt='Nouveaux dossiers' className='imgStatsComp'/>
                    <div className='CardText'>
                        <p>Nouveaux dossiers</p>
                        <p className='nCardNewIssue'>3</p>
                    </div>
                </div>

                <div className='CardImportantIssue'>
                    <img src={require("../assets/icons/ImportantIssue.png")} alt='Dossiers urgent' className='imgStatsComp'/>
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