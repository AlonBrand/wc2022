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
      info: "Test Info1"
    },
    {
      id: 2,
      teams: "Argentina - Usa",
      date: Date(),
      info: "Test Info2"
    },
    {
      id: 3,
      teams: "Argentina - Usa",
      date: Date(),
      info: "Test Info3"
    },
    {
      id: 4,
      teams: "Argentina - Usa",
      date: Date(),
      info: "Test Info4"
    }
  ]

  const getGamesContent = () => {
    return (
      <>
        {
          dummyData && dummyData.map((game) => {
            return(
              <GameTab id={game.id} teamA={game.teamA} teamB={game.teamB} date={game.date} info={game.info}/>
            )
          })
        }
      </>
      // <table className='table-games'>
      //   <tbody> 
      //     <tr className='table-row-games'>
      //       <th className='table-row-cell'>Game</th>
      //       <th className='table-row-cell'>Teams</th>
      //       <th className='table-row-cell'>Date</th>
      //       <th className='table-row-cell'>Information</th>
      //     </tr>
      //   
      //   </tbody>
      // </table>
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