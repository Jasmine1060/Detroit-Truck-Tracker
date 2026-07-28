import React, { useState, useEffect, useRef, memo } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, CircleMarker, Popup, ZoomControl} from 'react-leaflet';
import {Link} from "react-router-dom"
 


/*SUB COMPONENTS OF THE MAP*//////
const TruckMarker = memo(function TruckMarker ({lat, lng, isActive, onSelect}) {
  return (

    <CircleMarker
      center={[lat, lng]}
      radius={isActive ? 11:8}
      pathOptions={{
        color: isActive ? '#fff': '#126a0a',
          fillColor: '#3e6e16',
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


/*MAIN ENGINE PART THAT ACTUALLY RUNS EVERYTHING *////////////
export default function Trucks() {

  const [geoData, setGeoData] = useState(null);
  const [trucks, setTrucks] = useState([]);
  const [selected, setSelected] = useState(null);

  /*district boundries*/

  useEffect(() => {
   fetch(`${import.meta.env.BASE_URL}Detroit_City_Council_Districts_2026.geojson`)
     .then((res) => res.json())
     .then((data) => setGeoData(data))
     .catch((err) => console.error("Failed to load GeoJSON", err));}, []);

  /*Truck data points */
  useEffect(() => {
   fetch(`${import.meta.env.BASE_URL}output.geojson`)
     .then(res => res.json())
     .then(data => setTrucks(data.features || []))
     .catch((err) => console.error('Failed to load truck plots', err));
 }, [])


 const handleSelect = (feature, index) => {
   const [lng, lat] = feature.geometry.coordinates
   setSelected({lat, lng, id: index});
 };



    return(<div className="map-page-wrapper">
      
      {/* Centered Overlay Container */}
      <div className="map-overlay-center">
        <div className="map-info-box">
          <h3>Detroit Truck Sightings</h3>
          <p>
            This map tracks where residents have seen heavy truck traffic in their neighborhoods. 
            Click on any green marker to focus on a specific sighting.
          </p>
        </div>
      </div>
     
      

      {/* starting coordinates/position */}
      <MapContainer 
        center={[42.37029626170325, -83.09127618082336]} 
        zoom={11}
        minZoom = {11}
        zoomControl={false}
        // ZoomControl Position = 'bottomright'
        style={{ height: '100vh', width: '100vw' }} /* this pushes out the map in any direction*/
      >
        {/* map layer */}
        <TileLayer
          attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={25}
        />
        <ZoomControl position="bottomright" />

        {/*customizing the colors of the boundry*/}
        {geoData && <GeoJSON 
        data = {geoData}
        style= {{
          color: "#246E96",
          weight: 0.8,
          fillColor: "#45c294",
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
       


        <FlyToTarget target={selected} />
      </MapContainer>
    </div>

  );
   
  
}
