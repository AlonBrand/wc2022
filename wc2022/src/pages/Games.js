import React, { useEffect, useState } from 'react';
import "../App.css";
import { GameTab } from '../components/GameTab';
import { games } from '../constants/games';
import fifaLogo from "../images/fifa-logo.svg"


function Games(prop) {
  const {setModalContent, setOpen, modalState} = prop;
  const [reFetch, setReFetch] = useState('');
  // const [userBets, setUserBets] = useState();
  const [showOldGames, setShowOldGames] = useState(false);
  const [bets, setBets] = useState();
  const [realGames, setRealGames] = useState();
  
  useEffect(() => {
      const getUserBets = () => {
          try{
                const tempBets = [];
                const tempGames = [];
                fetch(`https://alon-wc22.herokuapp.com/userBets/${window.USER_ID}`)
                // fetch(`http://127.0.0.1:5000/userBets/${window.USER_ID}`)
                .then((response) => response.json()
                .then((data) => {
                  // const sortedData = data?.userBets?.sort((a, b)=>a[2] - b[2]);
                    for(let bet of data?.userBets) {
                      if(Array.isArray(bet) && bet?.length >= 4) {
                        const object = Object.assign({id: bet[2], value: `Current bet: ${bet[3]} - ${bet[4]}`, scoreA: bet[3], scoreB: bet[4]})
                        tempBets.push(object);
                    }
                  }

                  for(let game of data?.games) {
                    if(Array.isArray(game) && game?.length >= 4) {
                      tempGames.push({
                        id: game[0],
                        scoreA: game[3],
                        scoreB: game[4],
                      })
                    }
                  }
                  setBets(tempBets);
                  setRealGames(tempGames);
              }))
          } catch(e) {
              console.log(e)
          }
      }
      getUserBets();
  }, [reFetch]);

  const toggleShowOldMatches = () => setShowOldGames((prevShow)=>!prevShow)
  
  const getGamesContent = () => {
    return (
      <>
        {
          Object.values(games)?.map((game, index) => {
            const curr_data = new Date()
            if((curr_data > game.date && (curr_data.getDay() > game.date.getDay())) && !showOldGames) return;
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
                    bets={bets}
                    realGames={realGames}
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
      <div className="game-tab-container" style={{marginBottom: "30px", padding: "10px", fontWeight: "bold"}} onClick={toggleShowOldMatches}> 
        {showOldGames ? 'Hide Old Matches' : 'Reveal Old Matches'}
      </div> 
        {games !== undefined && getGamesContent()}
      </div>
    </>
  )
}

export default Games