const accessKey = "HKoywW0UaQQU6LweLEUFs3zZPSWac1So2TvMLmmhqe8";
const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input");

const fetchImages = async (query) => {
  const url = `https://api.unsplash.com/photos/?query=${query}&per_page=28&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  //   console.log(data);

  data.result.forEach((photo) => {
    const imageElement = document.createElement("div");
    imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

    imagesContainer.appendChild(imageElement);
  });
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputText = searchInput.value.trim();
  if (inputText !== "") {
    fetchImages(inputText);
  } else {
    imagesContainer.innerHTML = `<h2>Please Enter a Search Query.</h2>`;
  }
});
