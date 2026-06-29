import {Link} from "react-router-dom";
import logo from "/TOOS_Logo.png";

const navLinkStyle = {
    textDecoration: 'none',
  color: '#64748b',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'color 0.2s',
};

export function Navbar() {
    return (
            <header style={{
              position: 'fixed',
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
        {/* Left Side: coalition name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src = {logo} alt="Toos logo" width= "90" height= "90" /> {/*logo image */}
        
                <h1 style={{ fontSize: '23px', fontWeight: '600', margin: 0, color: '#1e293b' }}>
                  Detroit Truck Reports
                </h1>
              </div>
        
              {/* links on the right side of the header */}
              <nav style={{ display: 'flex', gap: '24px', aligntItems: 'center', marginRight: '100px' }}>
                <Link to="/" style={navLinkStyle}>Truck Sightings</Link>
                <Link to="/Air" style={navLinkStyle}>Air Monitors</Link>
              </nav>
        
            </header>
          );
        }
        // <nav style={{ display: 'flex', gap: '10px' }}>
        //     <Link to="/">Trucks</Link>
        //         <button>Truck Reports</button>
        //     <Link to="/Air">Air</Link>
        //         <button>Air Monitors</button>
        //     <Link to="/report">report</Link>
        //         <button>Report a Truck</button>

//         </nav>
    
// };