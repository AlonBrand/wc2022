import React, { useEffect, useState } from 'react';
import "../App.css";
import { GameTab } from '../components/GameTab';
import { games, eighthGames, quarterGames } from '../constants/games';
import fifaLogo from "../images/fifa-logo.svg"


function Games(prop) {
  const {setModalContent, setOpen, modalState} = prop;
  const [reFetch, setReFetch] = useState('');
  // const [userBets, setUserBets] = useState();
  const [showGroupGames, setShowGroupGames] = useState(false);
  const [showEighthGames, setShowEightGames] = useState(false);
  const [showQuarterGames, setShowQuarterGames] = useState(true);
  const [bets, setBets] = useState();
  const [realGames, setRealGames] = useState();
  
  useEffect(() => {
      const getUserBets = () => {
          try{
                const tempBets = [];
                const tempGames = [];
                fetch(`https://wc2022-server-k330-main-y62tkictza-wm.a.run.app/userBets/${window.USER_ID}`)
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

  const toggleShowGroupMatches = () => setShowGroupGames((prevShow)=>!prevShow)
  const toggleShowEighthFinal = () => setShowEightGames((prevShow)=>!prevShow)
  const toggleShowQuarterFinal = () => {
    setShowQuarterGames((prevShow)=>!prevShow)
  }
  
  const getGamesContent = (curr_games) => {
    return (
      <>
        {
          Object.values(curr_games)?.map((game, index) => {
            // const curr_date = new Date();
            // const diffTime = curr_date - game?.date;
            if(game.status === "FINISHED" && !showGroupGames) return;
            if(game.status === "Eighth" && !showEighthGames) return;
            if(game.status === "Quarter" && !showQuarterGames) return;
            // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // if((diffTime > 0 && diffTime > (1000 * 60 * 60 * 15)) && !showEighthGames) return;
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
                    status={game.status}
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
        <img src={fifaLogo} />
      </div>
      <h2 className='pageTitle' style={{ padding: "20px" }}>Matches</h2>
      <div className='games'>
        <div className="game-tab-container" style={{ marginBottom: "30px", padding: "10px", fontWeight: "bold" }} onClick={toggleShowGroupMatches}>
          {showGroupGames ? 'Hide Group Matches' : 'Reveal Group Matches'}
        </div>
        {getGamesContent(games)}
        <div className="game-tab-container" style={{ marginBottom: "30px", padding: "10px", fontWeight: "bold" }} onClick={toggleShowEighthFinal}>
          {showEighthGames ? 'Hide Eighth Final' : 'Reveal Eighth Final'}
        </div>
        {getGamesContent(eighthGames)}
        <div className="game-tab-container" style={{ marginBottom: "30px", padding: "10px", fontWeight: "bold" }} onClick={toggleShowQuarterFinal}>
          {showQuarterGames ? 'Hide Quarter Final' : 'Reveal Quarter Final'}
        </div>
        {getGamesContent(quarterGames)}
      </div>
    </>
  )
}

export default Games