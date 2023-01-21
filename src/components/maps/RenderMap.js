import React, {useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet.fullscreen/Control.FullScreen';
import 'leaflet.fullscreen/Control.FullScreen.css';

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
            
            <TileLayer
                url={`https://storage.googleapis.com/storage_efb/tiles/${data.name}/{z}/{x}/{y}.png`}
                noWrap={true}
            />
            
            {/* <GetCoordinates /> */}
            <FlyCenter center={data.center} />
            <LayersControl position="topright">
              <LayersControl.Overlay checked name="마커 표시">
                <LayerGroup>
                  <Markers data={data} />
                </LayerGroup>
                
              </LayersControl.Overlay>
            </LayersControl>
            
            
        </MapContainer>
    );
}

export default RenderMap;