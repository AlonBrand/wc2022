import React, { useEffect, useState } from "react";
import "../App.css";

const requestOptions = {
    method: "GET",
    headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
    // body: JSON.stringify({ name: name, password: password }),
};

function Rank() {
    const [users, setUsers] = useState();
    console.log(users);

    useEffect(() => {
        const getUsers = () => {
            try{
                if (users === undefined) {
                    fetch("https://alon-wc22.herokuapp.com/users", requestOptions)
                    .then((response) => response.json()
                    .then((data) => {
                        setUsers(()=> data?.users?.map((user) => {
                            return {
                                name: user[0],
                                points: user[2]
                            }
                         }
                        )?.sort((a, b) => b?.points - a?.points))
                    }));
                }
            } catch(e) {
                console.log(e)
            }
        }
        getUsers();
    }, []);

    return (
        <div className="rank">
            <h1 style={{"paddingTop": "10px"}}>Rank</h1>
            <table className="rank-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
            {
                users && users.map((user, index) => {
                    return (
                        <tr key={`${user?.name} + ${index}`}>
                            <td>{index + 1}</td>
                            <td>{user?.name}</td>
                            <td>{user?.points}</td>
                        </tr>
                    )
                })
            }
            </tbody>
            </table>
        </div>
    );
}

export default Rank;
