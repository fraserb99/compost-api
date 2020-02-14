import React, { useState, useCallback, useEffect, useContext } from 'react';
import { getDataforDevice, getDevice } from './actions';
//import { LineChart, CartesianGrid, XAxis, Line, Label, Legend, YAxis, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { FlexibleWidthXYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, Line, LineSeriesCanvas, XAxis, YAxis, LineMarkSeries, Hint } from 'react-vis';
import { DeviceContext } from '../../infrastructure/contexts/DeviceContext';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { LogInModalContext } from '../../infrastructure/contexts/LogInModalContext';
import { Button } from 'react-bootstrap';

export const DevicePage = props => {
    const deviceId = props.match.params.deviceId;
    const [device, setDevice] = useState();
    const [compostData, setCompostData] = useState();
    const [chartData, setChartData] = useState();
    const [currentData, setCurrentData] = useState();

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
            <FlexibleWidthXYPlot 
                height={300} 
                xType='time-utc' 
                onMouseLeave={() => setCurrentData(null)}
                margin={{right: 20}}
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis tickTotal={5} />
                <YAxis title='Temp' position='middle'
                />
                <LineMarkSeries
                    style={{
                    strokeWidth: '2px'
                    }}
                    lineStyle={{stroke: 'red'}}
                    markStyle={{stroke: 'red', fill: 'red'}}
                    size={3}
                    curve={'curveMonotoneX'}
                    data={chartData}
                    onNearestXY={(value) => {
                        console.log(value)
                        setCurrentData(value)
                        }}
                />
                {currentData && <Hint 
                    value={currentData} 
                    format={(data) => ([{title: 'Temp', value: `${data.y}°C`}])}
                />}
            </FlexibleWidthXYPlot>}
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