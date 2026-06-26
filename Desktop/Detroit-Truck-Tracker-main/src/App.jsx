import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export default function App() {
  return (
    // 2. Added inline styles to force the map to take up the full screen
    <MapContainer 
      center={[42.344863, -83.056870]} 
      zoom={13} 
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
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




