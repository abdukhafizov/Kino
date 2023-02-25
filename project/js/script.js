import { movies } from './db.js'

let btns = document.querySelectorAll('.promo__menu-item')

btns.forEach((btn) => {
    btn.onclick = (e) => {
        let filter_geners = []
        movies.filter((i) => {
            if(i.Genre.includes(e.target.innerHTML)) {
                filter_geners.push(i)
                reload(filter_geners)
            }
        })
    }
})

let ul = document.querySelector('.promo__interactive-list')
let promo__bg = document.querySelector('.promo__bg')
let name = document.querySelector('.promo__title')
let descr = document.querySelector('.promo__descr')
let genre = document.querySelector('.promo__genre')
let IMDB = document.querySelector('.IDBM')
let kinoP = document.querySelector('.kinoP')
let inpSearch = document.getElementById('search')

inpSearch.onkeyup = () => {
    let search_key = inpSearch.value.trim().toLowerCase()

    let filtered = movies.filter(item => {
        let title = item.Title.toLowerCase()

        if (title.includes(search_key)) {
            return item
        }
    })

    reload(filtered)
}

function reload(arr) {
    ul.innerHTML = ""
    showMovie(arr[0])

    for (let item of arr) {
        let li = document.createElement('li')
        let del = document.createElement('div')

        li.classList.add('promo__interactive-item')
        del.classList.add('delete')

        li.innerHTML = `${arr.indexOf(item) + 1}. ${item.Title}`

        li.append(del)
        ul.append(li)

        li.onclick = () => {
            showMovie(item)
        }
    }
}


reload(movies)



function showMovie(data) {
    promo__bg.style.backgroundImage = `url(${data.Poster})`
    name.innerHTML = data.Title
    descr.innerHTML = data.Plot
    genre.innerHTML = data.Genre
    IMDB.innerHTML = `IMDb: ${data.imdbRating}`
    kinoP.innerHTML = `Кинопоиск: ${data.Metascore}`
    if (name.innerHTML.length > 15) {
        name.innerHTML = name.innerHTML.substring(0, 23) + '...';
    }
}

