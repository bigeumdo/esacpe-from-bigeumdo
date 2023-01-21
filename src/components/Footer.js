import React from 'react';
import styles from '../styles/Home.module.css'
import packageJson from '../../package.json';

const Footer = () => {
    const github = `https://github.com/${packageJson.publisher}/escape-from-bigeumdo/tree/${packageJson.version}`

    return (
        <div className={styles.footer}>
            <div style={{display:"block"}}>
                Game content and materials are trademarks and copyrights of Battlestate Games and its licensors. All rights reserved.
                © 2023 Esacpe From Bigeumdo <br />
                version: <a href={github} target="_blank" >{packageJson.version}</a>
            </div>
        </div>
    );
};

export default Footer;