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
import LoadingOverlay from 'react-loading-overlay';

import "react-datepicker/dist/react-datepicker.css";
import { ChartToolbar } from './components/ChartToolbar';

const getYScale = data => {
    if (!data) return [20, 80];
}

const getXScale = data => {
    if (!data) return [moment().subtract(7, 'days'), moment()]
}

const getMetric = (data, chartType) => {
    switch (chartType) {
        case 'temp':
            return data.temperature;
        case 'moisture':
            return data.moisture;
        case 'depth':
            return data.depth;
        default:
            return data.temperature;
    }
}

const formatHint = (data, chartType) => {
    var title = '';
    var units = '';

    switch (chartType) {
        case 'temp':
            title = 'Temp';
            units = '°C';
            break;
        case 'moisture':
            title = 'Moisture';
            units = '%';
            break;
        case 'depth':
            title = 'Depth';
            units = 'cm';
            break;
        default:
            break;
    }

    return {title, value: `${data.y}${units}`}
}

const chartTitles = {
    'temp': 'Temp (°C)',
    'moisture': 'Moisture (%)',
    'depth': 'Depth (cm)'
}

export const DevicePage = props => {
    const deviceId = props.match.params.deviceId;
    const [device, setDevice] = useState();
    const [compostData, setCompostData] = useState();
    const [chartData, setChartData] = useState();
    const [currentData, setCurrentData] = useState();
    const [chartType, setActiveChartType] = useState('temp');
    const [startDate, setStartDate] = useState(new Date()-5);
    const [endDate, setEndDate] = useState(new Date);
    const [res, setRes] = useState(30);
    const [loading, setLoading] = useState(false);

    const {user, setUser} = useContext(UserContext);
    const {showLogInModal, setShowLogInModal} = useContext(LogInModalContext);

    const fetchDevice = useCallback(async () => {
        console.log(user)
        if (!user) return;
        try {
            var resp = await getDevice(deviceId);
            setDevice(resp)
        } catch (e) {
            console.log(e)
        }
    })

    const fetchData = useCallback(async () => {
        const start = moment(startDate).toISOString();
        const end = moment(endDate).toISOString();
        setLoading(true);
        var data = await getDataforDevice(deviceId, start, end, res);
        data = data.map(x => ({
            ...x,
        }))
        setCompostData(data);
    })

    useEffect(() => {
        fetchDevice();
        fetchData();
    }, [deviceId, user])

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, res])

    useEffect(() => {
        const data = compostData && compostData.map(x => ({
            x: moment(x.created),
            y: getMetric(x, chartType)
        }))
        setLoading(false);
        setChartData(data);
    }, [compostData, chartType])

    console.log(device);
    return (
        <div>
            <h1>Device: {device && device.name}</h1>
            {user &&
                <Row>
                    <Col>
                        <Nav 
                            variant='tabs' 
                            activeKey={chartType} 
                            onSelect={(k) => {
                                console.log(k);
                                setActiveChartType(k)}
                            }
                            fill
                        >
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
                </Row>
            }
            {user && 
            <Row>
                <ChartToolbar
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    res={res}
                    setRes={setRes}
                />
                {chartData && chartData.length ?
                    <FlexibleWidthXYPlot 
                        height={300} 
                        xType='time-utc'
                        yPadding={50}
                        onMouseLeave={() => setCurrentData(null)}
                        margin={{right: 20}}
                        animation={true}
                        style={{
                            text: {fontSize: '16px'}
                        }}
                    >
                        <XAxis tickTotal={5} />
                        <YAxis title={chartTitles[chartType]} position='end'
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
                            format={(data) => ([formatHint(data, chartType), {title: 'Date', value: data.x.format('DD/MM/YY hh:mm')}])}
                        />}
                    </FlexibleWidthXYPlot>
                    :
                    <h2>No Data found for this period</h2>}
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