import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputField: document.querySelector('#search-box'),
    requestList: document.querySelector('.country-list'),
    countryInfoContainer: document.querySelector('.country-info'),
}

refs.inputField.addEventListener('input', debounce(onInputField, DEBOUNCE_DELAY));

function onInputField(event) {
    fetchCountries(event.target.value)
        .then(countries => {
            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                refs.requestList.innerHTML = '';
            } else if (countries.length > 2 && countries.length < 10) {
                refs.requestList.insertAdjacentHTML('beforeend', listItemsMarkup(countries));
                refs.countryInfoContainer.innerHTML = '';
            } else if (countries.length === 1) {
                refs.countryInfoContainer.insertAdjacentHTML('beforeend', countryCardMarkup(countries));
                refs.requestList.innerHTML = '';
            } else if (!countries) {
                Notiflix.Notify.failure('Qui timide rogat docet negare');
            }
        })
        .catch(error => {
            Notiflix.Notify.failure('Qui timide rogat docet negare');
        })
}

function listItemsMarkup(countries) {
    return countries
        .map(({ name, flags }) => {
            return `
                <li class="country-item">
                     <img src="${flags.svg}" alt="${name.official}" width="40" height="20">
                     <p class="contry-name">${name.official}</p>
                </li >
            `;}).join('');
}

function countryCardMarkup(country) {
    return country
        .map(({ name, flags, capital, population, languages }) => {
            return `
                <div class="country-flagname">
                    <img src="${flags.svg}" alt="${name.official}" width="80" height="40">
                    <h2>${name.official}</h2>
                </div>
                <p><span class="country-property">Capital: </span>${capital}</p>
                <p><span class="country-property">Population: </span>${population}</p>
                <p><span class="country-property">Languages: </span>${Object.values(languages)}</p>
            `;}).join('');
}


// const country = fetchCountries('Uk');

// country
//     .then(result => {
//         console.log(result);
//     })


// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');