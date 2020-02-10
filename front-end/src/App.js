import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage } from './Slices/Home/HomePage';

function App() {
  return (
    <Row className='App-frame'>
      <div className='App-container'>
        <BrowserRouter>
          <Route exact path='/' component={HomePage}  />
        </BrowserRouter>
      </div>
    </Row>
  );
}

export default App;
