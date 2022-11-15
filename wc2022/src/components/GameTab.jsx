import { useState } from "react";
import "./GameTab.css";

export const GameTab = ({ id, teamA, teamB, date, info }) => {
    const [scoreA, setScoreA] = useState();
    const [scoreB, setScoreB] = useState();
    const isAvailableGame = new Date() - date < 0;

    const betOnGame = async () => {
        let msg = "Server received your bet, good luck!!!"
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId: id, teamA: teamA, teamB: teamB, scoreA: scoreA, scoreB: scoreB, userId: window.USER_ID }),
        };
        try {
            let response = await fetch("http://127.0.0.1:5000/games/bet-on-game", requestOptions);
            let response_data = response.json()
            .then((data) => console.log(data));
            // updateConnectedUserName(`Hi, ${response_data?.msg}`)
        } catch (e) {
            msg = "Faild to send bet, please try again"
        }
        document.getElementById("response-placeholder").innerText = msg;
    }
    
    const validateInput = () => {
        if(scoreA === undefined || scoreB === undefined || scoreA < 0 || scoreB < 0) return true;
        return false;
    }

    return (
        <div className="game-tab-container" style={{marginBottom: "10px"}}>
            <h2 style={{"paddingTop": "25px"}}>{teamA} X {teamB}</h2>
            <br></br>
            {date?.toString()}
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
            {!isAvailableGame && <h3 style={{padding: "10px", marginBottom: "20px"}}>Game is not available!</h3>}
            <div id={"response-placeholder"} style={{"paddingTop": "10px"}}></div>
        </div>
    )
}
