import React, { useState } from 'react';
import { push as Menu }  from 'react-burger-menu'
import styles from './styles/Home.module.css'
import MapsRoutes from './components/MapsRoutes';
import Maps from './components/Maps'
import Header from './components/Header';
import Footer from './components/Footer'


function Home() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div id='outer-container' className={styles.outer_container}>
            <Menu left noOverlay width={350} disableOverlayClick isOpen={isOpen} pageWrapId={ "page-wrap" } outerContainerId={'outer-container'} >
                <Header />
                <Maps />
                <Footer />
            </Menu>
            <main id="page-wrap" className={styles.page_wrap}>
                <MapsRoutes />
            </main>
        </div>
    )
};

export default Home;
