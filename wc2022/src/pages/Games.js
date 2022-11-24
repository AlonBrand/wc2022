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
  
  useEffect(() => {
      const getUserBets = () => {
          try{
                window.BETS = [];
                window.GAMES = [];
                // fetch(`https://alon-wc22.herokuapp.com/userBets/${window.USER_ID}`)
                fetch(`http://127.0.0.1:5000/userBets/${window.USER_ID}`)
                .then((response) => response.json()
                .then((data) => {
                  // const sortedData = data?.userBets?.sort((a, b)=>a[2] - b[2]);
                    for(let bet of data?.userBets) {
                      if(Array.isArray(bet) && bet?.length >= 4) {
                        const object = Object.assign({id: bet[2], value: `Your current bet: ${bet[3]} - ${bet[4]}`})
                        window.BETS.push(object);
                        // const element = document.getElementById(`your-bet-placeholder-${bet[2]}`);
                        // if (element) {
                        //   element.innerText = `Your current bet is: ${bet[3]} - ${bet[4]}`;
                        //   element.display = 'block';
                        // }
                    }
                  }
                  for(let game of data?.games) {
                    if(Array.isArray(game) && game?.length >= 4) {
                      window.GAMES.push({
                        id: game[0],
                        scoreA: game[3],
                        scoreB: game[4],
                      })
                    }
                  }
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
            // console.log(game.date)
            // console.log(game.date.getDate())
            if(new Date() > game.date && !showOldGames) return;
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
                    // serverScoreA={userBets !== undefined && userBets[index] !== undefined && Array.isArray(userBets[index]) && userBets[index]?.length > 4 ? userBets[index][3] : undefined}
                    // serverScoreB={userBets !== undefined && userBets[index] !== undefined && Array.isArray(userBets[index]) && userBets[index]?.length > 4 ? userBets[index][4] : undefined}
                    // serverGameID={userBets !== undefined && userBets[index] !== undefined && Array.isArray(userBets[index]) && userBets[index]?.length > 4 ? userBets[i][2] : undefined}
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