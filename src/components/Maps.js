import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Home.module.css'
import {useWindowDimensions} from '../utils';
import mapsData from './maps/Maps.info.json';
import MapsRoutes from './MapsRoutes';

const isMatchPathname = (pathname, name) =>{
    if(pathname === `/${name}`) return true;
    return false;
}

const Maps = () => {
    const {height} = useWindowDimensions();
    const { pathname } = useLocation();

    return (
    <div className={styles.maps} style={{maxHeight:height - 100}}>
        <div className={styles.maps_header}>
            <div className={styles.maps_title}><h1>지도</h1></div>
            <div className={styles.list}>
                <Link to={'/' + mapsData.CUSTOMS.name} className={isMatchPathname(pathname, mapsData.CUSTOMS.name) && styles.disable_link} >
                    <div  className={isMatchPathname(pathname, mapsData.CUSTOMS.name) ? styles.map_tag_cur : styles.map_tag}>세관</div>
                </Link>
                <Link to={'/' + mapsData.SHORELINE.name} className={isMatchPathname(pathname, mapsData.SHORELINE.name) && styles.disable_link}>
                    <div className={isMatchPathname(pathname, mapsData.SHORELINE.name) ? styles.map_tag_cur : styles.map_tag}>해안선</div>
                </Link>
                <Link to={'/' + mapsData.FACTORY.name} className={isMatchPathname(pathname, mapsData.FACTORY.name) && styles.disable_link}>
                    <div className={isMatchPathname(pathname, mapsData.FACTORY.name) ? styles.map_tag_cur : styles.map_tag}>공장</div>
                </Link>
                <Link to={'/' + mapsData.WOODS.name} className={isMatchPathname(pathname, mapsData.WOODS.name) && styles.disable_link}>
                    <div className={isMatchPathname(pathname, mapsData.WOODS.name) ? styles.map_tag_cur : styles.map_tag}>삼림</div>
                </Link>
                <Link to={'/' + mapsData.INTERCHANGE.name} className={isMatchPathname(pathname, mapsData.INTERCHANGE.name) && styles.disable_link}>
                    <div className={isMatchPathname(pathname, mapsData.INTERCHANGE.name) ? styles.map_tag_cur : styles.map_tag}>교차로</div>
                </Link>
                <Link to={'/' + mapsData.RESERVE.name} className={isMatchPathname(pathname, mapsData.RESERVE.name) && styles.disable_link}>
                    <div className={isMatchPathname(pathname, mapsData.RESERVE.name) ? styles.map_tag_cur : styles.map_tag}>군사기지</div>
                </Link>
                <Link to={'/' + mapsData.THELAB.name} className={isMatchPathname(pathname, mapsData.THELAB.name) && styles.disable_link}>
                    <div className={isMatchPathname(pathname, mapsData.THELAB.name) ? styles.map_tag_cur : styles.map_tag}>연구소</div>
                </Link>
                <Link to={'/' + mapsData.LIGHTHOUSE.name} className={isMatchPathname(pathname, mapsData.LIGHTHOUSE.name) && styles.disable_link}>
                    <div className={isMatchPathname(pathname, mapsData.LIGHTHOUSE.name) ? styles.map_tag_cur : styles.map_tag}>등대</div>
                </Link>
                <Link to={'/' + mapsData.STREETS.name} className={isMatchPathname(pathname, mapsData.STREETS.name) && styles.disable_link}>
                    <div className={isMatchPathname(pathname, mapsData.STREETS.name) ? styles.map_tag_cur : styles.map_tag}>타르코프 시내</div>
                </Link>
            </div>
        </div>

        <div style={{flex:1}}>
            <MapsRoutes />
        </div>
    </div>
)};

export default Maps;