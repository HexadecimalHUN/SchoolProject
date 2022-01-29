import * as storage from "../../../assets/javascript/storage.js"

export async function render(){
    const registerBtn = document.querySelector("#regBtn");
    registerBtn.addEventListener("click", async () => {
        await registerUsr();
    })
    
}
async function registerUsr() {
    const registerForm = document.querySelector("#registerForm");
    const formData = new FormData(registerForm);
  
    const userWannaBe = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
  
    fetch("http://localhost:3000/api/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userWannaBe),
    })
      .then(async (response) => {
        if (response.status != 201) {
          throw Error("Something went wrong...");
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
      .catch((err) => console.error(err));
}