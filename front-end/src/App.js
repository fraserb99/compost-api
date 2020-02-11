import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage } from './Slices/Home/HomePage';
import { DevicesPage } from './Slices/Devices/DevicesPage';
import { NavBar } from './components/Navbar/Navbar';
import { DevicePage } from './Slices/Devices/DevicePage';
import 'react-vis/dist/style.css';

function App(props) {
  console.log(props);
  return (
    <Row className='App-frame' noGutters>
      <div className='App-container'>
        <BrowserRouter>
          <Container>
            <Route path='' component={NavBar} />
            <Route exact path='/' component={HomePage}  />
            <Route exact path='/devices' component={DevicesPage} />
            <Route path='/devices/:deviceId' component={DevicePage} />
          </Container>
        </BrowserRouter>
      </div>
    </Row>
  );
}


export default App;
