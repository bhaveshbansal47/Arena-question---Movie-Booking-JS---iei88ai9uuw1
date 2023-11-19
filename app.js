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
    for (const movie of movies) {
        const anchorTagNode = document.createElement('a')
        anchorTagNode.setAttribute('class', 'movie-link')
        anchorTagNode.innerHTML = `
        <div class="movie" data-d="${movie.name}">
        <div class="movie-img-wrapper" style="background-image: url('${movie.imgUrl}'); background-size: cover;"> 
        </div>
        <h4>${movie.name}</h4>
        </div>
       `
        anchorTagNode.addEventListener('click', function () {
            showSeats(movie.name)
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

function showSeats(movieName) {
    mainNode.appendChild(loader)
    fetchMovieAvailability(movieName).then(function (availableSeats) {
        loader.remove()
        // removeVNoneClasses()
        removeVNoneClasseFromH3()
        createSeatsUi(availableSeats)
    })
}

function createSeatsUi(availableSeats) {
    const bookerGridHolderNode = document.getElementById('booker-grid-holder')
    bookerGridHolderNode.innerHTML = ''
    for (let i = 1; i <= 2; i++) {
        const bookingGridNode = document.createElement('div')
        bookingGridNode.setAttribute('class', 'booking-grid')
        for (let j = ((i - 1) * 12) + 1; j <= i * 12; j++) {
            const bookingGridCellNode = document.createElement('div')
            bookingGridCellNode.setAttribute('id', `booking-grid-${j}`)
            const available = availableSeats.includes(j)
            if(available) {
                bookingGridCellNode.style.backgroundColor =  'green'
                bookingGridCellNode.setAttribute('class', 'available-seat')
                bookingGridCellNode.addEventListener('click', selectSeat)
            } else {
                bookingGridCellNode.style.backgroundColor =  'red'
                bookingGridCellNode.setAttribute('class', 'unavailable-seat')
            }
            

            bookingGridCellNode.innerText = j
            bookingGridNode.appendChild(bookingGridCellNode)
        }
        bookerGridHolderNode.appendChild(bookingGridNode)
    }
}

function selectSeat() {
    // this keyword here points to the node clicked
    this.classList.toggle('selected-seat')
}

function removeVNoneClasseFromH3() {
    const h3Node = document.querySelector('#booker h3')
    h3Node.classList.remove('v-none')
}

function makeGrids() {
    // home work

}


