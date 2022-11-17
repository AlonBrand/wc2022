import React, { useEffect, useState } from 'react';
import { flagsPaths, games } from '../constants/games';
import fifaLogo from "../images/fifa-logo.svg"
import ReactCountryFlag from "react-country-flag"
import "../App.css";

function Home() {
  const [isEmptyDay, setIsEmptyDay] = useState(true);
  const [winningTeam, setWinningTeam] = useState()
  const [topScorer, setTopScorer] = useState()

  useEffect(() => {
    const getSideBets = () => {
        try{
            if (winningTeam === undefined || topScorer === undefined) {
                // fetch("https://alon-wc22.herokuapp.com/users")
                fetch(`http://127.0.0.1:5000/get-side-bets/${window.USER_ID}`)
                .then((response) => response.json()
                .then((data) => {
                    console.log(data)
                    setWinningTeam(()=>data?.winningTeam)
                    setTopScorer(()=>data?.topScorer)
                }));
            }
        } catch(e) {
            console.log(e)
        }
    }
    getSideBets();
}, []);

  const getHomeContent = () => {
    return (
      <>
        {
          Object.values(games)?.map((game, index) => {
            if (new Date().getDate() === game?.date?.getDate()) {
              if(isEmptyDay === true) setIsEmptyDay(()=>false)
              return (
                <div key={index} className="game-tab-container" style={{ margin: "30px", width: "auto" }}>
                  <div 
                    style={{
                        "display":"flex",
                        "flexDirection":"row",
                        "justifyContent":"space-around",
                        "paddingTop": "15px",
                        "textAlign": "center"
                    }}
                >
                    <div style={{justifyContent: "center"}}>
                        <ReactCountryFlag
                            countryCode={flagsPaths[game?.teamA]}
                            svg
                            style={{
                                width: '2em',
                                height: '2em',
                            }}
                            title={game?.teamA}
                        />
                        <h4 style={{"paddingTop": "5px"}}>{game?.teamA}</h4>
                    </div>
                        <h3 style={{"paddingTop":"15px","textAlign":"center"}}>VS</h3>
                    
                    <div>
                    <ReactCountryFlag
                            countryCode={flagsPaths[game?.teamB]}
                            svg
                            style={{
                                width: '2em',
                                height: '2em',
                            }}
                            title={game?.teamB}
                        />
                        <h4 style={{"paddingTop": "5px"}}>{game?.teamB}</h4>
                    </div>
                </div>
                  <br></br>
                  {
                    getDateTime(game?.date)
                  }
                </div>
              )
            }
          })
        }
      </>
    )
  }

  const getDateTime = (date) => {
    return  (
        <>
           <div 
                style={{
                    "display":"flex",
                    "flexDirection":"row",
                    "justifyContent": "center",
                    "paddingBottom": "15px"
                }}
            >
                <div>
                    {date?.toLocaleTimeString("he-IL")}
                </div>
            </div>
        </>
    )
}
  
  return (
    <>
      {/* <h1 className='pageTitle'>World Cup 2022</h1> */}
      <img src={fifaLogo}/>
      {
        winningTeam !== undefined && topScorer !== undefined && window.USER_ID !== undefined &&
        <div style={{margin: "10px 0 10px 0", textAlign: "center"}}>
          <h2> Your Side Bets</h2>
          <br/>
          <h4>{`Winning Team: ${winningTeam}`}</h4>
          <br/>
          <h4>{`Top Scorer: ${topScorer}`}</h4>
        </div>
      }
      <h2 className='pageTitle' style={{padding: "20px" }}>Today's Matches</h2>
      {
        games && getHomeContent()
      }
      {
        isEmptyDay && <h3 style={{"textAlign": "center"}}>No Matches Today!</h3>
      }
    </>
  )
}

export default Home;