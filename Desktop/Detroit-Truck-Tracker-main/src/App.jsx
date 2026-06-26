import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl, LayerGroup, Popup, Marker } from 'react-leaflet';

export default function App() {

  const [geoData, setGeoData] = useState(null);
  const mapRef = useRef();
  const position = [42.344863, -83.056870]; 

  useEffect(() => {
    fetch("/Detroit_City_Council_Districts_2026.geojson")
    .then((res) => res.json())
    .then((data) => setGeoData(data))
    .catch((err) => console.error("Faile to load GeoJSON", err));
  
}, []);

  return (
    <> 
      {/* some words */}
      <h1 style={{ position: 'absolute', top: 10, left: 50, zIndex: 1000, background: 'white', padding: '10px 10px', borderRadius: '0px' }}>
        Truck Reports
      </h1>
    

      {/* starting coordinates/position */}
      <MapContainer 
        center={[42.344863, -83.056870]} 
        zoom={13} 
        style={{ height: '100vh', width: '100vw' }}
      >
        {/* map layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' /*giving credit*/
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' /*the actual map*/
        />
        {geoData && <GeoJSON data = {geoData}/> }
      </MapContainer>

    </> 
  );
}




// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
// import React from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import "leaflet/dist/leaflet.css";

// import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap, ZoomControl } from 'react-leaflet'


// function App() {

//   //sets up the page
//   const detroitPosition = [42.344863, -83.056870];
  
//   //renders out what information is going to be on the page
//   return (
    
//     <div style={{ height: '100vh', width: '100vw' }}>
    
      
//       {/* 1. The Map Window */}
//       <MapContainer 
//         center={detroitPosition} 
//         zoom={13} 
//         style={{ height: '100%', width: '100%' }}
//       >
        
//         {/* 2. The Map Tile Layer (Drawing the roads/terrain) */}
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//       </MapContainer>

//     </div>
//   );
// }




