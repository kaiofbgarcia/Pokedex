const pokemonName = document.querySelector('.pokemon-name');
const pokemonID = document.querySelector('.pokemon-id');
const pokemonImg = document.querySelector('.pokemon-img');

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
    pokemonImg.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonID.innerHTML = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
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