import React, { useContext, useCallback } from 'react';
import {Nav, Navbar, NavbarBrand, Container, NavDropdown, CarouselItem} from 'react-bootstrap';
import NavLink from 'react-bootstrap/NavLink';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSign, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import brand from './brand.png';
import { LogInModalContext } from '../../infrastructure/contexts/LogInModalContext';

export const NavBar = ({history, location}) => {
    const {showLogInModal, setShowLogInModal} = useContext(LogInModalContext);
    const {user, setUser} = useContext(UserContext);
    console.log(user)

    const logout = useCallback(() => {
        Cookies.set('compost-jwt', null);
        setUser(null);
    });

    return (
        <Navbar
            variant='light'
            expand='sm'
        >
            <NavbarBrand>
                <img src={brand} height='45px' />
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse >
                <Nav className="mr-auto" bsPrefix='tabs'>
                    <Nav.Link 
                        onClick={() => history.push('/')}
                        active={location.pathname == '/'}
                    >
                        <FontAwesomeIcon icon={faHome} /> Home
                    </Nav.Link>
                    <Nav.Link 
                        onClick={() => history.push('/devices')}
                        active={location.pathname.includes('devices')}
                        
                    >
                        Devices
                    </Nav.Link>
                    
                </Nav>
                <Nav>
                    {!user ?
                    <Nav.Link
                        onClick={() => setShowLogInModal(true)}
                    >
                        Log In <FontAwesomeIcon icon={faSignInAlt} />
                    </Nav.Link>
                    :
                    <NavDropdown title={<span><FontAwesomeIcon icon={faUser} /> {user.email} {user.role == 'Admin' && `(${user.role})`}</span>}>
                        <DropdownItem onClick={() => history.push('user/details')}>Your Account</DropdownItem>
                        <DropdownItem onClick={() => logout()}>Log Out</DropdownItem>
                    </NavDropdown>}
                </Nav>
            </NavbarCollapse>
        </Navbar>
    )
}