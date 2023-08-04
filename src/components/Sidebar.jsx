import React from "react";
import './Sidebar.css';
import Accordion from "react-bootstrap/Accordion";
import Form from 'react-bootstrap/Form';

function Sidebar(props) {

    return (
        <div className="sidebar-container">
            <h2 style={{margin: "0 auto 0 auto", padding: "0 0 0.5rem 0"}}>Filter</h2>
            <Accordion>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><h5 style={{margin: "0"}}>Cell</h5></Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {props.filterSpecs.cell && props.filterSpecs.cell.map((label)=><Form.Check type={'checkbox'} id={`default-checkbox`} label={label}/>)}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default Sidebar;