import React, { useCallback, useContext, useState } from 'react';
import { Modal, Button, Row } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { TextRow } from '../Form/TextRow';
import { validateLogin } from '../../Slices/LogIn/validators';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { getJWTUser } from '../../infrastructure/login/sessions';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { LogInModalContext } from '../../infrastructure/contexts/LogInModalContext';
import { logIn, createAccount } from '../../Slices/LogIn/actions';

export const LogInModal = () => {

    const {user, setUser} = useContext(UserContext);
    const {showLogInModal, setShowLogInModal} = useContext(LogInModalContext);
    const [creating, setCreating] = useState(false);

    const handleLogin = useCallback((values, {setSubmitting, resetForm, setFieldError}) => {
        return logIn(values).then(async (res) => {
            
            if (!res.ok) {
                throw new Error('Invalid username or password');
            }

            const body = await res.json();
            console.log(body);
            const jwt = body.token;
            Cookies.set('compost-jwt', jwt);
            const newUser = await getJWTUser(jwt);
            console.log(newUser);

            setUser(body);
            setShowLogInModal(false);
            resetForm();
        }).catch((e) => {
            console.log(e);
            setFieldError('password', e.message)
        }).finally(() => {
            setSubmitting(false);
        })
    })

    const handleCreateAccount = useCallback((values, {setSubmitting, resetForm, setFieldError}) => {
        return createAccount(values).then(async (res) => {
            
            if (!res.ok) {
                if (res.status === 409) throw new Error('This user already exists');
                throw new Error('Error creating account');
            }

            const body = await res.json();
            console.log(body);
            const jwt = body.token;
            Cookies.set('compost-jwt', jwt);
            const newUser = await getJWTUser(jwt);
            console.log(newUser);

            setUser(body);
            setShowLogInModal(false);
            resetForm();
        }).catch((e) => {
            console.log(e);
            setFieldError('password', e.message)
        }).finally(() => {
            setSubmitting(false);
        })
    })

    const handleCloseModal = useCallback(() => {
        setShowLogInModal(false);
        setCreating(false);
    })

    return (
        <Formik
            initialValues={{username: '', password: ''}}
            onSubmit={creating ? handleCreateAccount : handleLogin}
            validate={validateLogin}
        >
            {({isSubmitting, submitForm}) => {return(
                <Modal show={showLogInModal} onHide={() => handleCloseModal()} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {creating ? 'Create Account' : 'Log In'}
                        </Modal.Title>
                        
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <TextRow name='username' label='Email: ' />
                            <TextRow name='password' type='password' label='Password: ' />
                            
                            <small>
                                {!creating ? 
                                <span>
                                    Don't have an account yet? <Link onClick={() => setCreating(true)}>Create one</Link>
                                </span>
                                :
                                <span>
                                    Already have an account? <Link onClick={() => setCreating(false)}>Log In</Link>
                                </span>}
                            </small>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => handleCloseModal()} variant='secondary' className='pull-left'>
                                Close
                            </Button>
                            <Button type='submit' disabled={isSubmitting}>
                                {creating ? 'Create Account' : 'Log In'} {isSubmitting && <FontAwesomeIcon icon={faSpinner} className='fa-spin' />}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>)}}
        </Formik>
    )
}