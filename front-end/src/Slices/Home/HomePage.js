import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => (
    <h1>Home</h1>
    <Link to='/compostdata'>Compost Data</Link>
    <Link to='devices'>Devices</Link>
)