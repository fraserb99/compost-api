import React, { useState, useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage } from './Slices/Home/HomePage';
import { DevicesPage } from './Slices/Devices/DevicesPage';
import { NavBar } from './components/Navbar/Navbar';
import { DevicePage } from './Slices/Devices/DevicePage';
import 'react-vis/dist/style.css';
import { DeviceContext } from './infrastructure/contexts/DeviceContext';
import { UserContext } from './infrastructure/contexts/UserContext';
import { getJWTUser, getCookie } from './infrastructure/login/sessions';
import LogInPage from './Slices/LogIn/LoginPage';
import './components/Form/input.scss';
import { LogInModalContext } from './infrastructure/contexts/LogInModalContext';
import { LogInModal } from './components/LogIn/LoginModal';

function App(props) {
  const [user, setUser] = useState();
  const [showLogInModal, setShowLogInModal] = useState(false);

  const fetchLoggedIn = useCallback(async () => {
    let jwt = getCookie('compost-jwt');
    if (jwt !== 'null') {
      const loggedInUser = await getJWTUser(jwt);
      setUser(loggedInUser);
    }
  })

  useEffect(() => {
    fetchLoggedIn()
  }, [])

  return (
    <Row className='App-frame' noGutters>
      <div className='App-container'>
        <BrowserRouter>
          <LogInModalContext.Provider value={{showLogInModal, setShowLogInModal}}>
            <UserContext.Provider value={{user,setUser}}>
              <Container>
                <Route path='' component={NavBar} />
                <Route exact path='/' component={HomePage}  />
                <Route exact path='/devices' component={DevicesPage} />
                <Route path='/devices/:deviceId' component={DevicePage} />
                <Route path='/login' component={LogInPage} />
              </Container>
              <LogInModal />
            </UserContext.Provider>
          </LogInModalContext.Provider>
        </BrowserRouter>
      </div>
    </Row>
  );
}


export default App;
