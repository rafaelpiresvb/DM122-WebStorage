const CACHE_KEY = 'poke';

async function addToCache(requestUrl, response) {
    const cache = await caches.open(CACHE_KEY);
    cache.put(requestUrl, response);
}

async function fetchFromNetwork(requestUrl) {
    const response = await fetch(requestUrl);
    addToCache(requestUrl, response.clone());
    return response;
}

async function fetchFromCache(requestUrl) {
    const cache = await caches.open(CACHE_KEY);
    const cachedResponse = await cache.match(requestUrl);
    return cachedResponse || null;
}

async function showPokemonData() {
    const img = document.querySelector('img');
    const details = document.querySelector('details');
    const pre = document.querySelector('pre');

    const pokeNumber = Math.floor(Math.random() * 10) + 1;
    const requestUrl = `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`;

    const pokeDataResponse = (await fetchFromCache(requestUrl)) || (await fetchFromNetwork(requestUrl));

    const pokeData = await pokeDataResponse.json();

    pre.textContent = JSON.stringify(pokeData, null, 2);

    img.alt = pokeData.name;
    img.title = pokeData.name;

    const pokeImageUrl = pokeData.sprites.other['official-artwork'].front_default;
    const pokeImageRequest = (await fetchFromCache(pokeImageUrl)) || (await fetchFromNetwork(pokeImageUrl));

    img.src = URL.createObjectURL(await pokeImageRequest.blob());
    // img.src = pokeData.sprites.other['official-artwork'].front_default;

    details.hidden = false;
}