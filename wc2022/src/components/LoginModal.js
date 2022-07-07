import React from 'react';
import Modal from "react-modal";

export default function LoginModal({modalIsOpen, closeModal, handleSubmit}) {
    const customStyles = {
        content: {
            position: "absolute",   
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderStyle: "double",
            padding: "7px 7px 7px 7px",
            border: "1px"
        },
    };

    const inputStyle = {
        border: "1px solid black",
        marginBottom: "10px"
    }
    
    const submitStyle = {
        height: "50px",
        width: "100px",
    }

    return(
        <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className="modal-wrapper">
                {/* <button onClick={closeModal}>close</button> */}
                <form onSubmit={handleSubmit}>
                    <label htmlFor={"nName"}>Nick name</label><br/>
                    <input style={inputStyle} type={"text"} name={"nName"}/><br/>
                    <label htmlFor={"email"}>Email</label><br/>
                    <input style={inputStyle} type={"email"} name={"email"}/><br/>
                    <div className='submitWrapper'>
                        <input style={submitStyle} type={"submit"} value={"Register"}/>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
