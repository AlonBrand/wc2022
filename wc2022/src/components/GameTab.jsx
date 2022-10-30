import "./GameTab.css";

export const GameTab = ({ teamA, teamB, date, info }) => {
    const betOnGame = ({ teamA, teamB, date, info }) => {
        console.log(teamA)
        console.log(teamB)
        console.log(date)
        console.log(info)
    }

    return (
        <div className="game-tab-container" onClick={(e)=>betOnGame({ teamA, teamB, date, info })}>
            <h1>{teamA} X {teamB}</h1>
            <br></br>
            <p>{date}</p>
            <br></br>
            <p>{info}</p>
        </div>
    )
}
