import React from "react";
import './Sidebar.css';
import Accordion from "react-bootstrap/Accordion";
import Form from 'react-bootstrap/Form';

function Sidebar() {
    return (
        <div className="sidebar-container">
            <h2 style={{margin: "0 auto 0 auto", padding: "0 0 0.5rem 0"}}>Filter</h2>
            <Accordion>
                <Accordion.Item eventKey="0">
                <Accordion.Header><h5 style={{margin: "0"}}>Test Datetime</h5></Accordion.Header>
                    <Accordion.Body>
                        <p style={{margin: "0", padding: "0 0 0.5rem 0"}}>Start</p>
                        <input type="datetime-local"/>
                        <p style={{margin: "0", padding: "1rem 0 0.5rem 0"}}>End</p>
                        <input type="datetime-local"/>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                <Accordion.Header><h5 style={{margin: "0"}}>Cell</h5></Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`C1`}/>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`C2`}/>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`C3`}/>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`C4`}/>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default Sidebar;