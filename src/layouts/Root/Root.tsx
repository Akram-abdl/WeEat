import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function Root() {
  return (
    <>
      <Header />

      <main style={{ padding: '1em' }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Root;
