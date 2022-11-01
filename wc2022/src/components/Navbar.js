import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import LoginModal from "./LoginModal";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as AiIcons from "react-icons/ai";
import * as ImIcons from "react-icons/im";
import "./Navbar.css";

import { postSignUp, postLogIn } from "../utils/postFunctions";

function Navbar() {
    const [isConnected, setIsConnected] = useState(false);
    const [sidebar, setSideBar] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [modalTitle, setModalTitle] = useState();

    const showSideBar = () => {
        setSideBar(!sidebar);
    };

    const changeIsConnected = () => {
        setIsConnected(!isConnected);
    };

    const handleSignUp = () => {
        setModalTitle("Sign-up");
        setModalIsOpen(true);
    };

    const handleLogIn = () => {
        setModalTitle("Log-in");
        setModalIsOpen(true);
    }

    const handleDisconnect = () => {
        console.log("Trying to Disconnect...");
    };

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(modalTitle === "Sign-up"){
            postSignUp({
                name: event.target.name.value,
                password: event.target.password.value,
                updateConnectedUserName: setUserName,
                setIsConnect: changeIsConnected
            })
        } else {
            postLogIn({
                name: event.target.name.value,
                password: event.target.password.value,
                updateConnectedUserName: setUserName,
                setIsConnect: changeIsConnected
            })
        }
        closeModal();
    }

    return (
        <>
            <LoginModal 
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                handleSubmit={handleSubmit}
                title={modalTitle}
            />
            <IconContext.Provider value={{ color: "#fff" }}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSideBar} />
                    </Link>
                    <Link to="#" className="menu-bars login">
                        {isConnected ? (
                            <span className="user-name-bar" onClick={handleDisconnect}>{userName} </span>
                        ) : (
                            <>
                                <AiIcons.AiOutlinePlus className="sing-up-icon" onClick={handleSignUp} />
                                <ImIcons.ImEnter onClick={handleLogIn} />
                            </>
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
