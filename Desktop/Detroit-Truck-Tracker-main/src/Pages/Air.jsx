
import React, { useState, useEffect, useRef, memo } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, CircleMarker, Popup, ZoomControl} from 'react-leaflet';



/*SUB COMPONENTS OF THE MAP*//////
const AirMarker = memo(function AirMarker ({lat, lng, isActive, onSelect}) {
  return (

    <CircleMarker
      center={[lat, lng]}
      radius={isActive ? 11:8}
      pathOptions={{
        color: isActive ? '#fff': '#58991f',
          fillColor: '#54bd4e',
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
    

      {/* starting coordinates/position */}
      <MapContainer 
        center={[42.344863, -83.056870]} 
        zoom={12}
        zoomControl={false}
        // ZoomControl Position = 'bottomright'
        style={{ height: '100vh', width: '100vw' }} /* this pushes out the map in any direction*/
      >
        {/* map layer */}
        <TileLayer
          attribution= '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />

        {/*customizing the colors of the boundry*/}
        {geoData && <GeoJSON 
        data = {geoData}
        style= {{
          color: "#965024",
          weight: 0.8,
          fillColor: "#da932a",
          fillOpacity: 0.2,
        }}
        /> }

      {/*loops the coordinates*/}
        {trucks.map((truck, index) => {
          const [lng, lat] = truck.geometry.coordinates;
          return (
            <AirMarker 
              key={index}
              lat={lat}
              lng={lng}
              isActive={selected?.id === index}
              onSelect={() => handleSelect(truck, index)}
            />
          );
        })}
        {/* linking everything*/}
        {/* <Link to="/">Trucks</Link>
        <Link to="/Air">Air</Link>
        <Link to="/report">report</Link> */}


        <FlyToTarget target={selected} />
      </MapContainer>
    </>

  );
   
  
}