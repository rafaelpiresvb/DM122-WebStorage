import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie('pokemondb');

db.version(1).stores({
    pokemon: "++id,name",
});

db.on("populate", async () => {
    await db.pokemon.bulkPut([
        {
            name: "Bulbasaur",
            picture: await downloadImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"),
            type: "grass"   
        },
        {
            name: "Charmander",
            picture: await downloadImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"),
            type: "fire"
        },
        {
            name: "Squirtle",
            picture: await downloadImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"),
            type: "water"
        },
        {
            name: "Pikachu",
            picture: await downloadImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"),
            type: "electric"
        },

    ]);
});

db.open();

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
document.body.innerHTML = pokeHTML;

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