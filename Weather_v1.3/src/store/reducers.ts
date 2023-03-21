import {
  createAsyncThunk,
  createSlice,
  current,
  isRejected,
} from "@reduxjs/toolkit";

const serverUrlWeather = "http://api.openweathermap.org/data/2.5/weather";
const serverUrlForecast = "http://api.openweathermap.org/data/2.5/forecast";
const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";

const optionsTime = { hour: "numeric", minute: "numeric" };
const optionsDate = { month: "long", day: "numeric" };

const currentCityJson = localStorage.getItem("currentCity");
const favoriteJson = localStorage.getItem("favorite");
const weatherJson = localStorage.getItem("weather");
const forecastJson = localStorage.getItem("forecast");

const initState = {
  isFetching: false,
  didInvalidate: false,
  currentCity: currentCityJson !== null ? JSON.parse(currentCityJson) : "",
  favorite: favoriteJson !== null ? JSON.parse(favoriteJson) : <any>[],
  weather: weatherJson !== null ? JSON.parse(weatherJson) : <any>{},
  forecast: forecastJson !== null ? JSON.parse(forecastJson) : <any>{},
};

const fetchWeather = createAsyncThunk(
  "data/fetchWeather",
  async (currentCity, thunkAPI) => {
    const response = await fetch(
      `${serverUrlWeather}?q=${currentCity}&appid=${apiKey}`
    );
    if (response.status !== 200) {
      alert("Введите корректное имя");
      return isRejected();
    }
    const weather = await response.json();
    const city = weather.name;
    const temp = Math.floor(weather.main.temp - 273.15) + "°";
    const feelsLike = Math.floor(weather.main.feels_like - 273.15) + "°";
    const description =
      weather.weather[0].description[0].toLowerCase() +
      weather.weather[0].description.slice(1);
    const dateNow = new Date(Date.now());
    const sunrise = new Date(
      weather.sys.sunrise * 1000 +
        dateNow.getTimezoneOffset() * 60000 +
        weather.timezone * 1000
    ).toLocaleTimeString();
    const sunset = new Date(
      weather.sys.sunset * 1000 +
        dateNow.getTimezoneOffset() * 60000 +
        weather.timezone * 1000
    ).toLocaleTimeString();
    localStorage.setItem(
      "weather",
      JSON.stringify({ city, temp, feelsLike, description, sunrise, sunset })
    );
    return { city, temp, feelsLike, description, sunrise, sunset };
  }
);

const fetchForecast = createAsyncThunk(
  "data/fetchForecast",
  async (currentCity, thunkAPI) => {
    const response = await fetch(
      `${serverUrlForecast}?q=${currentCity}&appid=${apiKey}`
    );
    if (response.status !== 200) {
      return isRejected();
    }
    const forecast = await response.json();
    const city = forecast.city.name;
    const timezone = forecast.city.timezone;
    const list = forecast.list.map((card: any) => {
      const temp = Math.floor(card.main.temp - 273.15) + "°";
      const feelsLike = Math.floor(card.main.feels_like - 273.15) + "°";
      const description =
        card.weather[0].description[0].toLowerCase() +
        card.weather[0].description.slice(1);

      const dateForecast = new Date(
        card.dt * 1000 +
          new Date(Date.now()).getTimezoneOffset() * 60000 +
          timezone * 1000
      );

      const time = dateForecast.toLocaleTimeString(["en-Gb"], optionsTime);
      const date = dateForecast.toLocaleDateString(["en-Gb"], optionsDate);
      return {
        temp,
        feelsLike,
        description,
        time,
        date,
      };
    });
    localStorage.setItem("forecast", JSON.stringify({ city, list }));
    return { city, list };
  }
);

const data = createSlice({
  name: "data",
  initialState: initState,
  reducers: {
    setCurrentCity(state: any, action: any) {
      state.currentCity = action.payload;
      localStorage.setItem("currentCity", JSON.stringify(state.currentCity));
    },
    setFavoriteCity(state: any, action: any) {
      state.favorite.push(action.payload);
      localStorage.setItem("favorite", JSON.stringify(state.favorite));
    },
    deleteFavoriteCity(state: any, action: any) {
      state.favorite = state.favorite.filter((city) => city !== action.payload);
      localStorage.setItem("favorite", JSON.stringify(state.favorite));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.isFetching = true;
    }),
      builder.addCase(fetchWeather.fulfilled, (state, action) => {
        state.isFetching = false;
        state.weather = action.payload;
      }),
      builder.addCase(fetchForecast.fulfilled, (state, action) => {
        state.isFetching = false;
        state.forecast = action.payload;
      });
  },
});

const { actions, reducer } = data;
export const { setCurrentCity, setFavoriteCity, deleteFavoriteCity } = actions;

export { reducer, fetchWeather, fetchForecast };
