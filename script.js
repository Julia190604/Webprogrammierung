document.querySelector('.search').addEventListener('submit', function(event) {
    event.preventDefault();

    const query = event.target.querySelector('input[name="searchInput"]').value;

    if (query && query.length > 2) {
        fetchData(query);
    }
});




function fetchData(searchInput) {
    const query = document.getElementById('searchInput').value;
    fetch('https://dummyjson.com/products/search?q=${searchInput}')
        .then(response => response.json())
        .then(data => {
            document.getElementById('results').innerHTML = JSON.stringify(data);
        })
        .catch(error => {
            console.error("Es gab einen Fehler beim Abrufen der Daten:", error);
        });
}



function displayResults(data) {
    const resultsContainer = document.getElementById('searchInput');
    resultsContainer.innerHTML = ''; // Vorherige Suchergebnisse löschen

    data.forEach(product => {
        const productDiv = document.createElement('div');

        // Produktbild
        const productImg = document.createElement('img');
        productImg.src = product.imageURL;
        productImg.alt = product.name;
        productDiv.appendChild(productImg);

        // Produktlink
        const productLink = document.createElement('a');
        productLink.href = `product-details.html?id=${product.id}`;
        productLink.textContent = product.name;
        productDiv.appendChild(productLink);

        resultsContainer.appendChild(productDiv);
    });
}