// Seleção de elementos do DOM
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

// Definição de constantes e variáveis
const maxRecords = 151
const limit = 5
let offset = 0

// Função para converter dados do Pokémon em HTML
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
                </ol>

                <img 
                    src="${pokemon.photo}" 
                    alt="${pokemon.name}"
                >
            </div>
        </li>
    `
}

// Função para carregar Pokémon na lista
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        // Adicionar evento de clique para redirecionar para cada elemento .pokemon
        const pokemonElements = document.querySelectorAll('.pokemon')
        pokemonElements.forEach((element, index) => {
            element.addEventListener('click', () => {
                const selectedPokemon = pokemons[index]
                sessionStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon))
                window.location.href = 'pokemon-details.html'
            })
        })
    })
}

// Inicialização: carregar primeiros Pokémon
loadPokemonItens(offset, limit)

// Adicionar evento de clique ao botão "Load More"
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        // Se atingir o limite máximo, carregar os últimos Pokémon restantes
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        // Carregar mais Pokémon
        loadPokemonItens(offset, limit)
    } 
})