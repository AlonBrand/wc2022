import React, { useEffect, useState } from 'react';
import { flagsPaths, games } from '../constants/games';
import fifaLogo from "../images/fifa-logo.svg"
import { GameTab } from '../components/GameTab';
import ReactCountryFlag from "react-country-flag"
import "../App.css";

function Home() {
  // const [currentRank, setCurrentRank] = useState();
  // const [currentPoints, setCurrentPoints] = useState();
  // const [liveScores, setLiveScores] = useState();

  // useEffect(() => {
  //   setCurrentRank(2)
  // }, []);

  // useEffect(() => {
  //   setCurrentPoints(4)
  // }, []);

  // const headers = {
  //   'X-RapidAPI-Key': '4d20a10640mshcb44d59c18b0698p17d664jsn888f114ee37c',
  //   'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
  // }

  // useEffect(() => {
  //   if(liveScores === undefined) {
  //     fetch('https://livescore6.p.rapidapi.com/matches/v2/list-live', { headers })
  //       .then((response) => response.json())
  //       .then((data) => setLiveScores(data));
  //   }
  // }, [])

  // console.log(liveScores)

  const getHomeContent = () => {
    return (
      <>
        {
          Object.values(games)?.map((game, index) => {
            if (new Date().getDay() === game?.date?.getDay()) {
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
                  {/* {
                    info !== undefined &&
                    <br></br> &&
                    <p>{info}</p>

                  } */}
                  <br></br>
                  {
                    getDateTime(game?.date)
                  }
                  {/* <form onSubmit={(e) => { e.preventDefault(); betOnGame() }}>
                    <div className="bet-line">
                      <input id="left-bet" style={{ height: "30px", textAlign: "center" }} type="number" placeholder={teamA} onChange={(e) => setScoreA(e.target.value)}></input>
                      <input id="right-bet" style={{ height: "30px", textAlign: "center" }} type="number" placeholder={teamB} onChange={(e) => setScoreB(e.target.value)}></input>
                    </div>
                    <br></br>
                    <input id="bet-button" className="bet-button" type="submit" value={'Bet'} disabled={validateInput()}></input>
                  </form> */}
                  {/* {adminCounter >= 7 &&
                    <form onSubmit={(e) => { e.preventDefault(); betRealScore() }} style={{ marginTop: "20px" }}>
                      <div className="bet-line">
                        <input id="left-bet" style={{ height: "30px", textAlign: "center" }} type="number" placeholder={teamA} onChange={(e) => setScoreA(e.target.value)}></input>
                        <input id="right-bet" style={{ height: "30px", textAlign: "center" }} type="number" placeholder={teamB} onChange={(e) => setScoreB(e.target.value)}></input>
                      </div>
                      <br></br>
                      <input id="bet-button" className="bet-button" type="submit" value={'Bet'} disabled={validateInput()}></input>
                    </form>
                  } */}
                  {/* {!isAvailableGame && <h3 style={{ padding: "10px", marginBottom: "20px" }}>Game is not available!</h3>} */}
                  {/* <div id={"response-placeholder"} style={{ "paddingTop": "10px" }}></div> */}
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
      <h2 className='pageTitle' style={{padding: "20px" }}>Today's Matches</h2>
      {
        games && getHomeContent()
      }
    </>
  )
}

export default Home;