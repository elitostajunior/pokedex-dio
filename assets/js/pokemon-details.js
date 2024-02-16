document.addEventListener('DOMContentLoaded', () => {
    // Obter elementos do DOM
    const pokemonNameElement = document.getElementById('pokemonName')
    const typesContainerElement = document.getElementById('typesContainer')
    const pokemonImageElement = document.getElementById('pokemonImage')
    const pokemonNumberElement = document.getElementById('pokemonNumber')
    const speciesElement = document.getElementById('species')
    const heightElement = document.getElementById('height')
    const weightElement = document.getElementById('weight')
    const abilitiesElement = document.getElementById('abilities')

    // Obter dados do Pókemon da sessionStorage
    const pokemonDetails = JSON.parse(sessionStorage.getItem('selectedPokemon'))

    // Obtenha o botão de retorno
    const backButton = document.getElementById('backButton')

    // Adicione um evento de clique ao botão de retorno
    backButton.addEventListener('click', () => {
        // Redirecionar o usuário de volta à página principal
        window.location.href = 'index.html'
    })

    // Preencher informações na página de detalhes
    pokemonNameElement.textContent = pokemonDetails.name
    pokemonNumberElement.textContent = `${pokemonDetails.number}`
    pokemonImageElement.src = pokemonDetails.photo

    // Preencher tipos do Pókemon
    pokemonDetails.types.forEach((type) => {
        const typeElement = document.createElement('div')
        typeElement.textContent = type
        typeElement.classList.add('type', type.toLowerCase())
        typesContainerElement.appendChild(typeElement)
    });

    // Preencher informações sobre o Pókemon
    speciesElement.textContent = `Species: ${pokemonDetails.species}`
    heightElement.textContent = `Height: ${pokemonDetails.height} m`
    weightElement.textContent = `Weight: ${pokemonDetails.weight} kg`
    abilitiesElement.textContent = `Abilities: ${pokemonDetails.abilities.join(', ')}`
})