import renderActivePage from "./pageRender.js";
import * as init from "./initializer.js";
import * as storage from "./storage.js";

export const pages =[
    {
        name: "home",
        title: "Pretty Cool Webshop",
        rootPage: true,
        redirectFrom: true,
        needAuthentication: false,
    },
    {
        name: "cart",
        title: "Pretty Cool Webshop",
        rootPage: false,
        redirectFrom: true,
        needAuthentication: false,
      },
      {
        name: "orders",
        title: "Pretty Cool Webshop",
        rootPage: false,
        redirectFrom: true,
        needAuthentication: true,
      },
      {
        name: "404",
        title: "404 ERROR",
        rootPage: false,
        redirectFrom: true,
        needAuthentication: false,
      },
      {
        name: "product",
        title: "Pretty Cool Webshop",
        rootPage: false,
        redirectFrom: true,
        needAuthentication: false,
      },
      {
        name: "login",
        title: "Pretty Cool Webshop",
        rootPage: false,
        redirectFrom: true,
        needAuthentication: false,
    },
    {
        name: "register",
        title: "Pretty Cool Webshop",
        rootPage: false,
        redirectFrom: true,
        needAuthentication: false,
    }

];

export async function redirect(){
    const usr = await storage.storagePx.user;
    const hash = window.location.hash.substr(1);

    if (hash == ""){
        return await renderActivePage();
    }
    if (hash.includes("?") && !init.rootDiv.innerHtml.includes("div")){
        return await renderActivePage();

    }
    if ( !hash.includes("?") && !pages.find((page) => page.name === hash)){
        return await renderActivePage("404");
    }
    pages.forEach(async (c) => {
        if (hash.includes(c.name) && c.redirectFrom){
            if (c.needAuthentication && !user.loggedIn){
                window.location.hash = "signup";
            } else{
                await renderActivePage(hash);
            }
        }
    });
}