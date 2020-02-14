import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import './input.scss';
import { SelectField } from './SelectField';

export const SelectRow = ({label, ...props}) => (
    <Row noGutters className='input-group'>
        {label && 
            <Col lg={3} md={4} >
                {label}
            </Col>
        }
        <Col lg={8} md={7} className='input-col'>
            <Field 
                component={SelectField}
                name={props.name}
                {...props}
            />
            <ErrorMessage name={props.name} component='small' className='invalid-input' />
        </Col>
    </Row>
)