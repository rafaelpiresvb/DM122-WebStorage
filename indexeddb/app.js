import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie('pokemondb');

db.version(1).stores({
    pokemon: "++id,name",
});

db.on("populate", async () => {
    await db.pokemon.bulkPut([
        {
            name: "Bulbasaur",
            picture: await downloadImage(buildUrl(1)),
            type: "grass"   
        },
        {
            name: "Charmander",
            picture: await downloadImage(buildUrl(4)),
            type: "fire"
        },
        {
            name: "Squirtle",
            picture: await downloadImage(buildUrl(7)),
            type: "water"
        },
        {
            name: "Pikachu",
            picture: await downloadImage(buildUrl(25)),
            type: "electric"
        },

    ]);
});

db.open();

function buildUrl(pokeNumber) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber}.png`
}

function byChar(char) {
    return function (poke) {
        console.log(poke.name);
        return poke.name.includes(char);
    };
}

// const byChar = char => poke => poke.name.includes()

const pokemonList = await db.pokemon
    // .where("name")
    // .startsWithIgnoreCase("c")
    // .filter(byChar("a"))
    .toArray();

console.log(pokemonList);

const pokeHTML = pokemonList.map(toHTML).join("");
document.body.innerHTML += pokeHTML;

function toHTML(poke) {
    return `
    <div class="card ${poke.type}">
        <h2>${poke.id}</h2>
        <img alt="${poke.name}" src="${URL.createObjectURL(poke.picture)}"/>
        <section class="section-name">
            <h2 class="name">${poke.name}</h2>
        </section>
    </div>
  `;
}

async function downloadImage(imageUrl) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return blob;
}

async function saveFormData(event) {
    event.preventDefault();
    const form = event.target;
    await saveOnDatabase({
        name: form.name.value,
        pokeNumber: form.pokeNumber.value,
        type: form.type.value,
    });
    form.reset();
    form.name.focus();
    return false;
}

async function saveOnDatabase({ name, pokeNumber, type }) {
    const pokemon = await db.pokemon.where("name").equals(name).toArray();
    if (pokemon.length === 0) {
        await db.pokemon.add({
            name,
            picture: await downloadImage(buildUrl(pokeNumber)),
            type
        })
    }
}

const form = document.querySelector('form');
form.addEventListener("submit", saveFormData);