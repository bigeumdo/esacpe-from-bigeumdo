import React, {useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet.fullscreen/Control.FullScreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import { BiTimeFive } from 'react-icons/bi';
import { MdPeopleAlt } from 'react-icons/md';

let DefaultIcon = L.icon({
    iconUrl: icon,
    iconSize: [24,36],
    iconAnchor: [12,36]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Markers = ({data}) => {
    return data.markers.map(({lat, lng, desc}, index) => (
        <Marker
            key={index}
            position={[lat, lng]}
        >
                <Popup>{desc}</Popup>
        </Marker>
    ));
}


const GetCoordinates = () => {
    const map = useMap();
  
    useEffect(() => {
      if (!map) return;
      const info = L.DomUtil.create('div', 'legend');
  
      const positon = L.Control.extend({
        options: {
          position: 'bottomleft'
        },
  
        onAdd: function () {
          info.textContent = 'Click on map';
          return info;
        }
      })
  
      map.on('click', (e) => {
        info.textContent = e.latlng;
      })
  
      map.addControl(new positon());
  
    }, [map])
  
  
    return null
  
  }

  const FlyCenter = ({center}) => {
    const map = useMap();

    if(map) map.flyTo(center);

    return null
  }

const RenderMap = ({uname}) => {
    const data = require(`./${uname}.map.json`);

    return (
        <MapContainer
            fullscreenControl={true} 
            center={data.center}
            bounds={[100, 100]}
            style={{ height: "100%" }} 
            zoom={0} 
            minZoom={data.minZoom} 
            maxZoom={data.maxZoom} >
            
            {/* <GetCoordinates /> */}
            <FlyCenter center={data.center} />
            <LayersControl position="topleft">
              <LayersControl.BaseLayer checked name="기본">
                <TileLayer
                    url={`https://storage.googleapis.com/storage_efb/tiles/${data.types.normal}/{z}/{x}/{y}.png`}
                    noWrap={true}
                />
              </LayersControl.BaseLayer>
              { data.markers.length > 0 &&
                <LayersControl.Overlay checked name="마커 표시">
                  <LayerGroup>
                  <Markers data={data} />
                </LayerGroup>
              </LayersControl.Overlay>
            }
            </LayersControl>
            
            <div 
              style={{
                position:'fixed', 
                bottom:0,
                fontFamily: 'MyFont',
                display: 'flex',
                fontSize: '1.2rem',
                textAlign:'center',
                zIndex: 1000,
                backgroundColor: '#0e0e0e',
                height: '30px'
                }}>
                <div style={{margin:'0px 7px', display: 'flex', alignItems:'center'}} >
                  <BiTimeFive style={{marginRight: '3px'}} size='30px' />
                    {data.duration}
                </div>
                <div style={{margin:'0px 7px', display: 'flex', alignItems:'center'}} >
                  <MdPeopleAlt style={{marginRight: '3px'}} size='30px' />
                  {data.players}
                </div>
                
            </div>
        </MapContainer>
    );
}

export default RenderMap;