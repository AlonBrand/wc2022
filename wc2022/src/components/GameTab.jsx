import { useState } from "react";
import "./GameTab.css";
import { flagsPaths } from "../constants/games";
import checkmark from "../images/checmmark.png";
import ReactCountryFlag from "react-country-flag"

export const GameTab = ({ id, teamA, teamB, date, info, setModalContent, setModalOpen, setReFetch }) => {
    const [scoreA, setScoreA] = useState();
    const [scoreB, setScoreB] = useState();
    const [realScoreA, setRealScoreA] = useState();
    const [realScoreB, setRealScoreB] = useState();
    const [adminCounter, setAdminCounter] = useState(0);
    const isAvailableGame = new Date() - date < 0;
    // const isAvailableGame = false;

    const betRecivedContent = () =>{
        return(
            <div style={{
                "display": "flex",
                "alignContent": "center",
                "flexDirection": "column",
                "height": "100%",
                "alignItems": "center",
                /* justify-content: center; */
                "fontSize": "1rem",
                "textAlign": "center",
                /* overflow: scroll; */
            }}>
                <div>
                    <img src={checkmark} />
                </div>
                <div>
                    Your bet has received! <br/>
                    Good luck!
                </div>

            </div>
        )
    }

     

    const betOnGame = async () => {
        let msg = "Server received your bet, good luck!!!"
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId: id, teamA: teamA, teamB: teamB, scoreA: scoreA, scoreB: scoreB, userId: window.USER_ID }),
        };
        try {
            // let response = await fetch("http://127.0.0.1:5000/games/bet-on-game", requestOptions);
            let response = await fetch("https://alon-wc22.herokuapp.com/games/bet-on-game", requestOptions);
            let response_data = response.json()
            .then((data) => console.log(data));
            // updateConnectedUserName(`Hi, ${response_data?.msg}`)
        } catch (e) {
            msg = "Faild to send bet, please try again"
        }
        // document.getElementById(`response-placeholder-${id}`).innerText = msg;

        // document.getElementById(`response-placeholder-${id}`).display = 'block';
        setModalContent(betRecivedContent(), "Nice bet bro!");
        setModalOpen(true);
        setReFetch(prev => !prev);
        // setTimeout(() => {
        //     document.getElementById(`response-placeholder-${id}`).innerText = '';
        // }, 4000);
    }

    const betRealScore = async () => {
        setAdminCounter(0);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId: id, teamA: teamA, teamB: teamB, scoreA: realScoreA, scoreB: realScoreB }),
        };
        try {
            let response = await fetch("https://alon-wc22.herokuapp.com/games/bet-real-score", requestOptions);
            // let response = await fetch("https://alon-wc22.herokuapp.com/games/bet-on-game", requestOptions);
            let response_data = response.json()
            .then((data) => console.log(data));
            // updateConnectedUserName(`Hi, ${response_data?.msg}`)
        } catch (e) {
            console.log(e);
        }
        // document.getElementById("response-placeholder").innerText = msg;
    }
    
    const validateInput = () => {
        if(scoreA === undefined || scoreB === undefined || scoreA < 0 || scoreB < 0 || scoreA === '' || scoreB === '') return true;
        return false;
    }
    const getFlagIcon = () => {
        return  (
            <>
                <div 
                    style={{
                        "display":"flex",
                        "flexDirection":"row",
                        "justifyContent":"space-around",
                        "paddingTop": "15px"
                    }}
                >
                    <div style={{"justifyContent": "center", "verticalAlign": "center"}}>
                        <ReactCountryFlag
                            countryCode={flagsPaths[teamA]}
                            svg
                            style={{
                                width: '2em',
                                height: '2em',
                            }}
                            title={teamA}
                        />
                        <h4 style={{"paddingTop": "5px"}}>{teamA}</h4>
                    </div>
                        <h3 onClick={increaseAdminCount} style={{"paddingTop":"15px","textAlign":"center"}}>VS</h3>
                    
                    <div>
                    <ReactCountryFlag
                            countryCode={flagsPaths[teamB]}
                            svg
                            style={{
                                width: '2em',
                                height: '2em',
                            }}
                            title={teamB}
                        />
                        <h4 style={{"paddingTop": "5px"}}>{teamB}</h4>
                    </div>
                </div>
            </>
        )
    }
    
    const getDateTime = () => {
        return  (
            <>
               <div 
                    style={{
                        "display":"flex",
                        "flexDirection":"row",
                        "justifyContent":"space-evenly",
                        "paddingTop": "20px"
                    }}
                >
                    <div>
                        {date?.toLocaleDateString("he-IL")}
                    </div>
                    <div>
                        {date?.toLocaleTimeString("he-IL")}
                    </div>
                </div>
            </>
        )
    }

    const increaseAdminCount = () => {
        setAdminCounter((prevCounter) => prevCounter+1);
    }

    const getScoreGameEnd = (betA, betB) => {
        return  (
            <>
               <div id={`last-bet-${id}`}
                    style={{
                        "display": "none",
                        "flexDirection":"row",
                        "justifyContent":"space-evenly",
                        "paddingTop": "20px"
                    }}
                >
                    <h3 id={`last-betA-${id}`}>
                        {betA}
                    </h3>
                    <h3 id={`last-betB-${id}`} style={{fontStyle:"bold"}}>
                        {betB}
                    </h3>
                </div>
            </>
        )

    }

    return (
            <div className="game-tab-container" style={{marginBottom: "30px"}}>       
                {!isAvailableGame ? 
                    <div id="game-tab-overlay"
                        style={{
                            "display": "block"
                        }}
                    >
                        {getFlagIcon()}
                        <br></br>
                        {getDateTime()}
                        {/* <br></br> */}
                        {getScoreGameEnd()}
                        <br></br>
                        {
                            info !== undefined && 
                            <br></br> &&
                            <p>{info}</p>

                        }
                        <br></br>
                        <h3 >No more bet kapara!</h3> 
                        <div style={{paddingBottom: "15px"}} id={`your-bet-placeholder-${id}`} ></div>
                    </div> 
                :
                 <>
                    <div style={{"paddingBottom":"10px"}}>
                        {getFlagIcon()}
                        <br></br>
                        {getDateTime()}
                        <br></br>
                        {
                            info !== undefined && 
                            <br></br> &&
                            <p>{info}</p>

                        }
                        <br></br>
                            <form onSubmit={(e) => {e.preventDefault(); betOnGame()}}>
                                <div className="bet-line">
                                    <input id="left-bet" style={{height: "30px", textAlign: "center"}} type="number" placeholder={teamA} onChange={(e)=>setScoreA(e.target.value)}></input>
                                    <input id="right-bet"  style={{height: "30px", textAlign: "center"}} type="number" placeholder={teamB} onChange={(e)=>setScoreB(e.target.value)}></input>
                                </div>
                                <br></br>
                                <input id="bet-button" className="bet-button" type="submit" value={'Bet'} disabled={validateInput()}></input>
                            </form>
                        <div id={`response-placeholder-${id}`} ></div>
                        <div id={`your-bet-placeholder-${id}`} ></div>
                    </div>
                 </>
                }
                {adminCounter >= 7 && 
                    <form onSubmit={(e) => {e.preventDefault(); betRealScore()}} style={{marginTop: "20px"}}>
                        <div className="bet-line">
                            <input id="left-bet" style={{height: "30px", textAlign: "center"}} type="number" placeholder={teamA} onChange={(e)=>setRealScoreA(e.target.value)}></input>
                            <input id="right-bet" style={{height: "30px", textAlign: "center"}} type="number" placeholder={teamB} onChange={(e)=>setRealScoreB(e.target.value)}></input>
                        </div>
                        <br></br>
                        <input id="bet-button" className="bet-button" type="submit" value={'Bet'}></input>
                    </form>
                }
                <div id={`response-placeholder-${id}`} style={{"paddingTop": "10px", "display":"none"}}></div>
        </div>
    )
}
