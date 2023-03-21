import React from "react";
import { useTypedSelector } from "../../hooks/use_typed_selector";
import { useDispatch } from "react-redux";
import {
  fetchWeather,
  setCurrentCity,
  fetchForecast,
  deleteFavoriteCity,
} from "../../store/reducers";
import styles from "./right_window.module.scss";

function RightWindow() {
  const favorite = useTypedSelector((state) => state.favorite);
  const dispatch = useDispatch();

  return (
    <div className={styles.rightWindow}>
      <h1>Added Locations:</h1>
      <div>
        <ul>
          {favorite.map((city, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  dispatch(setCurrentCity(city));
                  dispatch(fetchWeather(city));
                  dispatch(fetchForecast(city));
                }}
              >
                {city}
                <button
                  className={styles.buttonDelete}
                  onClick={() => dispatch(deleteFavoriteCity(city))}
                >
                  <img src="src/assets/img/close.png" alt="delete" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export { RightWindow };
