document.getElementById("login-form").addEventListener("submit", loginHandler);
document.querySelectorAll("a").forEach(x => x.classList.remove("active"));
document.getElementById("login").classList.add("active");

function loginHandler(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const {email, password} = Object.fromEntries(formData);

    onLogin(email, password);
}

async function onLogin(emai, password) {
    const url = "http://localhost:3030/users/login";
    const body = {
        email,
        password
    }

    const header = getHeader("POST", body);
    const response = await fetch(url, header);
    const data = await response.json();
    
    sessionStorage.setItem("userData", JSON.stringify({
        email: data.email,
        accessToken: data.accessToken,
        id: data._id

    }));
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("accessToken", data.accessToken);

    window.location = "./index.html"
    return data
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