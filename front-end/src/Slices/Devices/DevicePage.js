import React, { useState, useCallback, useEffect } from 'react';
import { getDataforDevice } from './actions';
//import { LineChart, CartesianGrid, XAxis, Line, Label, Legend, YAxis, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { FlexibleWidthXYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, Line, LineSeriesCanvas, XAxis, YAxis, LineMarkSeries, Hint } from 'react-vis';

export const DevicePage = props => {
    const deviceId = props.match.params.deviceId;
    const [compostData, setCompostData] = useState();
    const [chartData, setChartData] = useState();
    const [currentData, setCurrentData] = useState();

    const fetchData = useCallback(async () => {
        var data = await getDataforDevice(deviceId);
        data = data.map(x => ({
            ...x,
           
        }))
        setCompostData(data);
    })

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        const data = compostData && compostData.map(x => ({
            x: moment(x.created),
            y: x.temperature
        }))
        console.log(data)
        setChartData(data);
    }, [compostData])

    return (
        <div>
            <h1>Device: {deviceId}</h1>
            <FlexibleWidthXYPlot height={300} xType='time-utc' onMouseLeave={() => setCurrentData(null)}>
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
                    format={(data) => ([{title: 'Temp.', value: data.y}])}
                />}
            </FlexibleWidthXYPlot>
            {/* <ResponsiveContainer height={600} width='100%'>
                <LineChart
                    data={compostData}
                    margin={{ top: 20, right: 30, left: 15, bottom: 20 }}
                >
                    <CartesianGrid stroke='#f5f5f5' />
                    <XAxis dataKey='created' name='Date' scale='utcTime'/>
                    <YAxis dataKey='temperature' label={{ value: 'Temp.', angle: 90, position: 'insideLeft', offset: {left: 15} }} />
                    <Tooltip />
                    <Line type='monotone' dataKey='temperature' stroke='#ff0000' yAxisId={0} />
                    <Legend align='right' verticalAlign='top' />
                </LineChart>
            </ResponsiveContainer> */}
        </div>
    )
}