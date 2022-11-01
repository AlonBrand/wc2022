export const postLogin = async ({ name, password, updateConnectedUserName }) => {
    let msg = ""
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, password: password }),
    };
    try {
        let response = await fetch("http://127.0.0.1:5000/sign-up", requestOptions);
        response.json()
            .then((data) => {
                console.log(data)
                updateConnectedUserName(`Hi, ${data?.user_name}`)
                console.log(data?.msg)
            });
    } catch (e) {
        console.log("🚀 ~ file: postLogin.js ~ line 12 ~ postLogin ~ e", e);
    }
};
