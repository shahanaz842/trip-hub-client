import React from 'react';
import Banner from './Banner/Banner';
import LatestTickets from '../../Components/LatestTickets/LatestTickets';
import Report from '../../Components/Home/Report';
import Partners from '../../Components/Home/Partners';
import Advertisement from '../../Components/Home/Advertisement';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <LatestTickets></LatestTickets>
            <Partners/>
            <Report/>
        </div>
    );
};          

export default Home;