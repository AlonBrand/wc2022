import React, { useEffect, useState } from 'react';
import "../App.css";

function Home() {
  const [currentRank, setCurrentRank] = useState();
  const [currentPoints, setCurrentPoints] = useState();
  const [liveScores, setLiveScores] = useState();

  useEffect(() => {
    setCurrentRank(2)
  }, []);

  useEffect(() => {
    setCurrentPoints(4)
  }, []);

  const headers = {
    'X-RapidAPI-Key': '4d20a10640mshcb44d59c18b0698p17d664jsn888f114ee37c',
    'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
  }

  // useEffect(() => {
  //   if(liveScores === undefined) {
  //     fetch('https://livescore6.p.rapidapi.com/matches/v2/list-live', { headers })
  //       .then((response) => response.json())
  //       .then((data) => setLiveScores(data));
  //   }
  // }, [])

  // console.log(liveScores)
  


  return (
    <>
      <h1 className='pageTitle'>World Cup 2022</h1>
      <div className='home-page-content'>
        <h3>{`Your Rank: ${currentRank}`}</h3>
        <h3>{`Your Points: ${currentPoints}`}</h3>
      </div>
    </>
  )
}

export default Home;