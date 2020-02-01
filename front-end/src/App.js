import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Row, Col } from 'react-bootstrap';
import { BrowseRouter, Route } from 'react-router-dom';

function App() {
  return (
    <Row className='App-frame'>
      <Col>
      <div className='App-container'>
        <BrowseRouter>
          <Route path='' component={} />
        </BrowseRouter>
      </div>
      </Col>
    </Row>
  );
}

export default App;
