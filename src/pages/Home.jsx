import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ViewUser from './ViewUser';

const Home = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100vh', marginLeft: '250px' }}>
        <ViewUser />
      </div>
    </>
  );
};

export default Home;
