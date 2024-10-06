const accessKey = "HKoywW0UaQQU6LweLEUFs3zZPSWac1So2TvMLmmhqe8";
const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input");

const fetchImages = async (query) => {
  imagesContainer.innerHTML = "";
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  // Loop through the array of photos
  data.results.forEach((photo) => {
    const imageElement = document.createElement("div");

    imageElement.classList.add("imageDiv");
    imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

    const overlayElement = document.createElement("div");
    overlayElement.classList.add("overlay");

    const overlayText = document.createElement("h3");
    overlayText.innerText = `${photo.alt_description}`;

    overlayElement.appendChild(overlayText);

    imageElement.appendChild(overlayElement);

    imagesContainer.appendChild(imageElement);
  });
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputText = searchInput.value.trim();
  imagesContainer.innerHTML = ""; // Clear previous results

  if (inputText !== "") {
    fetchImages(inputText);
  } else {
    imagesContainer.innerHTML = `<h2>Please Enter a Search Query.</h2>`;
  }
});
