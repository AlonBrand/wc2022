import { useState } from "react";
import "./GameTab.css";
import { flagsPaths } from "../constants/games";
import ReactCountryFlag from "react-country-flag"

export const GameTab = ({ id, teamA, teamB, date, info }) => {
    const [scoreA, setScoreA] = useState();
    const [scoreB, setScoreB] = useState();
    const [adminCounter, setAdminCounter] = useState(0);
    const isAvailableGame = new Date() - date < 0;
    // const isAvailableGame = false;

    const betOnGame = async () => {
        let msg = "Server received your bet, good luck!!!"
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId: id, teamA: teamA, teamB: teamB, scoreA: scoreA, scoreB: scoreB, userId: window.USER_ID }),
        };
        try {
            let response = await fetch("http://127.0.0.1:5000/games/bet-on-game", requestOptions);
            // let response = await fetch("https://alon-wc22.herokuapp.com/games/bet-on-game", requestOptions);
            let response_data = response.json()
            .then((data) => console.log(data));
            // updateConnectedUserName(`Hi, ${response_data?.msg}`)
        } catch (e) {
            msg = "Faild to send bet, please try again"
        }
        document.getElementById("response-placeholder").innerText = msg;
    }

    const betRealScore = async () => {
        setAdminCounter(0);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId: id, teamA: teamA, teamB: teamB, scoreA: scoreA, scoreB: scoreB, userId: window.USER_ID}),
        };
        try {
            let response = await fetch("http://127.0.0.1:5000/games/bet-real-score", requestOptions);
            // let response = await fetch("https://alon-wc22.herokuapp.com/games/bet-on-game", requestOptions);
            let response_data = response.json()
            .then((data) => console.log(data));
            // updateConnectedUserName(`Hi, ${response_data?.msg}`)
        } catch (e) {
            console.log(e);
        }
        // document.getElementById("response-placeholder").innerText = msg;
    }
    
    const validateInput = () => {
        if(scoreA === undefined || scoreB === undefined || scoreA < 0 || scoreB < 0) return true;
        return false;
    }
    const getFlagIcon = () => {
        return  (
            <>
                <div 
                    style={{
                        "display":"flex",
                        "flexDirection":"row",
                        "justifyContent":"space-around",
                        "paddingTop": "15px"
                    }}
                >
                    <div style={{"justifyContent": "center", "verticalAlign": "center"}}>
                        <ReactCountryFlag
                            countryCode={flagsPaths[teamA]}
                            svg
                            style={{
                                width: '2em',
                                height: '2em',
                            }}
                            title={teamA}
                        />
                        <h4 style={{"paddingTop": "5px"}}>{teamA}</h4>
                    </div>
                        <h3 onClick={increaseAdminCount} style={{"paddingTop":"15px","textAlign":"center"}}>VS</h3>
                    
                    <div>
                    <ReactCountryFlag
                            countryCode={flagsPaths[teamB]}
                            svg
                            style={{
                                width: '2em',
                                height: '2em',
                            }}
                            title={teamB}
                        />
                        <h4 style={{"paddingTop": "5px"}}>{teamB}</h4>
                    </div>
                </div>
            </>
        )
    }
    
    const getDateTime = () => {
        return  (
            <>
               <div 
                    style={{
                        "display":"flex",
                        "flexDirection":"row",
                        "justifyContent":"space-evenly",
                        "paddingTop": "20px"
                    }}
                >
                    <div>
                        {date?.toLocaleDateString("he-IL")}
                    </div>
                    <div>
                        {date?.toLocaleTimeString("he-IL")}
                    </div>
                </div>
            </>
        )
    }

    const increaseAdminCount = () => {
        setAdminCounter((prevCounter) => prevCounter+1);
    }
    const getScoreGameEnd = () => {
        return  (
            <>
               <div 
                    style={{
                        "display":"flex",
                        "flexDirection":"row",
                        "justifyContent":"space-evenly",
                        "paddingTop": "20px"
                    }}
                >
                    <h3>
                        0
                    </h3>
                    <h3 style={{fontStyle:"bold"}}>
                        3
                    </h3>
                </div>
            </>
        )

    }

    return (
            <div className="game-tab-container" style={{marginBottom: "30px"}}>       
                {!isAvailableGame ? 
                    <div id="game-tab-overlay"
                        style={{
                            "display": "block"
                        }}
                    >
                        {getFlagIcon()}
                        <br></br>
                        {getDateTime()}
                        {/* <br></br> */}
                        {getScoreGameEnd()}
                        <br></br>
                        {
                            info !== undefined && 
                            <br></br> &&
                            <p>{info}</p>

                        }
                        <br></br>
                        <h3 style={{paddingBottom: "15px"}}>Game Finished!</h3> 
                    </div> 
                :
                 <>
                    {getFlagIcon()}
                    <br></br>
                    {getDateTime()}
                    <br></br>
                    {
                        info !== undefined && 
                        <br></br> &&
                        <p>{info}</p>

                    }
                    <br></br>
                        <form onSubmit={(e) => {e.preventDefault(); betOnGame()}}>
                            <div className="bet-line">
                                <input id="left-bet" style={{height: "30px", textAlign: "center"}} type="number" placeholder={teamA} onChange={(e)=>setScoreA(e.target.value)}></input>
                                <input id="right-bet" style={{height: "30px", textAlign: "center"}} type="number" placeholder={teamB} onChange={(e)=>setScoreB(e.target.value)}></input>
                            </div>
                            <br></br>
                            <input id="bet-button" className="bet-button" type="submit" value={'Bet'} disabled={validateInput()}></input>
                        </form>
                    <div id={"response-placeholder"} style={{"paddingTop": "10px"}}></div>
                 </>
                }
                {adminCounter >= 7 && 
                    <form onSubmit={(e) => {e.preventDefault(); betRealScore()}} style={{marginTop: "20px"}}>
                        <div className="bet-line">
                            <input id="left-bet" style={{height: "30px", textAlign: "center"}} type="number" placeholder={teamA} onChange={(e)=>setScoreA(e.target.value)}></input>
                            <input id="right-bet" style={{height: "30px", textAlign: "center"}} type="number" placeholder={teamB} onChange={(e)=>setScoreB(e.target.value)}></input>
                        </div>
                        <br></br>
                        <input id="bet-button" className="bet-button" type="submit" value={'Bet'} disabled={validateInput()}></input>
                    </form>
                }
                {!isAvailableGame && <h3 style={{padding: "10px", marginBottom: "20px"}}>Game is not available!</h3>}
                <div id={"response-placeholder"} style={{"paddingTop": "10px"}}></div>
        </div>
    )
}
