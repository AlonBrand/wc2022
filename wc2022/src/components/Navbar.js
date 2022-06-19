import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import LoginModal from "./LoginModal";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as AiIcons from "react-icons/ai";
import "./Navbar.css";

function Navbar() {
    const [isConnected, setIsConnected] = useState(false);
    const [sidebar, setSideBar] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const showSideBar = () => {
        setSideBar(!sidebar);
    };

    const changeIsConnected = () => {
        setIsConnected(!isConnected);
    };

    const handleConnect = () => {
        console.log("Trying to connect...");
        setModalIsOpen(true);
    };

    const handleDisconnect = () => {
        console.log("Trying to Disconnect...");
    };

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nickName = event.target.nName.value;
        const email = event.target.email.value;
        closeModal();
    }

    return (
        <>
            <LoginModal 
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                handleSubmit={handleSubmit}
            />
            <IconContext.Provider value={{ color: "#fff" }}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSideBar} />
                    </Link>
                    <Link to="#" className="menu-bars login" onClick={changeIsConnected}>
                        {isConnected ? (
                            <FiIcons.FiUserCheck onClick={handleDisconnect} />
                        ) : (
                            <FiIcons.FiUserX onClick={handleConnect} />
                        )}
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
                            })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
