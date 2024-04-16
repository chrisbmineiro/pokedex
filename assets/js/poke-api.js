const pokeApi = {}

function convertendoApiDetail(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.numero = pokeDetail.id
    pokemon.nome = pokeDetail.name
    
    const tipos = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [tipo] = tipos

    pokemon.tipos = tipos
    pokemon.tipo = tipo

    pokemon.foto = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
    .then(convertendoApiDetail)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails
        )



        .catch((error) => console.log(error))


}
