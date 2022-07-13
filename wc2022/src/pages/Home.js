import React, { useEffect, useState } from 'react';
import "../App.css";

function Home() {
  const [currentRank, setCurrentRank] = useState();
  const [currentPoints, setCurrentPoints] = useState();

  useEffect(() => {
    setCurrentRank(2)
  }, []);

  useEffect(() => {
    setCurrentPoints(4)
  }, []);
  


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