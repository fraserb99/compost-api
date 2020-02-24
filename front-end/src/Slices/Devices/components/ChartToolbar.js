import React, { useState } from 'react';
import { Tabs, Dropdown, ButtonGroup, ToggleButtonGroup, ButtonToolbar, ToggleButton, Tab } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';


export const ChartToolbar = 
    ({
        res, 
        setRes,
        startDate,
        setStartDate,
        endDate,
        setEndDate
    }) => {
    
    const [dateTab, setDateTab] = useState('start');

    return (
        <div className='chart-options-toolbar'>
                    <ButtonToolbar>
                        <ToggleButtonGroup 
                            size='sm' 
                            name='options' 
                            defaultValue={res}
                            className='mr-2'
                            onChange={(value) => setRes(value)}
                        >
                            <ToggleButton value={5} variant='outline-primary'>5 mins</ToggleButton>
                            <ToggleButton value={30} variant='outline-primary'>30 mins</ToggleButton>
                            <ToggleButton value={60} variant='outline-primary'>hourly</ToggleButton>
                        </ToggleButtonGroup>

                        <ButtonGroup>
                            <Dropdown drop='left'>
                                <Dropdown.Toggle variant='outline-primary' size='sm'>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                    &nbsp; Select Dates
                                </Dropdown.Toggle>
                                
                                <Dropdown.Menu>
                                    <Tabs activeKey={dateTab} onSelect={(k) => setDateTab(k)}>
                                        <Tab title='Start' eventKey='start'>
                                            <DatePicker
                                                selectsStart
                                                startDate={startDate}
                                                endDate={endDate}
                                                inline
                                                maxDate={endDate || new Date()}
                                                onChange={(d) => {
                                                    setStartDate(d);
                                                    setDateTab('end')
                                                }}
                                            />
                                        </Tab>
                                        <Tab title='End' eventKey='end'>
                                            <DatePicker
                                                selectsEnd
                                                startDate={startDate}
                                                endDate={endDate}
                                                inline
                                                minDate={startDate}
                                                maxDate={new Date()}
                                                onChange={(d) => setEndDate(d)}
                                            />
                                        </Tab>
                                    </Tabs>
                                    <span className='apply-row'>
                                        <small>
                                            {startDate && moment(startDate).format('DD/MM/YYYY')} - {endDate && moment(endDate).format('DD/MM/YYYY')}
                                        </small>
                                    </span>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
    )
}