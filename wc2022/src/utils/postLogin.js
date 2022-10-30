export const postLogin = async ({ nickName, email, updateConnectedUserName }) => {
    let msg = ""
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: nickName, email: email }),
    };
    try {
        let response = await fetch("http://127.0.0.1:5000/log-in", requestOptions);
        response.json()
            .then((data) => {
                updateConnectedUserName(`Hi, ${data?.userName}`)
            });
    } catch (e) {
        console.log("🚀 ~ file: postLogin.js ~ line 12 ~ postLogin ~ e", e);
    }
};
