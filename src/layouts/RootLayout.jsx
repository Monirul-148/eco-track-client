import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../assets/components/Navbar/Navbar';
import Footer from '../assets/components/Footer';



const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;