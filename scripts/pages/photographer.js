//Mettre le code JavaScript lié à la page photographer.html

let originalMediaList = [];
let currentMediaList = []; // to store media array
let currentIndex = 0; // to track which media is currently open

const params = new URLSearchParams(window.location.search);
const photographerId = parseInt(params.get("id")); // get ?id=123

async function getPhotographerData() {
  const res = await fetch('./data/photographers.json');
  const data = await res.json();

  const photographer = data.photographers.find(p => p.id === photographerId);
  const media = data.media.filter(m => m.photographerId === photographerId);

  return { photographer, media };
}
function displayPhotographerInfo(photographer) {
  const header = document.querySelector('.photograph-header');

  const info = document.createElement('div');
  const name = document.createElement('h1');
  name.textContent = photographer.name;

  const location = document.createElement('p');
   location.className = 'photographer-location2';
  location.textContent = `${photographer.city}, ${photographer.country}`;

  const tagline = document.createElement('p');
  tagline.className = 'photographer-tagline2';
  tagline.textContent = photographer.tagline;

  info.appendChild(name);
  info.appendChild(location);
  info.appendChild(tagline);

  const img = document.createElement('img');
  img.setAttribute('src', `assets/photographers/${photographer.portrait}`);
  img.setAttribute('alt', photographer.name);

  header.insertBefore(info, header.querySelector('.contact_button'));
  header.appendChild(img);
}
document.addEventListener("DOMContentLoaded", () => {
  const customSelect = document.querySelector(".custom-select");
  const selected = customSelect.querySelector(".selected");
  const options = customSelect.querySelectorAll(".select-options li");

  customSelect.addEventListener("click", () => {
    customSelect.classList.toggle("active");
  });

  options.forEach(option => {
    option.addEventListener("click", () => {
      selected.textContent = option.textContent;
      customSelect.classList.remove("active");
      const sortBy = option.getAttribute("data-sort");
      sortMedia(sortBy);
    });
  });

  document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("active");
    }
  });
});

// Example sorting function placeholder
function sortMedia(criteria) {
  let sortedMedia = [...originalMediaList]; // always start from original

  if (criteria === "popularity") {
    sortedMedia.sort((a, b) => b.likes - a.likes);
  } else if (criteria === "date") {
    sortedMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (criteria === "title") {
    sortedMedia.sort((a, b) => a.title.localeCompare(b.title));
  }

  currentMediaList = sortedMedia; // update current list
  displayMedia(currentMediaList); // re-render display
}



function displayMedia(mediaList) {
  currentMediaList = mediaList;
  const container = document.querySelector('.media-section');
  container.innerHTML = '';
  let totalLikes = 0;

  mediaList.forEach(media => {
    const mediaItem = document.createElement('article');

    let mediaElement;
    if (media.image) {
      mediaElement = document.createElement('img');
      mediaElement.setAttribute('src', `./assets/images/${photographerId}/${media.image}`);
      mediaElement.setAttribute('alt', media.title);
    } else if (media.video) {
      mediaElement = document.createElement('video');
      mediaElement.setAttribute('src', `./assets/images/${photographerId}/${media.video}`);
      mediaElement.setAttribute('controls', true);
    }
    const title = document.createElement('h2');
    title.textContent = media.title;

    const likeContainer = document.createElement('div');
    likeContainer.classList.add('likes');

    const likeCount = document.createElement('span');
    likeCount.textContent = media.likes;

    const likeButton = document.createElement('button');
    likeButton.setAttribute('aria-label', `Liker ${media.title}`);
    likeButton.innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i>`;

    likeButton.addEventListener('click', () => {
      media.likes++;
      likeCount.textContent = media.likes;
      totalLikes++;
      updateTotalLikes(totalLikes);
    });

    likeContainer.appendChild(likeCount);
    likeContainer.appendChild(likeButton);

    mediaElement.style.cursor = "pointer";
mediaElement.addEventListener("click", () => {
   console.log("Clicked media:", media.title); 
  openLightbox(mediaList.indexOf(media));
});

    mediaItem.appendChild(mediaElement);
    mediaItem.appendChild(title);
    mediaItem.appendChild(likeContainer);

    container.appendChild(mediaItem);

    totalLikes += media.likes;
  });

  // Display total likes
  displayTotalLikes(totalLikes);
}

function displayTotalLikes(initialTotal) {

  const likeNumber = document.querySelector('.total-likes span');
  likeNumber.textContent = initialTotal;

}

function updateTotalLikes(newTotal) {
  const likeTotalEl = document.querySelector('.total-likes span');
  if (likeTotalEl) {
    likeTotalEl.textContent = newTotal;
  }
}
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // Restore scrolling
}
async function init() {
  const { photographer, media } = await getPhotographerData();
  displayPhotographerInfo(photographer);
  displayModalname (photographer.name);
   originalMediaList = media; // store original
  currentMediaList = [...originalMediaList]; // create copy
  displayMedia(currentMediaList);
  document.querySelector(".lightbox__close").addEventListener("click", () => {
  const lightbox = document.querySelector(".lightbox");
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
});
function displayModalname (photographerName) {
  const titleName = document.querySelector("#contact_modal h2");
  titleName.textContent = 'Contactez-moi ' +  photographerName;
}

document.querySelector(".lightbox__prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentMediaList.length) % currentMediaList.length;
  showMediaInLightbox(currentMediaList[currentIndex]);
});

document.querySelector(".lightbox__next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentMediaList.length;
  showMediaInLightbox(currentMediaList[currentIndex]);
});
}

init();
function openLightbox(index) {
  console.log("Opening lightbox at index:", index);
  currentIndex = index;
    const lightbox = document.querySelector(".lightbox");
  console.log("Lightbox element found?", lightbox !== null);
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");

  showMediaInLightbox(currentMediaList[currentIndex]);
}

function showMediaInLightbox(media) {
  const container = document.querySelector(".lightbox__content");
  container.innerHTML = "";

  let element;
  if (media.image) {
    element = document.createElement("img");
    element.src = `./assets/images/${photographerId}/${media.image}`;
    element.alt = media.title;
  } else if (media.video) {
    element = document.createElement("video");
    element.src = `./assets/images/${photographerId}/${media.video}`;
    element.controls = true;
  }

  const title = document.createElement("p");
  title.textContent = media.title;

  container.appendChild(element);
  container.appendChild(title);
}

document.addEventListener("keydown", (e) => {
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox.classList.contains("active")) return;

  switch (e.key) {
    case "ArrowRight":
      currentIndex = (currentIndex + 1) % currentMediaList.length;
      showMediaInLightbox(currentMediaList[currentIndex]);
      break;
    case "ArrowLeft":
      currentIndex = (currentIndex - 1 + currentMediaList.length) % currentMediaList.length;
      showMediaInLightbox(currentMediaList[currentIndex]);
      break;
    case "Escape":
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      break;
  }
});


