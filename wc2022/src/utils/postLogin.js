export const postLogin = async ({ nickName, email }) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: nickName, email: email }),
    };

    let response = await fetch("http://127.0.0.1:5000/log-in", requestOptions);
    console.log(response);
};
