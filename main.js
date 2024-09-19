const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
};

let currentPokemonId = null;

document.getElementById("pokemoninput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getPokemon();
    }
});

document.getElementById("prevPokemon").addEventListener("click", () => {
    if (currentPokemonId > 1) {
        document.getElementById("pokemoninput").value = currentPokemonId - 1;
        getPokemon();
    }
});

document.getElementById("nextPokemon").addEventListener("click", () => {
    if (currentPokemonId !== null) {
        document.getElementById("pokemoninput").value = currentPokemonId + 1;
        getPokemon();
    }
});

async function getPokemon() {
    const nameOrId = document.getElementById("pokemoninput").value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nameOrId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Pokémon não encontrado");
        }
        const data = await response.json();
        displayPokemonDetalhes(data);
        currentPokemonId = data.id; // Atualiza o ID do Pokémon atual
    } catch (error) {
        document.getElementById("pokemonDetalhes").innerHTML = `<p>${error.message}</p>`;
        resetToDefault();
    }
}

function displayPokemonDetalhes(pokemon) {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name);
    const typeColorsArray = types.map(type => typeColors[type]);

    const stats = pokemon.stats.map(statInfo => `<li>${statInfo.stat.name}: ${statInfo.base_stat}</li>`).join("");

    const pokemonDetalhes = `
    <h2 class="titulo">${pokemon.name.toUpperCase()} (#${pokemon.id})<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></h2>
    <ul ><h3>Altura:</h3>${pokemon.height / 10} m</ul>
    <ul  ><h3>Peso:</h3> ${pokemon.weight / 10} kg</ul>
    <ul ><h3>Tipagem:</h3> ${types.join(", ")}</ul>   
    <ul><h3 >Estatísticas Base:</h3>${stats}</ul>
`;

    document.getElementById("pokemonDetalhes").innerHTML = pokemonDetalhes;

    const headerElement = document.querySelector('header');
    if (typeColorsArray.length === 1) {
        document.body.style.background = typeColorsArray[0];
        headerElement.style.color = typeColorsArray[0];
        headerElement.style.borderBottom = "2px solid #000000";
        headerElement.style.boxShadow = " 0 3px 20px #000000";
    } else if (typeColorsArray.length === 2) {
        document.body.style.background = `linear-gradient(to right, ${typeColorsArray[0]} 50%, ${typeColorsArray[1]} 50%)`;
        headerElement.style.color = typeColorsArray[0];
        headerElement.style.borderBottom = "2px solid #000000";
        headerElement.style.boxShadow = " 0 3px 20px #000000";
    }
}

function resetToDefault() {
    document.body.style.background = "#101010";
    const headerElement = document.querySelector('header');
    headerElement.style.background = "";
    headerElement.style.color = "#756b6b";
    headerElement.style.borderBottom = "2px solid #ff0000";
    headerElement.style.boxShadow = " 0 3px 20px #ff0000";
    headerElement.style.color = "#ff0000";
 
}

