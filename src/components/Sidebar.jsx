import { React, useState, useEffect } from "react";
import './Sidebar.css';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar() {
    //Is the sidebar open
    const [open, setopen] = useState(true);

    //Width of the sidebar
    const [sideBarWidth, setSideBarWidth] = useState('max-content');

    //Opens and closes the sidebar
    const toggleOpen = () => {
        setopen(!open)
    }

    //Turns the arrow
    const turnStyle = {
        transform: open ? 'rotate(-180deg)' : '',
        transition: 'transform 0.5s ease'
    }

    //Changes the sidebar width when opened/closed
    const sidebarOpen = {

        width: open ? sideBarWidth: document.getElementById("tektelicLogoAdmin").offsetWidth,
        overflow: "hidden",
        transition: 'width 0.5s ease',
        
    }

    //Set the original sidebar width
    useEffect(() => { 
        if(sideBarWidth === 'max-content')
            setSideBarWidth(document.getElementById("navBarAdmin").offsetWidth)
    });

    const [user, setData] = useState("");

    //The main html
    return (
        <div id="navBarAdmin" className="navigation-admin">
            <div style={sidebarOpen}>
                <div className="expanded-header-container">
                    <img style={{paddingRight:'0.2rem'}} id="tektelicLogoAdmin" src={ require("../assets/tektelic-logo.png") }></img>
                    <div className="left header-one">Clarity</div>
                </div>
            </div>
            <div className="button-container">
                <button className="navigation-button" onClick={toggleOpen}>
                    <ArrowForwardIosRoundedIcon style={turnStyle}/>
                </button>
            </div>          
            <div className="account-container" style = {sidebarOpen}>
                <div className="same-line" id="bottom-width-admin">
                    {/* TODO: fix link */}
                    <AccountCircleIcon id="user-icon" sx={{ fontSize: 40}} />
                    <span className="bottom-text">{user.firstname} {user.lastname}<br/><span className="role-text">{user.role}</span></span>
                    <LogoutIcon className="logout-button"></LogoutIcon>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;