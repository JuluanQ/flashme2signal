import React, { useState, useEffect } from 'react';

// CSS
import '../assets/css/Home/Home.css'

// Components
import StatsCard from '../components/StatsCard';
import LeftMenu from '../components/LeftMenu';
import IssueTable from '../components/IssueTable';

const Home = () => {

    const [data, setData] = useState();
    const [dataIssues, setDataIssues] = useState([]);
    const [finished, setFinished] = useState(false);

    const [nbOpenIssues, setNbOpenIssues] = useState(0);
    const [nbNewIssues, setNbNewIssues] = useState(0);
    const [nbUrgentIssues, setNbUrgentIssues] = useState(0);


    useEffect(() => {
        fetch("http://212.227.3.231:8085/flashme2signal/demandes")
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if (data !== undefined && dataIssues.length === 0) {
            data.forEach(issue => {
                //build a json from the data
                let json = {
                    id: issue.id,
                    appareil: issue.idMateriel.id,
                    dateDemande: issue.dateDemande.split('T')[0],
                    demandeur: issue.demandeur,
                    description: issue.description,
                    type: issue.type,
                    severite: issue.severite,
                }
                if (issue.description.length > 50) {
                    json.description = issue.description.substring(0, 50) + "..."
                }
                let now = new Date();
                if (json.dateDemande === now.toISOString().split('T')[0]) {
                    setNbNewIssues(nbNewIssues => nbNewIssues + 1);
                }
                if (issue.severity === "Urgent") {
                    setNbUrgentIssues(nbUrgentIssues => nbUrgentIssues + 1)
                }
                if (issue.etat != null) {
                    json.statut = issue.etat.libelle;
                    if (issue.etat.libelle === "En cours") {
                        setNbOpenIssues(nbOpenIssues => nbOpenIssues + 1);
                    }
                }
                dataIssues.push(json);
            });
            setFinished(true);
        }

    }, [data && !finished]);

    return (
        <>
            <LeftMenu />
            <div className='Home'>
                <StatsCard open={nbOpenIssues} new={nbNewIssues} urgent={nbUrgentIssues} />
                {finished ? <IssueTable data={dataIssues} /> : <></>}
            </div>
        </>
    );
};

export default Home;