const accessKey = "HKoywW0UaQQU6LweLEUFs3zZPSWac1So2TvMLmmhqe8";
const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input");
const loadMoreBtn = document.querySelector(".loadMoreBtn");

let page = 1;

const fetchImages = async (query, pageNo) => {
  try {
    if (page === 1) {
      imagesContainer.innerHTML = "";
    }

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
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

      if (data.total_pages === pageNo) {
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.style.display = "block";
      }
    } else {
      imagesContainer.innerHTML = `<h2>No Image Found.</h2>`;
    }
  } catch (error) {
    imagesContainer.innerHTML = `<h2>Faild to fetch Images. Please try again later.</h2>`;
  }

  // Loop through the array of photos
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputText = searchInput.value.trim();
  imagesContainer.innerHTML = ""; // Clear previous results

  if (inputText !== "") {
    page = 1;
    fetchImages(inputText, page);
  } else {
    imagesContainer.innerHTML = `<h2>Please Enter a Search Query.</h2>`;
    if (loadMoreBtn.style.display === "block")
      loadMoreBtn.style.display = "none";
  }
});

loadMoreBtn.addEventListener("click", () => {
  fetchImages(searchInput.value.trim(), ++page);
});
