import React, { useEffect, useState } from 'react';
import "../App.css";
import { GameTab } from '../components/GameTab';
import { games } from '../constants/games';
import fifaLogo from "../images/fifa-logo.svg"

function Games() {

  const getGamesContent = () => {
    return (
      <>
        {
          Object.values(games)?.map((game) => {
            return(
                <GameTab key={game.id} id={game.id} teamA={game.teamA} teamB={game.teamB} date={game.date} info={game.info}/>
            )
          })
        }
      </>
    )
  }

  return (
    <>
      <div>
        <img src={fifaLogo}/>
      </div>
      <h2 className='pageTitle' style={{padding: "45px" }}>Matches</h2>
      <div className='games'>
        {games !== undefined && getGamesContent()}
      </div>
    </>
  )
}

export default Games