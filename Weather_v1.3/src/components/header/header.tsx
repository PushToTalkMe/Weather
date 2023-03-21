import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/use_typed_selector";
import {
  fetchWeather,
  setCurrentCity,
  fetchForecast,
} from "../../store/reducers";
import styles from "./header.module.scss";

function Header() {
  const name = useTypedSelector((state) => state.currentCity);
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const currentCity = e.target[0].value;
    dispatch(setCurrentCity(currentCity));
    dispatch(fetchWeather(currentCity));
    dispatch(fetchForecast(currentCity));
  };

  return (
    <form className={styles.search} onSubmit={(e) => handleSubmit(e)}>
      <input type="text" defaultValue={name} placeholder="Город" />
      <button className={styles.buttonSearch}>
        <img src="./img/search.png" alt="Поиск" />
      </button>
    </form>
  );
}

export { Header };
