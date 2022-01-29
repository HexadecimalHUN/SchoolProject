import * as router from "./router.js"
import * as storage from "./storage.js"

//Path to views folder
const viewUrl = "views/";
//Path to main site logic
const rootDiv = document.getElementById("app");


export {viewUrl, rootDiv};

export default async function init(){
    storage.autoloadLocalStorage();
    window.addEventListener("hashchange", async (e) =>{
        await router.redirect();
    });
    if (document.readyState !== "loading"){
        await router.redirect();
    }
}