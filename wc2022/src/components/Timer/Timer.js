import React, { useEffect, useState, useRef } from 'react';
import Moment from 'react-moment';
import moment from 'moment';


export default function Timer({gameDate}) {
    const [counter, setCounter] = useState('0')
    const [alertIsOn, setalertIsOn] = useState(false)
    let now = new Date();
    useEffect(()=>{
            let timeInterval = setInterval(function() {
            let timeLeft = moment(new Date(gameDate - now)).format("HH:mm:ss");

            // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            // var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            // var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            // var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            setCounter(`${timeLeft}`)
            if (timeLeft.getMinutes() <= 1 && !alertIsOn){
                document.getElementById(`timer`).class = "one_min_left";
                setalertIsOn(true)
            }
            if (timeLeft < 0) {
                return(()=>clearInterval(timeInterval));
            }
        }, 1000);
    });
  return (
    <div id="timer">
        {counter}
    </div>
  );
}