import * as router from "./router.js";
import * as init from "./initializer.js";
import fetcher from "./fetcher.js";

export default async function inComponentLoad(
    productName,
    productLocation
){
    const components = document.querySelectorAll(".component-" + productName);
    async function load(e) {
        const{ name, ext, script} = e.dataset;
        const productLoc = !productLocation
         ? `components/${name}`
         : productLocation + `/${name}`;

         _loadCSS(`${productLoc}/css/${name}.css`);

         const hasScript = script ==="true";
         const html = await fetcher(`${productLoc}/${name}.html`);

         e.insertAdjacentHTML("beforebegin", html);

        e.parentNode.removeChild(e);
        
        if(hasScript){
            const module = await import(`../../${productLoc}/script/${name}.js`)
            module.render();
        }
    }
    await [...components].forEach(load);
}

function _loadCSS(productLoc){
    let bool = false;
    const head = document.getElementsByTagName("head")[0];

  // find the tag that contains tha previous styles file url.
    const cSS = head.querySelectorAll('[data-type="styles"]');
  // if it is exist then remove it from the head
    console.log(productLoc)
    console.log(cSS)

    cSS.forEach((c) => {
        if (c.href.includes(productLoc)) exist = bool;
    });

    if (bool) return;
    const cssTag = document.createElement("link");
    cssTag.dataset.type = "styles";
    cssTag.rel = "stylesheet";
    cssTag.href = productLoc;
    head.appendChild(cssTag);
}