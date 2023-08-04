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
                <Accordion.Item eventKey="2">
                    <Accordion.Header><h5 style={{margin: "0"}}>Vehicle ID</h5></Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`Vehicle A`}/>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`Vehicle B`}/>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`Vehicle C`}/>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`Vehicle D`}/>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header><h5 style={{margin: "0"}}>Drive Trace</h5></Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`EU02`}/>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`US02`}/>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`US01`}/>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`WW03`}/>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header><h5 style={{margin: "0"}}>Engineer</h5></Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`Keira Francis`}/>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`Aldo Benson`}/>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`Marques Simmons`}/>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`Nikolai Pollard`}/>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header><h5 style={{margin: "0"}}>Driver</h5></Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`Brian Hanna`}/>
                            <Form.Check type={'checkbox'} id={`default-checkbox`} label={`Damien Sparks`}/>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default Sidebar;