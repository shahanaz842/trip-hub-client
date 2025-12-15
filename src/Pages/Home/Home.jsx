import React from 'react';
import Banner from './Banner/Banner';
import LatestTickets from '../../Components/LatestTickets/LatestTickets';
import Report from '../../Components/Home/Report';
import Partners from '../../Components/Home/Partners';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestTickets></LatestTickets>
            <Partners/>
            <Report/>
        </div>
    );
};          

export default Home;