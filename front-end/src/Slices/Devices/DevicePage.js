import React, { useState, useCallback, useEffect, useContext } from 'react';
import { getDataforDevice, getDevice } from './actions';
//import { LineChart, CartesianGrid, XAxis, Line, Label, Legend, YAxis, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { FlexibleWidthXYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, Line, LineSeriesCanvas, XAxis, YAxis, LineMarkSeries, Hint, AreaSeries } from 'react-vis';
import { DeviceContext } from '../../infrastructure/contexts/DeviceContext';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { LogInModalContext } from '../../infrastructure/contexts/LogInModalContext';
import { Button, Nav, Dropdown, Tab, Tabs, Row, Col, ButtonGroup, ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

const getYScale = data => {
    if (!data) return [20, 80];
}

const getXScale = data => {
    if (!data) return [moment().subtract(7, 'days'), moment()]
}

export const DevicePage = props => {
    const deviceId = props.match.params.deviceId;
    const [device, setDevice] = useState();
    const [compostData, setCompostData] = useState();
    const [chartData, setChartData] = useState();
    const [currentData, setCurrentData] = useState();
    const [chartType, setActiveChartType] = useState('combined');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const {user, setUser} = useContext(UserContext);
    const {showLogInModal, setShowLogInModal} = useContext(LogInModalContext);

    const fetchDevice = useCallback(async () => {
        if (!user) return;
        try {
            var resp = await getDevice(deviceId);
            setDevice(resp)
        } catch (e) {
            console.log(e)
        }
    })

    const fetchData = useCallback(async () => {
        var data = await getDataforDevice(deviceId);
        data = data.map(x => ({
            ...x,
        }))
        setCompostData(data);
    })

    useEffect(() => {
        fetchDevice();
        fetchData();
    }, [deviceId])

    useEffect(() => {
        const data = compostData && compostData.map(x => ({
            x: moment(x.created),
            y: x.temperature
        }))
        setChartData(data);
    }, [compostData])

    return (
        <div>
            <h1>Device: {device && device.name}</h1>
            {user &&
                <Row>
                    <Col>
                        <Nav 
                            variant='tabs' 
                            activeKey={chartType} 
                            onSelect={(k) => setActiveChartType(k)}
                            fill
                        >
                            <Nav.Item>
                                <Nav.Link eventKey='combined'>Combined</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='temp'>Temperature</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='moisture'>Moisture</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='depth'>Depth</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    {/* <Col lg={2} md={4} sm={6} xs={4}>
                        <Dropdown drop='right'>
                            <Dropdown.Toggle variant='secondary'>
                                Change Range
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Tabs fill defaultActiveKey='date'>
                                    <Tab eventKey='date' title='Date'>
                                        Date Page
                                    </Tab>
                                    <Tab eventKey='range' title='Range'>
                                        Range
                                    </Tab>
                                </Tabs>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col> */}
                </Row>
            }
            {user && 
            <Row>
                <div className='chart-options-toolbar'>
                    <ButtonToolbar>
                        <ToggleButtonGroup 
                            size='sm' 
                            name='options' 
                            defaultValue={1}
                            className='mr-2'
                        >
                            <ToggleButton value={1} variant='outline-primary'>5 mins</ToggleButton>
                            <ToggleButton value={2} variant='outline-primary'>30 mins</ToggleButton>
                            <ToggleButton value={3} variant='outline-primary'>hourly</ToggleButton>
                        </ToggleButtonGroup>

                        <ButtonGroup>
                            <Dropdown drop='left'>
                                <Dropdown.Toggle variant='outline-primary' size='sm'>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                    &nbsp; Last 7 Days
                                </Dropdown.Toggle>
                                
                                <Dropdown.Menu>
                                    <Tabs defaultActiveKey='start'>
                                        <Tab title='Start' eventKey='start'>
                                            <DatePicker
                                                selectsStart
                                                startDate={startDate}
                                                endDate={endDate}
                                                inline
                                                maxDate={endDate || new Date()}
                                                onChange={(d) => setStartDate(d)}
                                            />
                                        </Tab>
                                        <Tab title='End' eventKey='end'>
                                            <DatePicker
                                                selectsEnd
                                                startDate={startDate}
                                                endDate={endDate}
                                                inline
                                                minDate={startDate}
                                                maxDate={new Date()}
                                                onChange={(d) => setEndDate(d)}
                                            />
                                        </Tab>
                                    </Tabs>
                                    <span className='apply-row'>
                                        <small>
                                            {startDate && moment(startDate).format('DD/MM/YYYY')} - {endDate && moment(endDate).format('DD/MM/YYYY')}
                                        </small>
                                        <Button className='float-right apply-btn' size='sm' variant='outline-primary'>Apply</Button>
                                    </span>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <FlexibleWidthXYPlot 
                    height={300} 
                    xType='time-utc'
                    // yDomain={getYScale(chartData)}
                    // xDomain={getXScale(chartData)}
                    yPadding={50}
                    onMouseLeave={() => setCurrentData(null)}
                    margin={{right: 20}}
                    animation={true}
                    style={{
                        text: {fontSize: '16px'}
                    }}
                >
                    {/* <VerticalGridLines />
                    <HorizontalGridLines /> */}
                    <XAxis tickTotal={5} />
                    <YAxis title='Temp (°C)' position='end'
                    />
                    <AreaSeries
                        style={{
                        strokeWidth: '2px'
                        }}
                        color='red'
                        opacity={0.65}
                        size={3}
                        curve={'curveMonotoneX'}
                        data={chartData}
                        animation={true}
                        onNearestXY={(value) => {
                            setCurrentData(value)
                            }}
                    />
                    {currentData && <Hint 
                        value={currentData} 
                        format={(data) => ([{title: 'Temp', value: `${data.y}°C`}])}
                    />}
                </FlexibleWidthXYPlot>
            </Row>}
            {!user &&
            <div>
                <h2>
                    <Button onClick={() => setShowLogInModal(true)}>Log In</Button> to view devices
                </h2>
            </div>
            }
        </div>
    )
}