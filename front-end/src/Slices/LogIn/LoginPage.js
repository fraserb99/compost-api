import React, { useContext, useCallback } from 'react';
import { Col, Row } from 'react-bootstrap';
import LogInForm from './LogInForm';
import './login.scss';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import Cookies from 'js-cookie';
import { getJWTUser } from '../../infrastructure/login/sessions';
import { logIn } from './actions';


const LogInPage = props => {
    const {user, setUser} = useContext(UserContext);
    const handleSubmit = useCallback(async (values, { setSubmitting, setFieldError }) => {
        try {
            setSubmitting(true);
            const response = await logIn(values);

            if (!response.ok) {
                throw new Error('Error');
            }

            const body = await response.json();
            const jwt = body.jwt;
            const newUser = await getJWTUser(jwt);

            setUser(newUser);
            Cookies.set('compost-jwt', jwt);
            props.history.push('/');
        } catch (error) {
            console.log(error);
            setFieldError('password', 'Incorrect username or password');
        } finally {
            setSubmitting(false);
        }
    });

    return (
    <div className='login-form'>
        <Col lg={{ span: 4, offset: 4 }} md={6} className='login-container'>
            <LogInForm {...props} handleSubmit={handleSubmit} />
        </Col>
    </div>)
}

export default LogInPage;