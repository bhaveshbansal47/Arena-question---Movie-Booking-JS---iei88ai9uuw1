import { fetchMovieAvailability, fetchMovieList } from "./api.js"
const loader = document.getElementById('loader')
const mainNode = document.getElementsByTagName('main')[0]

fetchMovieList().then(function (movies) {
    // part - 2
    loader.remove()
    createMovieCardsUi(movies)
})



// part - 3
function createMovieCardsUi(movies) {
    const movieContainerNode = document.createElement('div')
    movieContainerNode.setAttribute('class', 'movie-holder')
    let movieCardsHtml = ''
    for (const movie of movies) {
        const anchorTagNode = document.createElement('a')
        anchorTagNode.setAttribute('class','movie-link')
        anchorTagNode.innerHTML = `
        <div class="movie" data-d="${movie.name}">
        <div class="movie-img-wrapper" style="background-image: url('${movie.imgUrl}'); background-size: cover;"> 
        </div>
        <h4>${movie.name}</h4>
        </div>
       `
       anchorTagNode.addEventListener('click', function() {
        console.log('hello')
       })
       movieContainerNode.appendChild(anchorTagNode)
    }
    
    mainNode.appendChild(movieContainerNode)
    // bad idea to attach an event listener

    // const movieCards = document.getElementsByClassName('movie-link')
    // for(const movieCard of movieCards) {
    //     movieCard.addEventListener('click', function() {
    //         console.log('hello')
    //     })
    // }
}


