// Event Listener für den Suchbutton
document.querySelector('.search-bar .submit').addEventListener('click', function() {
    const query = document.querySelector('.search-bar input[name="search"]').value;

    // Überprüfen, ob die Suchanfrage mindestens 3 Zeichen lang ist
    if (query && query.trim().length > 2) {
        fetchData(query);
    } else {
        document.getElementById('hint-text').textContent = 'Bitte geben Sie mindestens 3 Zeichen ein.';
    }
});

function fetchData(query) {
    fetch(`https://dummyjson.com/products/search?q=${query}`) 
    .then(res => res.json())
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        console.error("Es gab einen Fehler beim Abrufen der Daten:", error);
        document.getElementById('hint-text').textContent = 'Es gab einen Fehler bei der Suche.';
    });
}

function displayResults(data) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Vorherige Suchergebnisse löschen

    if (data && data.length > 0) {
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
    } else {
        resultsContainer.innerHTML = '<p>Keine Produkte gefunden.</p>';
    }
}