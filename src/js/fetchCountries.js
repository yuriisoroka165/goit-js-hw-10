 function fetchCountries(country) {
    const queryOptions = '?fields=name,capital,population,flags,languages';
    return fetch(`https://restcountries.com/v3.1/name/${country.toLowerCase()}${queryOptions}`)
    .then(response => {
        return response.json();
    });
}

export { fetchCountries };