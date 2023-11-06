// Produktdetail-Funktionalität:
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetchProductDetails(productId);
    }
});

function fetchProductDetails(id) {
    fetch(`https://dummyjson.com/products/${id}`)
    .then(response => response.json())
    .then(product => {
        displayProductDetails(product);
        fetchCategoryProducts(product.category); 
    })
    .catch(error => {
        console.error("Es gab einen Fehler beim Abrufen der Produktdetails:", error);
    });
}

function fetchCategoryProducts(category) {
    fetch(`https://dummyjson.com/products/category/${category}`)
    .then(response => response.json())
    .then(data => {
        displayCategoryProducts(data.products); 
    })
    .catch(error => {
        console.error("Es gab einen Fehler beim Abrufen der Produkte der Kategorie:", error);
    });
}

function displayCategoryProducts(products) {
    const resultsContainer = document.getElementById('categorys-results');
    resultsContainer.innerHTML = ''; 

    products.forEach(product => {
        // Erstelle Container-Div je Kachel
        const tile = document.createElement('div');
        tile.classList.add('categorys-result-item');

        // Füge Thumbnail hinzu
        const img = document.createElement('img');
        img.src = product.thumbnail;
        img.alt = product.title;
        tile.appendChild(img);

        // Füge Namen hinzu
        const name = document.createElement('p');
        name.textContent = product.title;
        tile.appendChild(name);

        // Füge Kachel zum Ergebniscontainer hinzu
        resultsContainer.appendChild(tile);
    });
}

function displayProductDetails(product) {
    const content = document.getElementById('product-details-content');

    // Nur das erste Bild des Produktes wird angezeigt
    let productImage = product.images[0] || 'default-placeholder.jpg';

    let productHtml = `
        <h2>${product.title}</h2>
        <img src="${productImage}" alt="${product.title}">
        <p>${product.description}</p>
        <p>Preis: $${product.price}</p>
        <p>Rabatt: ${product.discountPercentage}%</p>
        <p>Bewertung: ${product.rating}</p>
        <p>Verfügbarer Bestand: ${product.stock}</p>
        <p>Marke: ${product.brand}</p>
        <p>Kategorie: ${product.category}</p>
    `;

    content.innerHTML = productHtml;
    fetchCategoryProducts(product.category);
}

document.getElementById('back-button').addEventListener('click', function() {
    window.history.back(); // vorherige Seite
});