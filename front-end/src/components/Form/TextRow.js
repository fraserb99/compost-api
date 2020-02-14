import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import './input.scss';

export const TextRow = (props) => (
    <Row noGutters className='input-group'>
        {props.label && 
            <Col lg={3} md={4} >
                {props.label}
            </Col>
        }
        <Col lg={8} md={7} className='input-col'>
            <Field 
                type={props.type || 'text'} 
                name={props.name} 
                {...props}
            />
            <ErrorMessage name={props.name} component='small' className='invalid-input' />
        </Col>
    </Row> 
)