const CACHE_KEY = 'poke';

async function addToCache(requestUrl, response) {
    const cache = await caches.open(CACHE_KEY);
    cache.put(requestUrl, response);
}

async function fetchFromNetwork(requestUrl) {
    const response = await fetch(requestUrl);
    addToCache(requestUrl, response.clone());
    const json = await response.json();
    return json;
}

async function fetchFromCache(requestUrl) {
    const cache = await caches.open(CACHE_KEY);
    const cachedResponse = await cache.match(requestUrl);
    const pokeData = cachedResponse?.json();
    return pokeData;
}

async function showPokemonData() {
    const img = document.querySelector('img');
    const details = document.querySelector('details');
    const pre = document.querySelector('pre');
    const requestUrl = `https://pokeapi.co/api/v2/pokemon/791`;

    const pokeData = (await fetchFromCache(requestUrl)) || (await fetchFromNetwork(requestUrl));

    pre.textContent = JSON.stringify(pokeData, null, 2);
    img.src = pokeData.sprites.other['official-artwork'].front_default;
    img.alt = pokeData.name;
    img.title = pokeData.name;

    details.hidden = false;
}