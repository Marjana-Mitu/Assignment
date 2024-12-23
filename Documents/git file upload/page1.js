<<<<<<< HEAD
// Fetch Country Data
function fetchCountryData() {
    const searchTerm = document.getElementById("searchBox").value.trim();
    if (searchTerm === "") {
        alert("Please enter a country name.");
        return;
    }

    const loading = document.getElementById("loading");
    loading.classList.remove("d-none");

    const countryUrl = `https://restcountries.com/v3.1/name/${searchTerm}`;
    fetch(countryUrl)
        .then(res => {
            if (!res.ok) throw new Error("Country not found");
            return res.json();
        })
        .then(data => {
            loading.classList.add("d-none");
            displayCountryData(data);
        })
        .catch(error => {
            loading.classList.add("d-none");
            alert(error.message);
        });
}

// Display Country Data
function displayCountryData(data) {
    const displayArea = document.getElementById("displayArea");
    displayArea.innerHTML = ""; // Clear previous results

    data.forEach(country => {
        const countryDiv = document.createElement("div");
        countryDiv.classList.add("innerDivStyle");

        countryDiv.innerHTML = `
            <h4>${country.name.common}</h4>
            <img src="${country.flags.png}" alt="${country.name.common} Flag">
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <button class="btn btn-info mt-2" onclick="fetchWeatherAndMap('${country.name.common}', ${country.latlng[0]}, ${country.latlng[1]})">Show Weather & Map</button>
            <div id="weather-${country.name.common}" class="mt-3"></div>
            <div id="map-${country.name.common}" class="mt-3" style="height: 300px;"></div>
        `;

        displayArea.appendChild(countryDiv);
    });
}

// Fetch Weather Data and Initialize Map
function fetchWeatherAndMap(countryName, lat, lng) {
    const weatherApiKey = "333267df233e96050e93e5cdc0b0274b"; // Your OpenWeatherMap API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherApiKey}&units=metric`;

    // Fetch Weather Data
    fetch(weatherUrl)
        .then(res => {
            if (!res.ok) throw new Error("Weather data not found");
            return res.json();
        })
        .then(data => {
            const weatherDiv = document.getElementById(`weather-${countryName}`);
            weatherDiv.innerHTML = `
                <h5>Current Weather</h5>
                <p><strong>Condition:</strong> ${data.weather[0].description}</p>
                <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;

            // Initialize Map
            initMap(countryName, lat, lng);
        })
        .catch(error => {
            alert(error.message);
        });
}

// Initialize Map using Leaflet
function initMap(countryName, lat, lng) {
    const mapDiv = document.getElementById(`map-${countryName}`);
    mapDiv.innerHTML = ""; // Clear previous map content

    const map = L.map(mapDiv).setView([lat, lng], 6); // Set view and zoom level

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add marker
    L.marker([lat, lng]).addTo(map).bindPopup(`<b>${countryName}</b>`).openPopup();
}

=======
// function connect() {
//     var searchTerm = document.getElementById("searchBox").value;
//     document.getElementById("searchBox").value = "";
//     var url = `https://restcountries.com/v3.1/name/${searchTerm}`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => display(data));
// }
// function display(data) { 
//     console.log(data);
//     var oldContent = document.getElementById("displayArea");
//     oldContent.textContent = "";

//     for (i = 0; i < data.length; i++) {
//         var country = data[i];
//         var newDiv = document.createElement("div");
//         newDiv.innerHTML = `
//             Name: ${country.name.common} <br>
//             <img src="${country.flags.png}"> <br>
//             Region: ${country.region} <br>
//             Population:${country.population} <br>
//             Languages: ${country.languages}<br>
//             Currencies:${country.currencies} <br>
//         `;
//         newDiv.classList.add("innerDivStyle");
//         oldContent.appendChild(newDiv);
//     }
// }

function api(){
    var key = "90c83bb349204a5e98535539240312";
    var url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=Dhaka&days=3&aqi=no&alerts=no`;

    fetch(url)
        .then(res => res.json())
        .then(data => display(data));
}

function display(data){
    var results = data.current;  
    console.log(results);

    newDiv.innerHTML = `Weather condition: ${results.condition.text} <br>
        Temperature: ${results.temp_c} °C <br>
        <img src="http:${results.condition.icon}" alt="Weather Icon"> <br>
        <br><br><br>`;
    newDiv.classList.add("innerDivStyle");
    oldContent.appendChild(newDiv);
}
>>>>>>> 6aa37c68f93f9a2a54de91bdbe6948b9ad9604be
