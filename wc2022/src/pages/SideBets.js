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
        body: JSON.stringify({ userId: window.USER_ID, winningTeam: winningTeam, topScorer: topScorer }),
    };
    try {
        // let response = await fetch("http://127.0.0.1:5000/side-bets", requestOptions);
        let response = await fetch("https://alon-wc22.herokuapp.com/side-bets", requestOptions);
        let response_data = response.json()
        .then((data) => console.log(data));
        // updateConnectedUserName(`Hi, ${response_data?.msg}`)
    } catch (e) {
        msg = "Faild to send bet, please try again"
    }
    document.getElementById("side-bets-placeholder").innerText = msg;
}

const winningTeamOptions = [
    { value: 'Brazil', label: 'Brazil' },
    { value: 'Belgium', label: 'Belgium' },
    { value: 'Argentina', label: 'Argentina' },
    { value: 'France', label: 'France' },
    { value: 'England', label: 'England' },
    { value: 'Spain', label: 'Spain' },
    { value: 'Netherlands', label: 'Netherlands' },
    { value: 'Portugal', label: 'Portugal' },
    { value: 'Denmark', label: 'Denmark' },
    { value: 'Germany', label: 'Germany' },
    { value: 'Croatia', label: 'Croatia' },
    { value: 'Mexico', label: 'Mexico' },
    { value: 'Uruguay', label: 'Uruguay' },
    { value: 'Switzerland', label: 'Switzerland' },
    { value: 'USA', label: 'USA' },
    { value: 'Senegal', label: 'Senegal' },
    { value: 'Wales', label: 'Wales' },
    { value: 'Iran', label: 'Iran' },
    { value: 'Serbia', label: 'Serbia' },
    { value: 'Morocco', label: 'Morocco' },
    { value: 'Japan', label: 'Japan' },
    { value: 'Poland', label: 'Poland' },
    { value: 'South Korea', label: 'South Korea' },
    { value: 'Costa Rica', label: 'Costa Rica' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Cameroon', label: 'Cameroon' },
    { value: 'Ecuador', label: 'Ecuador' },
    { value: 'Qatar', label: 'Qatar' },
    { value: 'Saudi Arabia', label: 'Saudi Arabia' },
    { value: 'Ghana', label: 'Ghana' },
]

const topScorerOptions = [
    { value: 'Harry Kane', label: 'Harry Kane' },
    { value: 'Kylian Mbappe', label: 'Kylian Mbappe' },
    { value: 'Karim Benzema', label: 'Karim Benzema' },
    { value: 'Lionel Messi', label: 'Lionel Messi' },
    { value: 'Neymar', label: 'Neymar' },
    { value: 'Cristiano Ronaldo', label: 'Cristiano Ronaldo' },
    { value: 'Romelu Lukaku', label: 'Romelu Lukaku' },
    { value: 'Lautaro Martinez', label: 'Lautaro Martinez' },
    { value: 'Memphis Depay', label: 'Memphis Depay' },
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
            <div style={{textAlign: "center", marginTop: "30px"}}> 
                <button id="side-bet-button" style={{marginBottom: "20px", height: "50px", width: "100px", borderRadius: "4px"}} disabled={disableSend()} onClick={betOnGame}>Send</button>
                <div id='side-bets-placeholder'></div>
            </div>
        </div>
    </div>
  )
}

export default SideBets;