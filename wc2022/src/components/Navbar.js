import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as AiIcons from "react-icons/ai";
import "./Navbar.css";



function Navbar() {
    const [isConnected, setIsConnected] = useState(false);
    const [sidebar, setSideBar] = useState(false);

    const showSideBar = () => {
        setSideBar(!sidebar);
    };

    const changeIsConnected = () => {
        setIsConnected(!isConnected)
    };

    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSideBar} />
                    </Link>
                    <Link to="#" className="menu-bars login" onClick={changeIsConnected}> 
                        {
                            isConnected ?
                            <FiIcons.FiUserCheck /> :
                            <FiIcons.FiUserX />
                        }
                    </Link>
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={showSideBar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>

                        {SidebarData &&
                            SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.className}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;