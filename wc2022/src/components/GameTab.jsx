import { useState } from "react";
import "./GameTab.css";

export const GameTab = ({ id, teamA, teamB, date, info }) => {
    const [scoreA, setScoreA] = useState();
    const [scoreB, setScoreB] = useState();

    const betOnGame = ({ teamA, teamB}) => {
        // const scoreA = document.getElementById("left-bet")?.value;
        // const scoreB = document.getElementById("right-bet")?.value;
        console.log(teamA)
        console.log(teamB)
        console.log(scoreA)
        console.log(scoreB)
    }
    
    const validateInput = () => {
        if(scoreA === undefined || scoreB === undefined || scoreA < 0 || scoreB < 0) return true;
        return false;
    }

    return (
        <div className="game-tab-container" >
            <h2>{teamA} X {teamB}</h2>
            <br></br>
            <p>{date}</p>
            {
                info !== undefined && 
                <br></br> &&
                <p>{info}</p>

            }
            <br></br>
            <form onSubmit={(e) => {e.preventDefault(); betOnGame({teamA, teamB})}}>
                <div className="bet-line">
                    <input id="left-bet" type="number" placeholder={teamA} onChange={(e)=>setScoreA(e.target.value)}></input>
                    <input id="right-bet" type="number" placeholder={teamB} onChange={(e)=>setScoreB(e.target.value)}></input>
                </div>
                <br></br>
                <input id="bet-button" type="submit" value={'Bet'} disabled={validateInput()}></input>
            </form>
        </div>
    )
}
