const pokemonName = document.querySelector('.pokemon-name');
const pokemonID = document.querySelector('.pokemon-id');
const pokemonImg = document.querySelector('.pokemon-img');

// const pokemonType = document.querySelector('.pokemon-type-name');
const pokemonTypeImg = document.querySelector('.pokemon-type-img');

// const pokemonTypeSec = document.querySelector('.pokemon-type-sec-name');
// const pokemonTypeImgSec = document.querySelector('.pokemon-type-img-sec');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonID.innerHTML = '';

  const data = await fetchPokemon(pokemon);
    
  if(data){
    console.log(data);
    pokemonImg.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonID.innerHTML = data.id;

    //pokemonType.innerHTML = data.types[0].type.name;
    pokemonTypeImg.src = `./img/icons/${data.types[0].type.name}.ico`;
    // if(data.types[1]){
    //   pokemonTypeSec.innerHTML = data.types[1].type.name;
    //   pokemonTypeImgSec.src = `./img/icons/${data.types[1].type.name}.ico`;
    // }
    // pokemonTypeSec.innerHTML = data.types[1].type.name;
    // pokemonTypeImgSec.src = `./img/icons/${data.types[1].type.name}.ico`;
    
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImg.style.display = 'none';
    pokemonName.innerHTML = 'Not Found...';
    pokemonID.innerHTML = 'X';
  }
}

form.addEventListener('submit', (event)=>{
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

prev.addEventListener('click', ()=>{
  if(searchPokemon>1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

next.addEventListener('click', ()=>{
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);