import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getDevices } from './actions';

export const DevicesPage = props => {
    const [devices, setDevices] = useState();

    const fetchDevices = useCallback(async () => {
        const devices = await getDevices();
        console.log(devices);
        setDevices(devices);
    })

    useEffect(() => {
        fetchDevices();
    }, [])

    return (
        <div>
            <h1>Devices</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {devices && devices.map(device => (
                        <tr>
                            <td>{device.id}</td>
                            <td>{device.name}</td>
                            <td>
                                <Button onClick={() => props.history.push(`/devices/${device.id}`)}>
                                    View Data
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}