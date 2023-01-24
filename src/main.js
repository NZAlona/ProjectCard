import { fetchPics } from "./dummyApi";
import { createMarkup } from "./markup";
import { divRef, searchInputRef } from "./referenceRefs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

async function entryPointInit() {
  const { products } = await fetchPics("products");
  console.log(products);

  const markup = createMarkup(products);
  console.log(markup);
  renderMarkup(markup);
}

entryPointInit();

function renderMarkup(markup = "") {
  divRef.insertAdjacentHTML("beforeend", markup);
}

searchInputRef.addEventListener("submit", onSubmitClick);

async function onSubmitClick(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.qwery.value.trim();
  console.log(searchQuery);
  if (!searchQuery) {
    return;
  }
  const { products } = await fetchPics(`products/search?q=${searchQuery}`);
  console.log(products);
  const markup = createMarkup(products);
  clearMarkup();
  renderMarkup(markup);
}

function clearMarkup() {
  divRef.innerHTML = "";
}
