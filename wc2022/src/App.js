import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Rank from "./pages/Rank";
import { useState } from "react";

function App() {
    const [isConnected, setIsConnected] = useState(false);
    return (
        <div className="App">
            <Router>
                <Navbar isConnected={isConnected} setIsConnected={setIsConnected}/>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/games" component={Games}></Route>
                    <Route path="/table" component={Rank}></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
