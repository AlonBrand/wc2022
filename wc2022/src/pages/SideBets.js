import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import fifaLogo from "../images/fifa-logo.svg"
import "../App.css";

function SideBets() {
const [winningTeam, setWinningTeam] = useState();
const [topScorer, setTopScorrer] = useState();


const betOnGame = async () => {
    let msg = "Server received your bet, good luck!!!"
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ winningTeam: winningTeam, topScorer: topScorer }),
    };
    try {
        let response = await fetch("http://127.0.0.1:5000/side-bets", requestOptions);
        // let response = await fetch("https://alon-wc22.herokuapp.com/games/bet-on-game", requestOptions);
        let response_data = response.json()
        .then((data) => console.log(data));
        // updateConnectedUserName(`Hi, ${response_data?.msg}`)
    } catch (e) {
        msg = "Faild to send bet, please try again"
    }
    document.getElementById("side-bets-placeholder").innerText = msg;
}

const winningTeamOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const topScorerOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const handleWinningTeam = (e) => {
    setWinningTeam(()=>e?.label)
}

const handleTopScorer = (e) => {
    setTopScorrer(()=>e?.label)
}


const disableSend = () => winningTeam === undefined || topScorer === undefined;

return (
    <div>
        <img src={fifaLogo}/>
        <div style={{margin: "0px 20px 20px 20px"}} className="side-bets">
            <h2 style={{marginBottom: "10px"}}> Winnig Team</h2>
            <Select 
                options={winningTeamOptions} 
                onChange={(e) => handleWinningTeam(e)}
            />
            <h2 style={{marginBottom: "10px", marginTop: "20px"}}>Top Scorer</h2>
            <Select 
                options={topScorerOptions} 
                onChange={(e) => handleTopScorer(e)}
            />
            <button disabled={disableSend()} onClick={betOnGame}>Send</button>
            <div id='side-bets-placeholder'></div>
        </div>
    </div>
  )
}

export default SideBets;