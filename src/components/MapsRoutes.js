import React from "react";
import { Routes, Route } from 'react-router-dom';
import mapsData from './maps/Maps.info.json';
import RenderMap from "./maps/RenderMap";

const MapsRoutes = () => {
    return  (
        <Routes>
            <Route exact path='/'>
                <Route path='' element={<div>메인페이지 공사중</div>} />
                <Route path={mapsData.CUSTOMS.name} element={<RenderMap uname={mapsData.CUSTOMS.uname} />} />
                <Route path={mapsData.SHORELINE.name} element={<RenderMap uname={mapsData.SHORELINE.uname} />} />
                <Route path={mapsData.WOODS.name} element={<RenderMap uname={mapsData.WOODS.uname} />} />
                <Route path={mapsData.FACTORY.name} element={<RenderMap uname={mapsData.FACTORY.uname} />} />
                <Route path={mapsData.INTERCHANGE.name} element={<RenderMap uname={mapsData.INTERCHANGE.uname} />} />
                <Route path={mapsData.RESERVE.name} element={<RenderMap uname={mapsData.RESERVE.uname} />} />
                <Route path={mapsData.THELAB.name} element={<RenderMap uname={mapsData.THELAB.uname} />} />
                <Route path={mapsData.LIGHTHOUSE.name} element={<RenderMap uname={mapsData.LIGHTHOUSE.uname} />} />
                <Route path={mapsData.STREETS.name} element={<RenderMap uname={mapsData.STREETS.uname} />} />
            </Route>
            <Route paht='*' element={<div>404 Not Found</div>} />
        </Routes>

)};

export default MapsRoutes;