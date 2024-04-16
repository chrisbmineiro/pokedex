const pokemonLista = document.getElementById('pokemonLista')
const mostrarMais = document.getElementById('mostrarMais')
const limit = 10
let offset = 0;

const maxRecords = 151



function mostrarMaisPokemons(offset, limit) {
    /*function convertendoLista(pokemon) {
        return `<li class="pokemon ${pokemon.tipo}">
            <span class="numero">#${pokemon.numero}</span>
            <span class="nome">${pokemon.nome}</span>
    
            <div class="detalhes">
                <ol class="tipos">
                    ${pokemon.tipos.map((tipo) => `<li class="tipo ${tipo}">${tipo}</li>`).join('')}
                </ol>
    
                <img src="${pokemon.foto}" alt="${pokemon.nome}">
            </div>
        </li>`
    }*/

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newList = pokemons.map((pokemon) => 
            `<li class="pokemon ${pokemon.tipo}">
            <span class="numero">#${pokemon.numero}</span>
            <span class="nome">${pokemon.nome}</span>

            <div class="detalhes">
                <ol class="tipos">
                    ${pokemon.tipos.map((tipo) => `<li class="tipo ${tipo}">${tipo}</li>`).join('')}
                </ol>

                <img src="${pokemon.foto}" alt="${pokemon.nome}">
                </div>
            </li>`
        ).join('')
        pokemonLista.innerHTML += newList
    })
}

mostrarMaisPokemons(offset, limit)

mostrarMais.addEventListener('click', () => {
    offset += limit
    const qtdRecord = offset + limit

    if (qtdRecord >= maxRecords){
        const newLimit = maxRecords - offset 
        mostrarMaisPokemons(offset, newLimit)
        
        mostrarMais.parentElement.removeChild(mostrarMais)

    }
    else{
        mostrarMaisPokemons(offset, limit)
    }
})

/*
    opição 2

    pokeApi.getPokemons().then((pokemons = []) => {

    const newList = pokemons.map((pokemons) => {
        return convertendoLista(pokemons);
    })

    const newHtml = newList.join('')

    pokemonLista.innerHTML += newHtml

})
 
    opição 1

    const listaItems = []

    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        listaItems.push(convertendoLista(pokemon))
    }
    console.log(listaItems);
})*/
