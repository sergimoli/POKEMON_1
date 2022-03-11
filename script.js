const gallery$$ = document.getElementById("gallery");
const numMaxPokemonToGet = 150;
const allPokemons = []; //TODO: Get all pokemons and do a search by name...
//color control
const colors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};
const main_types = Object.keys(colors);

function search() {
  for (let index = 1; index <= numMaxPokemonToGet; index++) {
    getPokemon(index);
  }
}

//check url and get info from the pokemon
async function getPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((resParsedToJSON) => {
      createPokemonCard(resParsedToJSON);
    });
}

const createPokemonCard = (card) => {
  allPokemons.push(card);
  console.log("allPokemons", allPokemons);
  const div$$ = document.createElement("div");
  div$$.classList.add("pokemon");

  const id$$ = card.id.toString().padStart(3, "0");
  const image$$ = card.sprites.other.dream_world.front_default;
  const name$$ = card.name[0].toUpperCase() + card.name.slice(1); //first letter in uppercase
  const types$$ = card.types.map((type) => type.type.name); //extract, normally we have two values like: 'grass' and 'poison'
  console.log(types$$);
  const type$$ = main_types.find((type) => types$$.indexOf(type) == 0); //search inside object colors type == 0 (type of the pokemon)
  const color$$ = colors[type$$];
  console.log("card", card);
  div$$.style.backgroundColor = color$$;
  //
  const pokemonInnerHTML = `   
    <span class="number">#${id$$}</span>
    <div class="img-container">    
      <img src="${image$$}" alt="">
    </div>
    <div class="info">            
        <h4 class="name">${name$$}</h4>
        <div class="type">
            Type: <span>${type$$}</span> 
        </div>
    </div>
    `;

  div$$.innerHTML = pokemonInnerHTML;

  gallery$$.appendChild(div$$);
};

search();
