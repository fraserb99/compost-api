import React from 'react';
import { Col, Button, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextRow } from '../../components/Form/TextRow';
import { validateLogin, validateNewAccount } from './validators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const LogInForm = ({isSubmitting, newAccount, handleSubmit, ...props}) => {return(
    <Formik
        initialValues={{username: '', password: ''}}
        validate={newAccount ? validateNewAccount : validateLogin}
        onSubmit={handleSubmit}
    >
        {({ isSubmitting }) => <Row className='justify-content-md-center login-form' >
            <Col xl={8} lg={12} className='login-window'>
                <Form>
                    <h2>{newAccount ? 'Create Account' : 'Log In' }</h2>
                    <TextRow name='username' label='Username:' placeholder='Enter username' />
                    {newAccount && <TextRow name='email' label='Email:' placeholder='Enter email' required defaultValue='' />}
                    <TextRow type='password' name='password' label='Password:' placeholder='Enter password' />
                    <Row className='justify-content-md-center submit-row' >
                        <Button type='submit' disabled={isSubmitting}>
                            {newAccount ? 'Create Account' : 'Log In'} {isSubmitting && <FontAwesomeIcon icon={faSpinner} className='fa-spin' />}
                        </Button>
                    </Row>
                </Form>
                    <small className='login-links'>
                        {newAccount ? 
                            <Link to='/login'>Log In</Link> 
                            :
                            <Link to='/createaccount'>Create Account</Link> 
                        }
                        {' '}| <Link to='forgotpassword'>Forgotten Password?</Link>
                    </small>
            </Col>
        </Row>}
    </Formik>
)}

export default LogInForm;