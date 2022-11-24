

export const postSignUp = async ({ name, password, updateConnectedUserName, setIsConnect, closeModal, setPostInProgress }) => {
    setPostInProgress(()=>true);
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ name: name, password: password }),
    };
    try {
        let response = await fetch("https://alon-wc22.herokuapp.com/sign-up", requestOptions);
        // let response = await fetch("http://127.0.0.1:5000/sign-up", requestOptions);
        response.json()
        .then((data) => {
            console.log(data)
            setPostInProgress(()=>false);
            if (data?.msg === 'UNIQUE constraint failed: Users.name') {
                const element = document.getElementById("login-placeHolder");
                element.innerHTML = '<h5> User name already exist! </h5>';
            }
            else if(data?.msg === 'User Connected'){
                document.cookie = `name=${data?.user_name}; expires=${new Date(2022, 11, 11).toUTCString()}`
                window.USER_ID = data?.user_id;
                updateConnectedUserName(`Hi, ${data?.user_name}`)
                setIsConnect(() => true);
                closeModal();
            }
            });
    } catch (e) {
        setPostInProgress(()=>false)
        console.log("Post sign up error =>", e);
    }
};

export const postLogIn = async ({ name, password, updateConnectedUserName, setIsConnect, closeModal, setPostInProgress }) => {
    setPostInProgress(()=>true);
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, password: password }),
    };
    try {
        let response = await fetch("https://alon-wc22.herokuapp.com/log-in", requestOptions);
        // let response = await fetch("http://127.0.0.1:5000/log-in", requestOptions);
        response.json()
            .then((data) => {
                setPostInProgress(()=>false);
                console.log(data)
                console.log(data?.msg)
                if(data?.msg === 'User connected') {
                    document.cookie = `name=${data?.user_name}; expires=${new Date(2022, 11, 11).toUTCString()}`
                    console.log(document.cookie)
                    window.USER_ID = data?.user_id;
                    updateConnectedUserName(`Hi, ${data?.user_name}`);
                    setIsConnect(()=>true);
                    closeModal()
                }
                else if(data?.msg === "Wrong user name or password!") {
                    const element = document.getElementById("login-placeHolder");
                    element.innerHTML = '<h5>Wrong user name or password!</h5>';
                }
            });
    } catch (e) {
        setIsConnect(()=>false)
        console.log("Post log in error =>", e);
    }
};
