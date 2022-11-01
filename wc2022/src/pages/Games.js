import React, { useEffect, useState } from 'react';
import "../App.css";
import { GameTab } from '../components/GameTab';
import { games } from '../constants/games';

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
      <h1 className='pageTitle'>Games</h1>
      <div className='games'>
        {games !== undefined && getGamesContent()}
      </div>
    </>
  )
}

export default Games