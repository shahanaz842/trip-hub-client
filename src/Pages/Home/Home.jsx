import React from 'react';
import Banner from '../../Components/Home/Banner/Banner';
import LatestTickets from '../../Components/LatestTickets/LatestTickets';
import Report from '../../Components/Home/Report';
import Partners from '../../Components/Home/Partners';
import Advertisement from '../../Components/Home/Advertisement';
import TrustBar from '../../Components/Home/TrustBar';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className='max-w-11/12 mx-auto'>
                  <Partners/>  
                   <TrustBar></TrustBar>
            <Advertisement></Advertisement>
            <LatestTickets></LatestTickets>
          
            <Report/>
            </div>
         
        </div>
    );
};          

export default Home;