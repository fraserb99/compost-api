import React, { useCallback, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import LogInForm from './LogInForm';
import './login.scss';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { createAccount } from './actions';
import { getJWTUser } from '../../infrastructure/login/sessions';

const LogInPage = props => {
    const {user, setUser} = useContext(UserContext);

    const handleSubmit = useCallback(async (values, { setSubmitting, setFieldError }) => {
        createAccount(values)
            .then(async (res) => {
                const body = await res.json();
                if (!res.ok) {
                    throw new Error(body.response);
                }

                const newUser = await getJWTUser(body.jwt);
                setUser(newUser);
                props.history.push('/');
            })
            .catch((e) => {
                console.log(e);
                setFieldError('password', e.message);
            });
    });

    return (
    <div className='login-form'>
        <Col lg={{ span: 4, offset: 4 }} md={6} className='login-container'>
            <LogInForm 
                {...props} 
                newAccount
                handleSubmit={handleSubmit}
            />
        </Col>
    </div>
)}

export default LogInPage;