import * as router from "./router.js";
import * as init from "./initializer.js";

import fetcher from "./fetcher.js";

export default async function renderActivePage(partial) {
  // if no input then it will bring the SPA to the rootpage which is the landing page.
  if (!partial) {
    partial = router.pages.find((page) => page.rootPage).name;
  }
  // if something happens and unexpectid hash appears in the URL
  //it give the 404 page because it is not in the array so it is not a valid page.
  console.log(partial)
  if (!router.pages.find((page) => page.name === partial)) {
    partial = "404";
  }

  // change the page title.
  document.title = router.pages.find((page) => page.name === partial).title;

  // // with the valid partial name it fetches the correct site html.
  const html = await fetcher(`${init.viewUrl}${partial}/${partial}.html`);

  init.rootDiv.innerHTML = html;

  const module = await import(`../../${init.viewUrl}${partial}/script/${partial}.js`);
  console.log(module)
  module.render();
}
