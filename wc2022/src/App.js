import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Rank from "./pages/Rank";
import SideBets from "./pages/SideBets";
import { useState } from "react";

function App() {
    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState(false);
    const [modalTitle, setModalTitle] = useState(false);
    const setModalContent = (modalText, modalTitle) => {
        setModalText(modalText);
        setModalTitle(modalTitle);
    }
    const onCloseModal = () => {
      setOpen(false)
    }
    const [isConnected, setIsConnected] = useState(false);
    return (
        <div className="App">
            <Router>
                <Modal open={open} onClose={onCloseModal} modalTitle={modalTitle} modalText={modalText} />
                <Navbar isConnected={isConnected} setIsConnected={setIsConnected}/>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/games" children={window.USER_ID ? <Games setModalContent={setModalContent} setOpen={setOpen} modalState={open} onCloseModal={onCloseModal}/> : <Home/> }></Route> 
                    <Route path="/table" component={window.USER_ID ? Rank : Home}></Route> 
                    <Route path="/side-bets" component={window.USER_ID ? SideBets : Home}></Route>
                    {/* <Route path="/games" component={Games}></Route>
                    <Route path="/table" component={Rank}></Route>
                    <Route path="/side-bets" component={SideBets}></Route> */}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
