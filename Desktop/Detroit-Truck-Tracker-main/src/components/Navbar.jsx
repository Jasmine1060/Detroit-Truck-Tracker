import {Link} from "react-router-dom"


export function Navbar() {
    return (
        <nav style={{ display: 'flex', gap: '10px' }}>
            <Link to="/">Trucks</Link>
                <button>Truck Reports</button>
            <Link to="/Air">Air</Link>
                <button>Air Monitors</button>
            <Link to="/report">report</Link>
                <button>Report a Truck</button>

        </nav>
    )
}