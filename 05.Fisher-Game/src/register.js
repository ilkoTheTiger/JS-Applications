document.getElementById("register-form").addEventListener("submit", registerHandler);
document.querySelectorAll("a").forEach(x => x.classList.remove("active"));
document.getElementById("register").classList.add("active");
const errorP = document.querySelector("p.notification");


function registerHandler(e) {
    //TODO validation
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const {email, password, rePass} = Object.fromEntries(formData);
    if (password !== rePass){
        errorP.textContent = "Error"
        setTimeout(() => {
            errorP.textContent = ""
        }, 10000)
    } else {
        onRegister(email, password);
    }

}



async function onRegister(email, password) {
    // TODO validation and Error handling
    const url = "http://localhost:3030/users/register"

    const body = {
        email,
        password
    }

    const header = getHeader("POST", body);
    try{
        const response = await fetch(url, header);
        const data = await response.json();
        if (data.code !== 200){
            throw new Error(data.messsage);
        }

        sessionStorage.setItem("userData", JSON.stringify({
            email: data.email,
            accessToken: data.accessToken,
            id: data._id
    
        }));
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("accessToken", data.accessToken);

        window.location = "./index.html"
        return data;
    } catch(e){
        errorP.textContent = e;
        setTimeout(() => {
            errorP.textContent ="";
        }, 10000)
    }

}

function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
}