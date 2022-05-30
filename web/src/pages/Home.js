import React from 'react';

// CSS
import '../assets/css/Home/Home.css'

// Components
import StatsCard from '../components/StatsCard';
import LeftMenu from '../components/LeftMenu';
import IssueTable from '../components/IssueTable';

import { useEffect } from 'react';

const Home = () => {

    //Récupérartion des données
    useEffect(() => {
        //TODO
    }, []);

    return (
        <>
            <LeftMenu />
            <div className='Home'>
                <StatsCard />
                <IssueTable />
            </div>
        </>
    );
};

export default Home;