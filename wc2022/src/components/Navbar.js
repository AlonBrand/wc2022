import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import Modal from "react-modal";
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

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
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
