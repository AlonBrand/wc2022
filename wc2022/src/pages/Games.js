import React from 'react';
import "../App.css";

function Games() {
  const dummyData = [
    {
      id: 1,
      teams: "Argentina - Usa",
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
      <table className='table-games'>
        <tbody> 
          <tr className='table-row-games'>
            <th className='table-row-cell'>Game</th>
            <th className='table-row-cell'>Teams</th>
            <th className='table-row-cell'>Date</th>
            <th className='table-row-cell'>Information</th>
          </tr>
        {
          dummyData && dummyData.map((game) => {
            return(
              <tr className='table-row-games' key={game.id}>
                <td className='table-row-cell'>{game.id}</td>
                <td className='table-row-cell'>{game.teams}</td>
                <td className='table-row-cell'>{game.date}</td>
                <td className='table-row-cell'>{game.info}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
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