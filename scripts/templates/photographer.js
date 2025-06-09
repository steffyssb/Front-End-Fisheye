function photographerTemplate(data) {
    const { name, portrait,city,country,tagline,price } = data;

    const picture = `assets/photographers/${portrait}`;

function getUserCardDOM() {
    const article = document.createElement('article');

    // Create link that wraps the image and name
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${data.id}`);
    link.setAttribute("aria-label", name);

    const img = document.createElement('img');
    img.setAttribute("src", picture);
    img.setAttribute("alt", name); // For accessibility

    const h2 = document.createElement('h2');
    h2.textContent = name;

    link.appendChild(img);
    link.appendChild(h2);

    const location = document.createElement('p');
    location.textContent = `${city}, ${country}`;

    const taglineElement = document.createElement('p');
    taglineElement.textContent = tagline;

    const pricetag = document.createElement('p');
    pricetag.textContent = `${price}€/jour`;

    article.appendChild(link);
    article.appendChild(location);
    article.appendChild(taglineElement);
    article.appendChild(pricetag);

    return article;
}

    return { name, picture, getUserCardDOM }
}
