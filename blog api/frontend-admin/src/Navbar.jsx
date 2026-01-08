import { Form, NavLink } from "react-router"
import { useRouteLoaderData } from "react-router"

export default function Navbar() {

    const { user } = useRouteLoaderData("root");

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    {user ? <p className="hello">Hello, {user.username}!</p> : null }
                </li>
                <li>
                    {user ? <Form method="post" action="/logout"><button>Log out</button></Form> : <NavLink to="/login"><button>Log in/Sign up</button></NavLink>}
                </li>
                
            </ul>
        </nav>

    )
}