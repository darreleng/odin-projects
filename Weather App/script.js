async function fetchWeatherData() {
    const apiKey = 'NUVLBZD7ELP2B3YATRPSQQ2TK';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchQuery.value}?unitGroup=metric&key=${apiKey}&contentType=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw response;
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.text) {
            error.text().then(errorMessage => {
                console.error('Error response body:', errorMessage);
            });
        } else {
            console.error('Error:', error);
            return null;
        }
    }
};

function updateApp(data) {
    temperature.textContent = data['days']['0']['temp'] + '°';
    feelsLike.textContent = 'Feels like ' + data['days']['0']['feelslike'];
    humidity.textContent = data['days']['0']['humidity'] + '%';
    windSpeed.textContent = data['days']['0']['windspeed'] + ' km/h';
    country.textContent = searchQuery.value;
}

async function handleSearch() {
    const data = await fetchWeatherData();
    updateApp(data);
}

const temperature = document.querySelector('.temperature');
const country = document.querySelector('.country');
const feelsLike = document.querySelector('.feels-like');
const humidity = document.querySelector('.humidity-value');
const windSpeed = document.querySelector('.wind-speed-value');
const temperatureIcon = document.querySelector('.temperature-icon');
const searchForm = document.querySelector('.search-form');
const searchQuery = document.querySelector('#search-query');

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    handleSearch();
});


// fetchWeatherData();


// days.0.temp
// days.0.feelslike
// days.0.humidity
// days.0.windspeed

