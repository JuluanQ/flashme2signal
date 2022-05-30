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
                    severity: issue.severity,
                }
                if (issue.etat != null) {
                    json.statut = issue.etat.libelle;
                }
                dataIssues.push(json);
            });
            setFinished(true)
            console.log(dataIssues);
        }

    }, [data && !finished]);

    return (
        <>
            <LeftMenu />
            <div className='Home'>
                <StatsCard />
                {finished ? <IssueTable data={dataIssues} /> : <></>}
            </div>
        </>
    );
};

export default Home;