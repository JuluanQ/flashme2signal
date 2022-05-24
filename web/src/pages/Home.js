import React from 'react';

// CSS
import '../assets/css/Home/Home.css'

// Components
import StatsCard from '../components/StatsCard';
import IssueTable from '../components/IssueTable';

const Home = () => {
    return (
        <>
            <div className='Home'>
                <StatsCard />
                <IssueTable />
            </div>
        </>
    );
};

export default Home;