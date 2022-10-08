import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie('pokemondb');

db.version(1).stores({
    pokemon: "++id,name",
});

db.on("populate", async () => {
    await db.pokemon.bulkPut([
        {
            name: "Bulbasaur",
            picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        },
        {
            name: "Charmander",
            picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
        },
        {
            name: "Squirtle",
            picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
        },
        {
            name: "Pikachu",
            picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
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
    <div>
      <div class="card" style="border-color: var(--grass);">
        <div class="card-id" style="color: var(--grass);">${poke.id}</div>
        <div class="card-image">
          <img alt="${poke.name}" src="${poke.picture}">
        </div>
      </div>
      <div class="card-name" style="background-color: var(--grass);">
        ${poke.name}
      </div>
    </div>
  `;
}