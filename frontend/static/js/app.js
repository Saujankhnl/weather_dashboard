document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // DOM ELEMENTS
    // ========================================

    const weatherForm = document.getElementById("weather-form");
    const cityInput = document.getElementById("city");
    const searchButton = document.getElementById("search-button");

    const loading = document.getElementById("loading");

    const error = document.getElementById("error");
    const errorMessage = document.getElementById("error-message");

    const cityName = document.getElementById("city-name");
    const weatherDescription =
        document.getElementById("weather-description");

    const weatherIcon =
        document.getElementById("weather-icon");

    const temperature =
        document.getElementById("temperature");

    const feelsLike =
        document.getElementById("feels-like");

    const humidity =
        document.getElementById("humidity");

    const windSpeed =
        document.getElementById("wind-speed");

    const pressure =
        document.getElementById("pressure");

    const visibility =
        document.getElementById("visibility");

    const hourlyForecast =
        document.getElementById("hourly-forecast");

    const dailyForecast =
        document.getElementById("daily-forecast");


    // ========================================
    // LOADING
    // ========================================

    function showLoading() {

        loading.classList.remove("hidden");

        error.classList.add("hidden");

        searchButton.disabled = true;

        searchButton.textContent = "Searching...";

    }


    function hideLoading() {

        loading.classList.add("hidden");

        searchButton.disabled = false;

        searchButton.textContent = "Search";

    }


    // ========================================
    // ERROR
    // ========================================

    function showError(message) {

        errorMessage.textContent = message;

        error.classList.remove("hidden");

    }


    function hideError() {

        error.classList.add("hidden");

    }


    // ========================================
    // WEATHER ICON
    // ========================================

    function getWeatherIcon(condition) {

        if (!condition) {
            return "🌤️";
        }

        const text = condition.toLowerCase();


        if (
            text.includes("thunder") ||
            text.includes("storm")
        ) {
            return "⛈️";
        }


        if (
            text.includes("rain") ||
            text.includes("drizzle")
        ) {
            return "🌧️";
        }


        if (
            text.includes("snow") ||
            text.includes("sleet")
        ) {
            return "🌨️";
        }


        if (
            text.includes("cloud")
        ) {
            return "☁️";
        }


        if (
            text.includes("fog") ||
            text.includes("mist") ||
            text.includes("haze")
        ) {
            return "🌫️";
        }


        if (
            text.includes("clear") ||
            text.includes("sunny") ||
            text.includes("sun")
        ) {
            return "☀️";
        }


        return "🌤️";
    }


    // ========================================
    // UPDATE CURRENT WEATHER
    // ========================================

    function updateCurrentWeather(data) {

        cityName.textContent =
            data.city || "Unknown City";


        weatherDescription.textContent =
            data.description || "Weather information";


        temperature.textContent =
            `${data.temperature ?? "--"}°C`;


        feelsLike.textContent =
            `${data.feels_like ?? "--"}°C`;


        humidity.textContent =
            `${data.humidity ?? "--"}%`;


        windSpeed.textContent =
            `${data.wind_speed ?? "--"} km/h`;


        pressure.textContent =
            `${data.pressure ?? "--"} hPa`;


        visibility.textContent =
            `${data.visibility ?? "--"} km`;


        weatherIcon.textContent =
            data.icon ||
            getWeatherIcon(data.description);

    }


    // ========================================
    // HOURLY FORECAST
    // ========================================

    function renderHourlyForecast(hours) {

        hourlyForecast.innerHTML = "";


        if (!hours || hours.length === 0) {

            hourlyForecast.innerHTML = `
                <div class="w-full rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-400">
                    No hourly forecast available.
                </div>
            `;

            return;

        }


        hours.forEach((hour, index) => {

            const card =
                document.createElement("div");


            card.className = `
                min-w-[120px]
                flex-1
                rounded-2xl
                border
                border-slate-100
                bg-slate-50
                p-4
                text-center
                transition
                hover:-translate-y-1
                hover:bg-sky-50
                hover:border-sky-100
            `;


            const icon =
                hour.icon ||
                getWeatherIcon(hour.description);


            const time =
                index === 0
                    ? "Now"
                    : hour.time || "--";


            card.innerHTML = `

                <p class="text-sm font-semibold text-slate-600">
                    ${time}
                </p>

                <div class="my-4 text-4xl">
                    ${icon}
                </div>

                <p class="text-xl font-bold text-slate-800">
                    ${hour.temperature ?? "--"}°
                </p>

                <p class="mt-2 text-xs text-slate-400">
                    ${hour.description || ""}
                </p>

            `;


            hourlyForecast.appendChild(card);

        });

    }


    // ========================================
    // DAILY FORECAST
    // ========================================

    function renderDailyForecast(days) {

        dailyForecast.innerHTML = "";


        if (!days || days.length === 0) {

            dailyForecast.innerHTML = `
                <div class="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-400">
                    No daily forecast available.
                </div>
            `;

            return;

        }


        days.forEach((day, index) => {

            const row =
                document.createElement("div");


            row.className = `
                grid
                grid-cols-2
                items-center
                gap-4
                rounded-2xl
                p-4
                transition
                hover:bg-sky-50
                sm:grid-cols-4
            `;


            const icon =
                day.icon ||
                getWeatherIcon(day.description);


            const dayName =
                index === 0
                    ? "Today"
                    : day.day || "--";


            row.innerHTML = `

                <!-- Day -->

                <div>

                    <p class="font-semibold text-slate-800">
                        ${dayName}
                    </p>

                    <p class="mt-1 text-xs text-slate-400">
                        ${day.date || ""}
                    </p>

                </div>


                <!-- Weather -->

                <div class="flex items-center gap-3">

                    <span class="text-3xl">
                        ${icon}
                    </span>

                    <span class="hidden text-sm text-slate-500 sm:block">
                        ${day.description || ""}
                    </span>

                </div>


                <!-- Temperature -->

                <div class="text-left sm:text-center">

                    <span class="font-bold text-slate-800">
                        ${day.max_temperature ?? "--"}°
                    </span>

                    <span class="ml-2 text-slate-400">
                        ${day.min_temperature ?? "--"}°
                    </span>

                </div>


                <!-- Humidity -->

                <div class="text-right">

                    <span class="text-xs text-slate-400">
                        💧
                    </span>

                    <span class="ml-1 text-sm font-medium text-slate-500">
                        ${day.humidity ?? "--"}%
                    </span>

                </div>

            `;


            dailyForecast.appendChild(row);

        });

    }


    // ========================================
    // FETCH WEATHER
    // ========================================

    async function fetchWeather(city) {

        showLoading();

        hideError();


        try {

            /*
                Change this URL if your Django
                API endpoint is different.
            */

            const url =
                `/api/weather/?city=${encodeURIComponent(city)}`;


            const response =
                await fetch(url, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    data.detail ||
                    "Unable to get weather data."
                );

            }


            // Update current weather

            updateCurrentWeather(data);


            // Update hourly forecast

            renderHourlyForecast(
                data.hourly_forecast ||
                data.hourly ||
                []
            );


            // Update daily forecast

            renderDailyForecast(
                data.daily_forecast ||
                data.daily ||
                []
            );


        } catch (err) {

            console.error(
                "Weather Error:",
                err
            );


            showError(
                err.message ||
                "Something went wrong while loading weather."
            );

        } finally {

            hideLoading();

        }

    }


    // ========================================
    // SEARCH FORM
    // ========================================

    weatherForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const city =
                cityInput.value.trim();


            if (!city) {

                showError(
                    "Please enter a city name."
                );

                cityInput.focus();

                return;

            }


            fetchWeather(city);

        }
    );


    // ========================================
    // ENTER KEY
    // ========================================

    cityInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                weatherForm.requestSubmit();

            }

        }
    );


    // ========================================
    // DEFAULT CITY
    // ========================================

    fetchWeather("Kathmandu");

});