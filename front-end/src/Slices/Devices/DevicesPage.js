import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { getDevices } from './actions';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { LogInModalContext } from '../../infrastructure/contexts/LogInModalContext';

export const DevicesPage = props => {
    const [devices, setDevices] = useState();
    const [loading, setLoading] = useState(true);

    const {user, setUser} = useContext(UserContext);
    const {setShowLogInModal} = useContext(LogInModalContext);

    const fetchDevices = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const devices = await getDevices();

        setDevices(devices);
        setLoading(false);
    })

    useEffect(() => {
        fetchDevices();
    }, [user])

    return (
        <div>
            <h1>Devices</h1>
            {user && !loading &&
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
            </Table>}
            {loading &&
                <div className='table-loading'>
                    <Spinner animation='border'/>
                </div>}
            {!user && !loading &&
            <div>
                <span>
                    <Button onClick={() => setShowLogInModal(true)}>Log In</Button> to view devices
                </span>
            </div>
            }
        </div>
    )
}