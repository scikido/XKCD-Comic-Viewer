const apiURL = "https://xkcd.com/info.0.json";
const comicURL = "https://xkcd.com";
let currentComicNum;

document.addEventListener("DOMContentLoaded", function () {
  getLatestComic();

  document
    .querySelector("#random-link")
    .addEventListener("click", getRandomComic);
  document
    .querySelector("#latest-link")
    .addEventListener("click", getLatestComic);
  document.querySelector("#prev-link").addEventListener("click", getPrevComic);
  document.querySelector("#next-link").addEventListener("click", getNextComic);
});

function getRandomComic() {
  const maxNum = 2492;
  const randomNum = Math.floor(Math.random() * maxNum) + 1;
  const url = `https://cors-anywhere.herokuapp.com/${comicURL}/${randomNum}/info.0.json`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      currentComicNum = data.num;
      displayComic(data);
    });
}

function getLatestComic() {
  fetch(`https://cors-anywhere.herokuapp.com/${apiURL}`)
    .then((response) => response.json())
    .then((data) => {
      currentComicNum = data.num;
      displayComic(data);
    });
}

function getPrevComic() {
  const prevComicNum = currentComicNum - 1;
  const url = `https://cors-anywhere.herokuapp.com/${comicURL}/${prevComicNum}/info.0.json`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      currentComicNum = data.num;
      displayComic(data);
    })
    .catch((error) => console.log(error));
}

function getNextComic() {
  const nextComicNum = currentComicNum + 1;
  const url = `https://cors-anywhere.herokuapp.com/${comicURL}/${nextComicNum}/info.0.json`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      currentComicNum = data.num;
      displayComic(data);
    })
    .catch((error) => console.log(error));
}

function displayComic(data) {
  const title = data.title;
  const imageUrl = data.img;
  const altText = data.alt;

  const comicTitleElement = document.querySelector("#comic-title");
  const comicImageElement = document.querySelector("#comic-image");
  const comicAltElement = document.querySelector("#comic-alt");

  if (comicTitleElement && comicImageElement && comicAltElement) {
    comicTitleElement.textContent = title;
    comicImageElement.setAttribute("src", imageUrl);
    comicImageElement.setAttribute("alt", altText);
    comicAltElement.textContent = altText;
  }
}
