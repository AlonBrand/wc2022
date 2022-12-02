import React, { useEffect, useState, useRef } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import "./Timer.css";



export default function Timer({gameDate, gameTabId, setTimerAlert}) {
    const [counter, setCounter] = useState('0')
    const [alertIsOn, setalertIsOn] = useState(false)
    let now = new Date();
    useEffect(()=>{
        let timeInterval = setInterval(function() {
            let timeLeft = moment.duration(new Date(gameDate - now)).format("HH:mm:ss");

            // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            // var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            // var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            // var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            setCounter(`${timeLeft}`)
            // console.log(moment.duration(new Date(gameDate - now)).minutes())
            if (moment.duration(new Date(gameDate - now)).minutes() < 5 && moment.duration(new Date(gameDate - now)).hours() === 0 && !alertIsOn){
                document.getElementById(`timerWrapper-${gameTabId}`).classList.add("one_min_left");
                setalertIsOn(true)
                setTimerAlert(true);
            }
        }, 1000);
        return(()=>clearInterval(timeInterval));
    });
  return (
    <div className="timer">
        {counter}
    </div>
  );
}