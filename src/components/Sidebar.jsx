import { React, useState, useEffect } from "react";
import './Sidebar.css';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

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
        transition: 'transform 0.5s ease'
    };

    const sidebarWidthStyling = {
        width: open ? sidebarWidth : document.getElementById("jlrLogo").offsetWidth,
        overflow: "hidden",
        transition: 'width 0s ease',
        padding: open ? "0 0.75rem 0 0.75rem" : "0 0 0 0.75rem"
    };

    //Set the original sidebar width
    useEffect(() => { 
        if(sidebarWidth === 'max-content') { setSidebarWidth(document.getElementById("sidebar").offsetWidth); }
    });

    //The main html
    return (
        <div id="sidebar" className="navigation-admin">
            <div style={sidebarWidthStyling}>
                <div className="expanded-header-container">
                    <img id="jlrLogo" src={ require("../assets/jlr-new-logo.jpg") }></img>
                    <div className="left header-one">Filter</div>
                </div>
                {open && <h1>Jaguar Land Rover</h1>}
            </div>
            <div className="button-container">
                <button className="navigation-button" onClick={toggleOpen}>
                    <ArrowForwardIosRoundedIcon style={turnStyle}/>
                </button>
            </div>          
        </div>
    )
}

export default Sidebar;