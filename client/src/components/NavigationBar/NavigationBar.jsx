import React, { useContext } from 'react'
import { Nav } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

import { AuthContext } from '../../auth/auth';

const guest_links = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Login',
        url: '/login    '
    },
    {
        name: 'Register',
        url: '/register'
    }
]

const auth_links = [
    {
        name: 'Profile',
        url: '/profile'
    },
    {
        name: 'Create Post',
        url: '/create-post'
    },
    {
        name: 'Logout',
        url: 'logout'
    }
]

const NavigationBar = () => {
    const context = useContext(AuthContext);
    const history = useHistory();
    const links = context.user ? auth_links : guest_links;

    const handleOnClick = (e) => {
        if (e.target.id === "Logout") context.logout();
        history.push("/")
     }

    return (
        <Nav className="d-flex justify-content-end">
            {links.map((link, idx) => (
                <Nav.Link id={link.name} key={idx} href={link.url} onClick={handleOnClick} >{link.name}</Nav.Link>
            ))}
        </Nav>

    )
};

export default NavigationBar;