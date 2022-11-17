import React, { useEffect, useState } from "react";
import "../App.css";


function Rank() {
    const [users, setUsers] = useState();

    useEffect(() => {
        const getUsers = () => {
            try{
                if (users === undefined) {
                    fetch("https://alon-wc22.herokuapp.com/users")
                    // fetch("http://127.0.0.1:5000/users")
                    .then((response) => response.json()
                    .then((data) => {
                        console.log(data)
                        setUsers(()=> data?.users?.map((user) => {
                            return {
                                name: user[1],
                                points: user[3]
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
            <h1 style={{"paddingTop": "50px", "paddingBottom": "41.5px"}}>Tournament Table</h1>
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
                    users?.map((user, index) => {
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
