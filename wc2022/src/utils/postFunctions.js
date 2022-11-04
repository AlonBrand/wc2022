export const postSignUp = async ({ name, password, updateConnectedUserName, setIsConnect }) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, password: password }),
    };
    try {
        let response = await fetch("https://alon-wc22.herokuapp.com/", requestOptions);
        response.json()
            .then((data) => {
                console.log(data)
                updateConnectedUserName(`Hi, ${data?.user_name}`)
                setIsConnect(()=>true);
            });
    } catch (e) {
        setIsConnect(()=>false)
        console.log("Post sign up error =>", e);
    }
};

export const postLogIn = async ({ name, password, updateConnectedUserName, setIsConnect }) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, password: password }),
    };
    try {
        let response = await fetch("http://127.0.0.1:5000/log-in", requestOptions);
        response.json()
            .then((data) => {
                updateConnectedUserName(`Hi, ${data?.user_name}`);
                console.log(data?.msg)
                setIsConnect(()=>true);
            });
    } catch (e) {
        setIsConnect(()=>false)
        console.log("Post log in error =>", e);
    }
};
