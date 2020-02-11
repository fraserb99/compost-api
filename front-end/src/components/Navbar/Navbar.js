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

export const NavBar = ({history, ...props}) => {
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
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => history.push('/')}><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
                    <Nav.Link onClick={() => history.push('/devices')}>Devices</Nav.Link>
                </Nav>
            </NavbarCollapse>
        </Navbar>
    )
}