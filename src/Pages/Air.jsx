import React, { useState, useEffect, useRef, memo } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, CircleMarker, Popup, ZoomControl} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Always keep this to avoid map tile distortion!

/* SUB COMPONENT: INDIVIDUAL AIR MARKER */
const AirMarker = memo(function AirMarker ({lat, lng, station_name, address, company_org, resource_link, isActive, onSelect}) {
  return (
    <CircleMarker
      center={[lat, lng]}
      radius={isActive ? 11 : 8}
      pathOptions={{
        color: isActive ? '#ffffff' : '#991f1f',
        fillColor: '#a65320',
        fillOpacity: isActive ? 1 : 0.8,
        weight: isActive ? 2 : 1,
      }}
      eventHandlers={{click: onSelect}}
    >  
      <Popup minWidth={220} className="custom-monitor-popup">
        <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', padding: '6px' }}>
          
          {/* Header Status Tag */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', fontWeight: '600' }}>
              Air Monitor Station
            </span>
            <span style={{
              fontSize: '10px',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '700',
              backgroundColor: "#e0f2fe", // 
              color: "#0369a1"
            }}>
              {company_org} {/* Displays "EGLE"  */}
            </span>
          </div>

          {/* Station Identity Details */}
          <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
            {station_name}
          </h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>
            Location: {address}
          </p>

          {resource_link && (
            <>
              <hr style={{ border: '0', borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />
              <a 
                href={resource_link} 
                target="_blank" 
                rel="noreferrer" 
                style={{ fontSize: '12px', color: '#ff6511', textDecoration: 'none', fontWeight: '600' }}
              >
                Go to Website
              </a>
            </>
          )}
        </div>
      </Popup>
    </CircleMarker>
  );
});
      

/* ✈️ CINEMATIC PANNING MOVEMENT */
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


/* ⚙️ MAIN TRUCKS COMPONENT ENGINE */
export default function Trucks() {
  const [geoData, setGeoData] = useState(null);
  const [trucks, setTrucks] = useState([]);
  const [selected, setSelected] = useState(null);

  /* District boundaries */
  useEffect(() => {
    fetch("/Detroit_City_Council_Districts_2026.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load GeoJSON", err));
  }, []);

  /* Air monitor data points */
  useEffect(() => {
    fetch('/air_monitors.geojson')
      .then(res => res.json())
      .then(data => setTrucks(data.features || []))
      .catch((err) => console.error('Failed to load truck plots', err));
  }, [])

  const handleSelect = (feature, index) => {
    const [lng, lat] = feature.geometry.coordinates
    setSelected({lat, lng, id: index});
  };

  return (<div className="map-page-wrapper">
      
      {/* Centered Overlay Container */}
      <div className="map-overlay-center">
        <div className="map-info-box">
          <h3>Detroit Air Quality Monitor Stations</h3>
          <p>
            This map tracks public air quality monitor stations in Detroit. 
            To access JustAir monitors follow this link: <a href="https://justair.app/browse">JustAir</a> Click on any brown marker to learn more about each station.
          </p>
        </div>
      </div>
      <MapContainer 
        center={[42.37029626170325, -83.09127618082336]} 
        zoom={11}
        minZoom = {11}
        zoomControl={false}
        style={{ height: '100vh', width: '100vw' }}
      >
        <TileLayer
          attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          minZoom={0}
          maxZoom={25}
        />
        <ZoomControl position="bottomright" />

        {geoData && (
          <GeoJSON 
            data={geoData}
            style={{
              color: "#965024",
              weight: 0.8,
              fillColor: "#da932a",
              fillOpacity: 0.2,
            }}
          />
        )}

        {trucks.map((truck, index) => {
          // 1. Get the coordinates arrays safely
          const [lng, lat] = truck.geometry.coordinates;
          
          // 2. Destructure using curly braces {} for objects, targeting the actual 'truck' item
          const { station_name, address, company_org, resource_link } = truck.properties;

          return (
            <AirMarker 
              key={index}
              lat={lat}
              lng={lng}
              station_name={station_name}
              address={address}
              company_org={company_org}
              resource_link={resource_link}
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
// import React, { useState, useEffect, useRef, memo } from "react";
// import { MapContainer, TileLayer, GeoJSON, useMap, CircleMarker, Popup, ZoomControl} from 'react-leaflet';



// /*SUB COMPONENTS OF THE MAP*//////
// const AirMarker = memo(function AirMarker ({lat, lng, station_name, address, company_org, resource_link, isActive, onSelect}) {
//   return (

//     <CircleMarker
//       center={[lat, lng]}
//       radius={isActive ? 11:8}
//       pathOptions={{
//         color: isActive ? '#ffffff': '#58991f',
//           fillColor: '#54bd4e',
//           fillOpacity: isActive ? 1: 0.8,
//           weight: isActive ? 2 : 1,

//         }}
//           eventHandlers={{click: onSelect}}

//       >  
//  {/*pop up for when a marker gets clicked*/}
 
//     <Popup minWidth={220} className="custom-monitor-popup">
//         <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', padding: '6px' }}>
          
//           {/* Header Status Tag */}
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
//             <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', fontWeight: '600' }}>
//               Air Monitor Station
//             </span>
//             <span style={{
//               fontSize: '10px',
//               padding: '2px 6px',
//               borderRadius: '4px',
//               fontWeight: '700',
//               backgroundColor: status === "Active" ? "#e0f2fe" : "#f1f5f9",
//               color: status === "Active" ? "#0369a1" : "#475569"
//             }}>
//               {status}
//             </span>
//           </div>

//           {/* Station Identity Details */}
//           <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
//             {station_name}
//           </h3>
//           <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#475569' }}>
//             {address}
//           </p>

//           <hr style={{ border: '0', borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />

//           {/* Core Metrics Tracked Data */}
//           {/* <div style={{ backgroundColor: '#f8fafc', padding: '8px', borderRadius: '6px' }}>
//             <span style={{ fontSize: '11px', display: 'block', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>
//               TRACKED POLLUTANTS
//             </span>
//             <span style={{ fontSize: '13px', fontWeight: '500', color: '#334155' }}>
//               {pollutants || "PM2.5"}
//             </span>
//           </div> */}

//         </div>
//       </Popup>
//     </CircleMarker>
//   );
// });
      

// /*cinematic panning movement*/

// function FlyToTarget({ target }) {
//  const map = useMap()
//  const prevTarget = useRef(null)


//  useEffect(() => {
//    if (target && target !== prevTarget.current) {
//      prevTarget.current = target
//      map.flyTo([target.lat, target.lng], 15, { duration: 0.8 })
//    }
//  }, [target, map])


//  return null
// }


// /*MAIN ENGINE PART THAT ACTUALLY RUNS EVERYTHING *////////////
// export default function Trucks() {

//   const [geoData, setGeoData] = useState(null);
//   const [trucks, setTrucks] = useState([]);
//   const [selected, setSelected] = useState(null);

//   /*district boundries*/

//   useEffect(() => {
//     fetch("/Detroit_City_Council_Districts_2026.geojson")
//     .then((res) => res.json())
//     .then((data) => setGeoData(data))
//     .catch((err) => console.error("Failed to load GeoJSON", err));}, []);

//   /*Truck data points */
//   useEffect(() => {
//   fetch('/air_monitors.geojson')
//     .then(res => res.json())
//     .then(data => setTrucks(data.features || []))
//     .catch((err) => console.error('Failed to load truck plots', err));
// }, [])


//  const handleSelect = (feature, index) => {
//    const [lng, lat] = feature.geometry.coordinates
//    setSelected({lat, lng, id: index});
//  };

    
//     return(<>
    

//       {/* starting coordinates/position */}
//       <MapContainer 
//         center={[42.344863, -83.056870]} 
//         zoom={12}
//         zoomControl={false}
//         // ZoomControl Position = 'bottomright'
//         style={{ height: '100vh', width: '100vw' }} /* this pushes out the map in any direction*/
//       >
//         {/* map layer */}
//         <TileLayer
//           attribution= '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
//         />
//         <ZoomControl position="bottomright" />

//         {/*customizing the colors of the boundry*/}
//         {geoData && <GeoJSON 
//         data = {geoData}
//         style= {{
//           color: "#965024",
//           weight: 0.8,
//           fillColor: "#da932a",
//           fillOpacity: 0.2,
//         }}
//         /> }

//       {/*loops the coordinates*/}
//         {trucks.map((truck, index) => {
//           const [station_name, address, company_org, resource_link] = air.properties;
//           return (
//             <AirMarker 
//               key={index}
//               lat={lat}
//               lng={lng}
//               station_name={station_name}
//               address={address}
//               company_org={company_org}
//               resource_link={resource_link}
//               isActive={selected?.id === index}
//               onSelect={() => handleSelect(truck, index)}
//             />
//           );
//         })}
   


//         <FlyToTarget target={selected} />
//       </MapContainer>
//     </>

//   );
   
  
// }