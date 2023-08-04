import React from "react";
import './Sidebar.css';
import Accordion from "react-bootstrap/Accordion";
import Form from 'react-bootstrap/Form';

function Sidebar(props) {

    return (
        <div className="sidebar-container">
            <h2 style={{margin: "0 auto 0 auto", padding: "0 0 0.5rem 0"}}>Filter</h2>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><h5 style={{margin: "0"}}>Test Datetime</h5></Accordion.Header>
                    <Accordion.Body>
                        <p style={{margin: "0", padding: "0 0 0.5rem 0"}}>Start</p>
                        <input type="datetime-local" style={{width: "100%"}}/>
                        <p style={{margin: "0", padding: "1rem 0 0.5rem 0"}}>End</p>
                        <input type="datetime-local" style={{width: "100%"}}/>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><h5 style={{margin: "0"}}>Cell</h5></Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {props.filterSpecs.cell && props.filterSpecs.cell.map((label)=><Form.Check type={'checkbox'} id={`default-checkbox`} label={label}/>)}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header><h5 style={{margin: "0"}}>Vehicle ID</h5></Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {props.filterSpecs.vehicle_id && props.filterSpecs.vehicle_id.map((label)=><Form.Check type={'checkbox'} id={`default-checkbox`} label={label}/>)}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header><h5 style={{margin: "0"}}>Drive Trace</h5></Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {props.filterSpecs.drive_trace && props.filterSpecs.drive_trace.map((label)=><Form.Check type={'checkbox'} id={`default-checkbox`} label={label}/>)}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header><h5 style={{margin: "0"}}>Engineer</h5></Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {props.filterSpecs.engineer && props.filterSpecs.engineer.map((label)=><Form.Check type={'checkbox'} id={`default-checkbox`} label={label}/>)}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header><h5 style={{margin: "0"}}>Driver</h5></Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {props.filterSpecs.driver && props.filterSpecs.driver.map((label)=><Form.Check type={'checkbox'} id={`default-checkbox`} label={label}/>)}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default Sidebar;