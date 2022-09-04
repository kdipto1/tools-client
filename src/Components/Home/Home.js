import React from 'react';
import Banner from './Banner';
import HomeTools from './HomeTools';
import Summary from './Summary';

const Home = () => {
  return (
    <main className=''>
      <Banner />
      <HomeTools />
      <Summary/>
    </main>
  );
};

export default Home;