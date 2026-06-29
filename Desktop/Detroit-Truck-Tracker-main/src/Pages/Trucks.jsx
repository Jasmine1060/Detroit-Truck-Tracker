import React, { useState, useEffect, useRef, memo } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, CircleMarker, Popup, ZoomControl} from 'react-leaflet';
import logo from "/TOOS_Logo.png";
import {Link} from "react-router-dom"

/*SUB COMPONENTS OF THE MAP*//////
const TruckMarker = memo(function TruckMarker ({lat, lng, isActive, onSelect}) {
  return (

    <CircleMarker
      center={[lat, lng]}
      radius={isActive ? 11:8}
      pathOptions={{
        color: isActive ? '#fff': '#551532',
          fillColor: '#a72f53',
          fillOpacity: isActive ? 1: 0.8,
          weight: isActive ? 2 : 1,

        }}
          eventHandlers={{click: onSelect}}

      />  /*dont need to write circle marker again, can just use />*/

  
  );
  
});

/*cinematic panning movement*/

function FlyToTarget({ target }) {
 const map = useMap()
 const prevTarget = useRef(null)


 useEffect(() => {
   if (target && target !== prevTarget.current) {
     prevTarget.current = target
     map.flyTo([target.lat, target.lng], 15, { duration: 0.8 })
   }
 }, [target, map])


 return null
}
/*creating a header*/

function MapHeader() {

  // const imgStyle = {

  //     position: 'absolute',
  //     left: '200px',
  //     top:'15px', };

  return (
    <header style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      backgroundColor: '#fff', 
      backdropFilter: 'blur(8px)',                 //  drop down shadow effect
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,                                // Must sit higher than the map layer!
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      margin: 0,
      boxSizing: 'border-box',
      overflow: 'hidden',

      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* <div style={{display: 'flex', alignItems: 'flex', gap: '12px'}}>
  
        
        
      

      {/* <img id="myImage" src="truck.png" style={imgStyle} alt="Truck" /> */}

      {/* Left Side: coalition name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src = {logo} alt="Toos logo" width= "90" height= "90" />; {/*logo image */}

        <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#1e293b' }}>
          Detroit Truck Reports
        </h1>
      </div>

      {/* <img id="myImage" src="truck.png" style={imgStyle} alt="Truck" /> */}

      

      {/* links on the right side of the header */}
      <nav style={{ display: 'flex', gap: '24px', aligntItems: 'center', marginRight: '160px' }}>
        <a href='#Truck reports' style={navLinkStyle}>Truck Sightings</a>
        <a href="#dashboard" style={navLinkStyle}>Air Monitors</a>
        <a href="#reports" style={navLinkStyle}>Report a Truck</a>
        {/* <a href="#settings" style={navLinkStyle}>Settings</a> */}
      </nav>
    </header>
  );
}

// Quick clean style helper for header links
const navLinkStyle = {
  textDecoration: 'none',
  color: '#64748b',
  fontSize: '14px',
  transition: 'color 0.2s',
};

/*MAIN ENGINE PART THAT ACTUALLY RUNS EVERYTHING *////////////
export default function Trucks() {

  const [geoData, setGeoData] = useState(null);
  const [trucks, setTrucks] = useState([]);
  const [selected, setSelected] = useState(null);

  /*district boundries*/

  useEffect(() => {
    fetch("/Detroit_City_Council_Districts_2026.geojson")
    .then((res) => res.json())
    .then((data) => setGeoData(data))
    .catch((err) => console.error("Failed to load GeoJSON", err));}, []);

  /*Truck data points */
  useEffect(() => {
  fetch('/output.geojson')
    .then(res => res.json())
    .then(data => setTrucks(data.features || []))
    .catch((err) => console.error('Failed to load truck plots', err));
}, [])


 const handleSelect = (feature, index) => {
   const [lng, lat] = feature.geometry.coordinates
   setSelected({lat, lng, id: index});
 };

    
    return(<>
    
      <MapHeader />

      {/* starting coordinates/position */}
      <MapContainer 
        center={[42.344863, -83.056870]} 
        zoom={12}
        zoomControl={false}
        // ZoomControl Position = 'bottomright'
        style={{ height: '100vh', width: '100vw' }}
      >
        {/* map layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' /*giving credit*/
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' /*the actual map*/
        />
        <ZoomControl position="bottomright" />

        {/*customizing the colors of the boundry*/}
        {geoData && <GeoJSON 
        data = {geoData}
        style= {{
          color: "#246E96",
          weight: 0.8,
          fillColor: "#4594C2",
          fillOpacity: 0.2,
        }}
        /> }

      {/*loops the coordinates*/}
        {trucks.map((truck, index) => {
          const [lng, lat] = truck.geometry.coordinates;
          return (
            <TruckMarker 
              key={index}
              lat={lat}
              lng={lng}
              isActive={selected?.id === index}
              onSelect={() => handleSelect(truck, index)}
            />
          );
        })}
        {/* linking everything*/}
        <Link to="/">Trucks</Link>
        <Link to="/Air">Air</Link>
        <Link to="/report">report</Link>


        <FlyToTarget target={selected} />
      </MapContainer>
    </>

  );
   
  
}