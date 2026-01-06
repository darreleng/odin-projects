import { NavLink } from "react-router"

export default function Navbar() {

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/signup">Sign up</NavLink>
                </li>
            </ul>
        </nav>

    )
}