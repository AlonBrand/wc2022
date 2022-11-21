import React, { useEffect, useState } from 'react';
import "../App.css";
import { GameTab } from '../components/GameTab';
import { games } from '../constants/games';
import fifaLogo from "../images/fifa-logo.svg"


function Games(prop) {
  const {setModalContent, setOpen, modalState} = prop;
  const [reFetch, setReFetch] = useState('');
  const [userBets, setUserBets] = useState();
  
  useEffect(() => {
      const getUserBets = () => {
          try{
                  fetch(`https://alon-wc22.herokuapp.com/userBets/${window.USER_ID}`)
                  // fetch(`http://127.0.0.1:5000/userBets/${window.USER_ID}`)
                  .then((response) => response.json()
                  .then((data) => {
                    const sortedData = data?.userBets?.sort((a, b)=>a[2] - b[2]);
                    setUserBets(sortedData);
                    //   for(let bet of data?.userBets) {
                    //     if(Array.isArray(bet) && bet?.length >= 4) {
                    //       document.getElementById(`your-bet-placeholder-${bet[2]}`).innerText = `Your current bet is: ${bet[3]} - ${bet[4]}`;
                    //       document.getElementById(`your-bet-placeholder-${bet[2]}`).display = 'block';
                    //   }
                    // }
              }))
          } catch(e) {
              console.log(e)
          }
      }
      getUserBets();
  }, [reFetch]);


  
  const getGamesContent = () => {
    return (
      <>
        {
          Object.values(games)?.map((game, index) => {
            return(
                <GameTab 
                    key={game.id} 
                    id={game.id} 
                    teamA={game.teamA} 
                    teamB={game.teamB} 
                    date={game.date} 
                    info={game.info} 
                    setModalContent={setModalContent} 
                    setModalOpen={setOpen}
                    setReFetch={setReFetch}
                    serverScoreA={userBets !== undefined && userBets[index] !== undefined && Array.isArray(userBets[index]) && userBets[index]?.length > 4 ? userBets[index][3] : undefined}
                    serverScoreB={userBets !== undefined && userBets[index] !== undefined && Array.isArray(userBets[index]) && userBets[index]?.length > 4 ? userBets[index][4] : undefined}
                />
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
      <h2 className='pageTitle' style={{padding: "20px" }}>Matches</h2>
      <div className='games'>
        {games !== undefined && getGamesContent()}
      </div>
    </>
  )
}

export default Games