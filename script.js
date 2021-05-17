const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const regionFilters = filterBtn.querySelectorAll('li');
const searchEl = document.getElementById('search');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');

function displayCountries(countries) {
  countriesEl.innerHTML = '';

  countries.forEach(country => {
    const countryEl = document.createElement('div');
    countryEl.classList.add('card');

    countryEl.innerHTML = `
            <div>
                <img src="${country.flag}" alt="${country.name}">
            </div>

            <div class="card-body">
                <h3 class="country-name">${country.name}</h3>
                <p>
                    <strong>Population:</strong>
                    ${
                      country.population
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                     
                    }
                </p>
                <p class="country-region">
                    <strong>Region:</strong>
                    ${country.region}
                </p>
                <p>
                    <strong>Capital:</strong>
                    ${country.capital}
                </p>
            </div>
        `;

    countryEl.addEventListener('click', () => {
      modal.style.display = 'flex';
      showCountryDetails(country);
    });

    countriesEl.appendChild(countryEl);
  });
}

async function getCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();

  displayCountries(countries);
}

getCountries();

// pull additional country data to show in modal
function showCountryDetails(country) {
  const modalBody = modal.querySelector('.modal-body');
  const modalImg = modal.querySelector('img');

  modalImg.src = country.flag;
  modalBody.innerHTML = `
        <h2>${country.name}</h2>
        <p>
            <strong>Native Name: </strong>
            ${country.nativeName}
        </p>
        <p>
            <strong>Population: </strong>
            ${
              country.population
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              // format number as thousands, with comma seperator. Thank you Stack Overflow
            }
        </p>
        <p>
            <strong>Region: </strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region: </strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital: </strong>
            ${country.capital}
        </p>
        <p>
            <strong>Top Level Domain: </strong>
            ${country.topLevelDomain[0]}
        </p>
        <p>
            <strong>Currencies: </strong>
            ${country.currencies.map(currency => currency.name).join(', ')}
        </p>
        <p>
            <strong>Languages: </strong>
            ${country.languages.map(language => language.name).join(', ')}
        </p>
    `;
}

// toggle theme event listener
// toggleBtn.addEventListener('click', () => {
//   document.body.classList.toggle('dark');
// });

// show & hide the filter options list
// filterBtn.addEventListener('click', () => {
//   filterBtn.classList.toggle('open');
// });

// close the modal
// closeBtn.addEventListener('click', () => {
//   modal.style.display = 'none';
// });

// search input function
// searchEl.addEventListener('input', e => {
//   const { value } = e.target;
//   const countryName = document.querySelectorAll('.country-name');

//   countryName.forEach(name => {
//     if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
//       name.parentElement.parentElement.style.display = 'block';
//       // .country-name -> .card-body -> .card
//       // go up two levels to the countryEl.innerHTML; if it matches, display
//     } else {
//       name.parentElement.parentElement.style.display = 'none';
//     }
//   });
// });

// search countries by region; or, add a filter to the 'li's inside the .dropdown
regionFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    const value = filter.innerText;
    const countryRegion = document.querySelectorAll('.country-region');

    countryRegion.forEach(region => {
      if (region.innerText.includes(value) || value === 'All') {
        region.parentElement.parentElement.style.display = 'block';
        // .country-region -> .card-body -> .card
      } else {
        region.parentElement.parentElement.style.display = 'none';
      }
    });
  });
});
