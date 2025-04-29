//Mettre le code JavaScript lié à la page photographer.html
function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");

        const link = document.createElement("a");
        link.setAttribute("href", `photographer.html?id=${id}`);
        link.setAttribute("aria-label", `${name}`);
        
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `${name}`);

        const h2 = document.createElement("h2");
        h2.textContent = name;

        const location = document.createElement("h3");
        location.textContent = `${city}, ${country}`;

        const tag = document.createElement("p");
        tag.classList.add("tagline");
        tag.textContent = tagline;

        const rate = document.createElement("p");
        rate.classList.add("price");
        rate.textContent = `${price}€/jour`;

        link.appendChild(img);
        link.appendChild(h2);

        article.appendChild(link);
        article.appendChild(location);
        article.appendChild(tag);
        article.appendChild(rate);

        return article;
    }

    return { name, picture, getUserCardDOM };
}
async function getPhotographerData(id) {
    const response = await fetch('../data/photographers.json');
    const data = await response.json();
    
    const photographer = data.photographers.find((p) => p.id === id);
    const media = data.media.filter((m) => m.photographerId === id);

    return { photographer, media };
}
function getPhotographerIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}
// Step 1: Fetch photographer and media data
async function getPhotographerData(id) {
    const response = await fetch('../data/photographers.json');
    const data = await response.json();
    
    const photographer = data.photographers.find((p) => p.id === id);
    const media = data.media.filter((m) => m.photographerId === id);

    return { photographer, media };
}

// Step 2: Extract ID from URL
function getPhotographerIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

async function init() {
    const id = getPhotographerIdFromUrl();
    const { photographer, media } = await getPhotographerData(id);

    displayPhotographerHeader(photographer); 
    console.log('Photographer:', photographer);
    console.log('Media:', media);
}


init(); // 👈 This triggers everything when the page loads
function displayPhotographerHeader(photographer) {
    const header = document.querySelector(".photograph-header");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("photographer-info");

    const name = document.createElement("h2");
    name.textContent = photographer.name;

    const location = document.createElement("p");
    location.classList.add("photographer-location");
    location.textContent = `${photographer.city}, ${photographer.country}`;

    const tagline = document.createElement("p");
    tagline.classList.add("photographer-tagline");
    tagline.textContent = photographer.tagline;

    infoDiv.appendChild(name);
    infoDiv.appendChild(location);
    infoDiv.appendChild(tagline);

    const img = document.createElement("img");
    img.setAttribute("src", `assets/photographers/${photographer.portrait}`);
    img.setAttribute("alt", photographer.name);

    header.insertBefore(infoDiv, header.querySelector(".contact_button"));
    header.appendChild(img);
}
