import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => (
    <div>
        <h1>Home</h1>
        <p>
            This is the homepage
        </p>
        <Link to='/compostdata'>Compost Data</Link>
        <Link to='devices'>Devices</Link>
    </div>
)