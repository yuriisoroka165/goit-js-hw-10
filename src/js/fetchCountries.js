function fetchCountries(country) {
    const queryOptions = '?fields=name,capital,population,flags,languages';
    return fetch(`https://restcountries.com/v3.1/name/${country.toLowerCase()}${queryOptions}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
}

export { fetchCountries };