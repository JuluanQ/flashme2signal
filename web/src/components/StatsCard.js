import React from 'react';

import '../assets/css/Home/StatsCard.css'

// Icons
import { GoFileDirectory, GoIssueOpened } from 'react-icons/go';
import { RiAlarmWarningFill } from 'react-icons/ri';


const StatsCard = (props) => {

    const DemandeFilters = {
        open: "EN COURS",
        urgent: "URGENT",
        new: new Date().toISOString().split('T')[0]
    };

    function filterData(filter) {
        var trs = document.querySelectorAll('tbody tr');
        for (var i = 1; i < trs.length; i++)
        {
            var td = null
            if (filter === DemandeFilters.open) {
                td = trs[i].getElementsByTagName("td")[7];
            } else if (filter === DemandeFilters.urgent) {
                td = trs[i].getElementsByTagName("td")[6];
            } else if (filter === DemandeFilters.new) {
                td = trs[i].getElementsByTagName("td")[2];
                console.log("test")
            }

            if (td)
            {
                var txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1)
                {
                    trs[i].style.display = "";
                } else {
                    trs[i].style.display = "none";
                }
            }
        }
    }

    return (
        <>
            <div className='StatsComponents'>

                <div className='CardOpenIssue hvr-grow' onClick={() => filterData(DemandeFilters.open)}>
                    <div className='CardSVG'>
                        <GoFileDirectory className='imgStatsComp' />
                    </div>
                    <div className='CardText'>
                        <p className='cardName'>Dossiers ouverts</p>
                        <p className='nCardOpenIssue cardValue'>{props.open}</p>
                    </div>
                </div>

                <div className='CardOpenIssue hvr-grow' onClick={() => filterData(DemandeFilters.new)}>
                    <div className='CardSVG'>
                        <GoIssueOpened className='imgStatsComp' />
                    </div>
                    <div className='CardText'>
                        <p className='cardName'>Nouveaux dossiers</p>
                        <p className='nCardNewIssue cardValue'>{props.new}</p>
                    </div>
                </div>

                <div className='CardImportantIssue hvr-grow' onClick={() => filterData(DemandeFilters.urgent)}>
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