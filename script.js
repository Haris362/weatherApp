function weatherFunction() {
    const searchButton = document.getElementById("search-icon");

    searchButton.addEventListener("click", async () => {
        const city = document.getElementById("city").value;
        const key = `64383eaff8a68d22420b853da5794636`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

        if (city === "") {
            alert("Please enter the city name");
            return;
        }

        document.querySelector(".loader").style.display = 'block';

    
        setTimeout(async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();

                // Weather image        
                const weatherImg = document.getElementById("weather-img");
                const img = data.weather[0].icon;
                const imgUrl = `https://openweathermap.org/img/wn/${img}@2x.png`;
                weatherImg.src = imgUrl;

                document.querySelector(".forecast").style.display = `flex`;
                document.querySelector(".message").style.display = `none`;
                document.querySelector(".location").textContent = `${data.name}`
                document.querySelector("#weather-img").style.display = `block`
                //Wind speed    
                const ms = data.wind["speed"];
                const kmh = ms *3.6;
                document.getElementById("windSpeed").textContent = `${Math.floor(kmh)}Km/h`;

                // Temperature
                document.getElementById("temprature").textContent = `${Math.floor(data.main["temp"])}°C`;

                // Humidity
                document.getElementById("humidity").textContent = `${data.main.humidity}%`;

                // Cloudiness
                document.getElementById("cloudiness").textContent = `${data.clouds.all}%`;

                function backgroundChanger() {
                    const weather = data.weather[0].main;
                    const container = document.getElementById("container");

                    switch (weather.toLowerCase()) {
                        case "clear":
                            container.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
                            break;
                        case "clouds":
                            container.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
                            break;
                        case "rain":
                            container.style.background = "linear-gradient(135deg, #4b79a1, #283e51)";
                            break;
                        case "thunderstorm":
                            container.style.background = "linear-gradient(135deg, #141e30, #243b55)";
                            break;
                        case "snow":
                            container.style.background = "linear-gradient(135deg, #e6dada, #274046)";
                            break;
                        case "mist":
                        case "fog":
                            container.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
                            break;
                        default:
                            container.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
                            break;
                    }
                }

                backgroundChanger();

            } catch (error) {
                console.log("Network error", error);
            } finally {
                document.querySelector(".loader").style.display = 'none';
            }
        }, 1000); 
    });
}

weatherFunction();
