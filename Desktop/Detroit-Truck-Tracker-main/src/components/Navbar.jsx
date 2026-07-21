import React from "react";
import { NavLink } from "react-router-dom"; // 🚀 Use NavLink instead of plain Link
import logo from "/TOOS_Logo.png";

const navLinkStyle = {
  textDecoration: 'none',
  fontSize: '15px',
  padding: '8px 16px',
  borderRadius: '6px',
  transition: 'all 0.2s ease',
};

export function Navbar() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      backgroundColor: '#ffffff', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      zIndex: 1000,                                
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      margin: 0,
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* Left Side: Logo & Unified Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src={logo} alt="TOOS logo" width="80" height="80" style={{ objectFit: 'contain' }} />
        <h1 style={{ fontSize: '22px', fontWeight: '700', margin: 0, color: '#1e293b' }}>
          Detroit Truck & Air Insights
        </h1>
      </div>

      {/* Right Side: Active Highlighting Navigation Links */}
      <nav style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        
        {/* 1. Truck Sightings Link */}
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            ...navLinkStyle,
            color: isActive ? '#63c038' : '#64748b',
            borderBottom: isActive ? '2px solid #63c038' : '2px solid transparent'

          })}
        >
          Truck Sightings
        </NavLink>

        {/* 2. Air Quality / Monitors Link */}
        <NavLink 
          to="/Air" 
          style={({ isActive }) => ({
            ...navLinkStyle,
            color: isActive ? '#e2613a' : '#64748b',
            borderBottom: isActive ? '2px solid #e2613a' : '2px solid transparent'
          })}
        >
          Air Monitors
        </NavLink>

      </nav>
    </header>
  );
}