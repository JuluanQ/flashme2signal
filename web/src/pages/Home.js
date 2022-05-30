import React from 'react';

// CSS
import '../assets/css/Home/Home.css'

// Components
import LeftMenu from '../components/LeftMenu';
import IssueTable from '../components/IssueTable';

const Home = () => {
    return (
        <>
            <LeftMenu />
            <div className='Home'>
                <IssueTable />
            </div>
        </>
    );
};

export default Home;