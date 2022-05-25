import React from 'react';

// CSS
import '../assets/css/Home/Home.css'

// Components
import StatsCard from '../components/StatsCard';
import LeftMenu from '../components/LeftMenu';

const Home = () => {
    return (
        <>
            <LeftMenu />
            <div className='Home'>
                <StatsCard />
            </div>
        </>
    );
};

export default Home;