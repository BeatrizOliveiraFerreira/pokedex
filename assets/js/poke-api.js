const pokeApi = {
    getPokemonDetail: async (pokemon) => {
      const response = await fetch(pokemon.url);
      const pokeDetail = await response.json();
  
      return convertPokeApiDetailToPokemon(pokeDetail);
    },
  
    getPokemons: async (offset = 0, limit = 5) => {
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
      const response = await fetch(url);
      const jsonBody = await response.json();
      const pokemons = jsonBody.results;
  
      const detailRequests = pokemons.map((pokemon) => pokeApi.getPokemonDetail(pokemon));
      const pokemonsDetails = await Promise.all(detailRequests);
  
      return pokemonsDetails;
    },
  };
  
  function convertPokeApiDetailToPokemon(pokeDetail) {
    const { id, name, types, sprites } = pokeDetail;
    const pokemon = new Pokemon();
    pokemon.number = id;
    pokemon.name = name;
    pokemon.types = types.map((typeSlot) => typeSlot.type.name);
    pokemon.type = pokemon.types[0];
    pokemon.photo = sprites.other.dream_world.front_default;
  
    return pokemon;
  }
  