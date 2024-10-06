const accessKey = " ";
const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input");

const fetchImages = (query) => {};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputText = searchInput.value.trim();
  if (inputText !== "") {
    fetchImages(inputText);
  } else {
    imagesContainer.innerHTML = `<h2>Please Enter a Search Query.</h2>`;
  }
});
