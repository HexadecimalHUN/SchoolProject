import * as storage from "../../../assets/javascript/storage.js"

export async function render(){
    const loginBtn = document.querySelector("#loginBtn");
    loginBtn.addEventListener("click", async () => {
        await loginUsr();
    })
}

async function loginUsr() {
    const loginForm = document.querySelector("#loginForm");
    const formData = new FormData(loginForm);
    const errorContainer = document.querySelector(
      ".container div.error"
    );
  
    const credentials = {
      email: formData.get("email"),
      password: formData.get("passwd"),
    };
  
    if (!credentials.email || !credentials.password) {
      errorContainer.innerHTML =
        "Please fill your credentials!";
      errorContainer.style.display = "flex";
      return;
    }
  
    fetch("http://localhost:3000/api/auth/local/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then(async (response) => {
        if (response.status != 201) {
          throw response;
        }
  
        return response.text();
      })
      .then((token) => {
        storage.storageProxy.user = {
          loggedIn: true,
          token: token,
        };
        window.location.hash = "#home";
      })
      .catch((err) => {
        console.error(err.status);
        if (err.status == 401) {
          errorContainer.innerHTML = "Incorrect username or password.";
          errorContainer.style.display = "flex";
        }
      });
  }