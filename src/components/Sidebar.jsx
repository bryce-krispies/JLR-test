import { React, useState, useEffect } from "react";
import './Sidebar.css';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';

function Sidebar() {
    //Is the sidebar open
    const [open, setOpen] = useState(true);

    //Width of the sidebar
    const [sidebarWidth, setSidebarWidth] = useState('max-content');

    //Opens and closes the sidebar
    const toggleOpen = () => setOpen(!open);

    //Turns the arrow
    const turnStyle = {
        transform: open ? 'rotate(-180deg)' : '',
        transition: 'transform 0.5s ease',
        marginTop: '0.2rem',
        marginRight: open ? '0.1rem' : '0',
        marginLeft: open ? '0' : '0.1rem'
    };

    const sidebarWidthStyling = {
        width: open ? sidebarWidth : document.getElementById("jlrLogo").offsetWidth,
        overflow: "hidden",
        transition: 'width 0s ease',
        padding: open ? "0 1rem 0 0.75rem" : "0 0 0 0.75rem"
    };

    //Set the original sidebar width
    useEffect(() => { 
        if(sidebarWidth === 'max-content') { setSidebarWidth(document.getElementById("sidebar").offsetWidth); }
    }, [sidebarWidth]);

    /*
    <details open>
                        <summary style={{display: "flex", alignItems: "center"}}>
                            <h2>Cell</h2>
                            <KeyboardArrowDownIcon className="icon" fontSize="large"/>
                        </summary>
                        <div style={{backgroundColor: "#e8e8e8", padding: "1rem", borderRadius: "5px"}}>
                            <Form>
                                <Form.Check type={'checkbox'} id={`default-checkbox`} label={`C1`}/>
                                <Form.Check type={'checkbox'} id={`default-checkbox`} label={`C2`}/>
                                <Form.Check type={'checkbox'} id={`default-checkbox`} label={`C3`}/>
                                <Form.Check type={'checkbox'} id={`default-checkbox`} label={`C4`}/>
                            </Form>
                        </div>
                    </details>
    */

    //The main html
    return (
        <div id="sidebar" className="sidebar-container">
            <div style={sidebarWidthStyling} className="sidebar-content-container">
                <div className="header">
                    <img id="jlrLogo" src={ require("../assets/jlr-new-logo.jpg") } alt="" style={{width: "4.5rem"}}/>
                    <div className="left header-one">Filter</div>
                </div>
                <div>
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><h2>Vehicle ID</h2></Accordion.Header>
                            <Accordion.Body>
                                <div style={{backgroundColor: "#e8e8e8", padding: "1rem", borderRadius: "5px"}}>
                                    <Form>
                                        <Form.Check type={'checkbox'} id={`default-checkbox`} label={`C1`}/>
                                        <Form.Check type={'checkbox'} id={`default-checkbox`} label={`C2`}/>
                                        <Form.Check type={'checkbox'} id={`default-checkbox`} label={`C3`}/>
                                        <Form.Check type={'checkbox'} id={`default-checkbox`} label={`C4`}/>
                                    </Form>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <button>Filter</button>
            </div>
            <div className="button-container">
                <button className="collapse-btn" onClick={toggleOpen}>
                    <ArrowForwardIosRoundedIcon style={turnStyle}/>
                </button>
            </div>          
        </div>
    )
}

export default Sidebar;