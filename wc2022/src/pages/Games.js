import React from 'react';
import "../App.css";
import { GameTab } from '../components/GameTab';

function Games() {
  const dummyData = [
    {
      id: 1,
      teamA: "Argentina",
      teamB: "Usa",
      date: Date(),
      // info: "Test Info1"
    },
    {
      id: 2,
      teamA: "Iran",
      teamB: "Mexico",
      date: Date(),
      // info: "Test Info1"
    },
    {
      id: 3,
      teams: "Argentina - Usa",
      date: Date(),
      // info: "Test Info3"
    },
    {
      id: 4,
      teams: "Argentina - Usa",
      date: Date(),
      // info: "Test Info4"
    }
  ]

  const getGamesContent = () => {
    return (
      <>
        {
          dummyData && dummyData.map((game) => {
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
        {getGamesContent()}
      </div>
    </>
  )
}

export default Games