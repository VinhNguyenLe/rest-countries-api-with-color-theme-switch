const filterBtn = document.querySelector('.filter-search')
const filterList = document.querySelector('.filter-select')
const filterItems = document.querySelectorAll('.filter-select-item')
const countries = document.querySelector('.countries')
const countriesWrap = document.querySelector('.countries-wrap')
const input = document.querySelector('.input-search-country')
const detail = document.querySelector('.detail')
const backBtn = document.querySelector('.back')
const countryDetail = document.querySelector('.country-detail')
const themeBtn = document.querySelector('.theme')
const themeIcon = document.querySelector('.theme i')
const container = document.querySelector('.container')

const listCountries = []

const countriesURL = 'https://restcountries.com/v2/all'

var getData = async () => {
    var data = await fetch(countriesURL)
        .then(res => res.json())
    return data
}

function renderCountries(callback){
    getData().then(callback)
}

function handler(countries){
    countriesWrap.innerHTML = ``

    countries.forEach((country) => {
        const div = document.createElement('div')
        div.setAttribute('class', 'country')
        div.setAttribute('data-region', country.region)
        div.setAttribute('data-name', country.name)
        listCountries.push(div)
        div.innerHTML = `
            <div class="country-img">
                    <img src="${country.flag}" alt="">
            </div>
            <div class="country-text">
                <h2>${country.name}</h2>
                <p>Population: <span>${country.population.toLocaleString()}</span></p>
                <p class=${country.region}>Region: <span>${country.region}</span></p>
                <p>Capital: <span>${country.capital}</span></p>
            </div>
        `
        countriesWrap.appendChild(div)
    })

    document.querySelectorAll('.country').forEach(item => item.addEventListener('click',(e)=>showModal(e)))
}

renderCountries(handler)

var nameCountry

function showModal(e){
    nameCountry = e.currentTarget
    getData().then(handlerDetail)
    detail.classList.add('show')
    countries.classList.add('hide')
}

function handlerDetail(countries){
    countries.find((country) => {
        var languagesNation = []
        var borderCountries = []
        if(nameCountry.dataset.name == country.name){
            country.languages.forEach(item => {
                languagesNation.push(item.name) 
            })

            if(country.borders){
                country.borders.forEach(item => {
                    borderCountries.push(`<p>${item}</p>`)
                })
            } else{
                borderCountries.push(`<h3 class="no-border">Country has no border!</h3>`)
            }

            countryDetail.innerHTML = `
            <div class="country-detail-img">
                <img src="${country.flag}" alt="">
            </div>
            <div class="country-detail-content">
                <h2 class="country-detail-content-name">${country.name}</h2>
                <div class="country-detail-des">
                    <div class="country-detail-des-item">
                        <p>Native Name: <span>${country.nativeName}</span></p>
                        <p>Population: <span>${country.population.toLocaleString()}</span></p>
                        <p>Region: <span>${country.region}</span></p>
                        <p>Sub Region: <span>${country.subregion}</span></p>
                        <p>Capital: <span>${country.capital}</span></p>
                    </div>
                    <div class="country-detail-des-item">
                        <p>Top Level Domain: <span>${country.topLevelDomain}</span></p>
                        <p>Currencies: <span>${country.currencies[0].code}, ${country.currencies[0].name}, ${country.currencies[0].symbol}</span></p>
                        <p>Languages: <span>${languagesNation.join(', ')}</span></p>
                    </div>
                </div>
                <div class="border-countries">
                    <p>Border Countries:</p>
                    <div class="border-countries-name">
                        ${borderCountries.join('')}
                    </div>
                </div>
            </div>  
            `
        }
    })
}

function searchCountries(search){
    listCountries.forEach(item => {
        if(item.innerText.toLowerCase().includes(search.toLowerCase())){
            item.classList.remove('hide')
        }
        else {
            item.classList.add('hide')
        }
    })
}

input.addEventListener('input', (e) => searchCountries(e.target.value))


filterBtn.addEventListener('click', () => {
    filterList.classList.toggle('show')
})

filterItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const region = e.target.dataset.region
        listCountries.forEach(list => {
            if(region == 'All' || list.dataset.region == region){
                list.classList.remove('hide')
            } else {
                list.classList.add('hide')

            }
        })
    })
})

backBtn.addEventListener('click', () => {
    detail.classList.remove('show')
    countries.classList.remove('hide')
    countryDetail.innerHTML = `<h3 class="loading">Loading...</h3>`
})

var themeText = document.querySelector('.theme-text')

themeBtn.addEventListener('click', () => {
    container.classList.toggle('dark-mode')
    themeBtn.classList.toggle('dark-mode')
    if(document.querySelector('.theme.dark-mode')){
        themeText.innerText = 'Light Mode'
    } else {
        themeText.innerText = 'Dark Mode'
    }
})

