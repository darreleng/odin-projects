async function fetchWeatherData() {
    const APIkey = 'NUVLBZD7ELP2B3YATRPSQQ2TK';
    
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/singapore?unitGroup=metric&key=NUVLBZD7ELP2B3YATRPSQQ2TK&contentType=json');
    return data = response.json();
}

fetchWeatherData();
console.log(data)