import { Link } from "react-router";

export default function Navbar() {
    return (
    <nav className="nav">
        <ul className="nav-list">
            <li className="nav-item"><Link to='/'>Home</Link></li>
            <li className="nav-item"><Link to='/shop'>Shop</Link></li>
            <li className="nav-item"><Link to='/cart'>Cart</Link></li>
        </ul>
    </nav>
    )
}