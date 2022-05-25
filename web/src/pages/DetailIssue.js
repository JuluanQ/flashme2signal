import React from 'react';
import LeftMenu from '../components/LeftMenu';

// CSS
import '../assets/css/DetailIssue.css';


const DetailIssue = () => {
    return(
        <>
            <LeftMenu />
            <div className='ContentIssue'>
                <p className='IssueTitle'>Demande <span id='IdIssue'>#1234</span></p>
                <div>
                    <span className='IssueSeverityCard'><span id="IssueSeverity">Urgent</span></span>
                    <span className='IssueStateCard'><span id="IssueState">En cours</span></span>
                </div>
                <div className='DetailContentIssue'>
                    <div className='DescriptionIssue'>
                        <p className='DescriptionText'>Description :</p>
                        <input type="text" id="iptDesc"></input>
                        <p>Cette demande a été créée il y'a <span id="nCreation">2 jours</span></p>
                        <p className='DescriptionText'>Sévérité :</p>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailIssue;