import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Rank from "./pages/Rank";
import SideBets from "./pages/SideBets";
import { useState } from "react";

function App() {
    const [isConnected, setIsConnected] = useState(false);
    return (
        <div className="App">
            <Router>
                <Navbar isConnected={isConnected} setIsConnected={setIsConnected}/>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/games" component={window.USER_ID ? Games : Home}></Route> 
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
