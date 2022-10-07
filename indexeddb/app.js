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


const firstPokemon = await db.pokemon.toArray();
console.log(firstPokemon);