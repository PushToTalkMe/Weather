import React from "react";
import { useTypedSelector } from "../../../hooks/use_typed_selector";
import styles from "./details.module.scss";
function Details() {
  const { city, temp, feelsLike, description, sunrise, sunset } =
    useTypedSelector((state) => state.weather);

  return (
    <div>
      <h1 className={styles.h1}>{city}</h1>
      <ul className={styles.details}>
        <li>Temperature: {temp}</li>
        <li>Feels like: {feelsLike}</li>
        <li>Weather: {description}</li>
        <li>Sunrise: {sunrise}</li>
        <li>Sunset: {sunset}</li>
      </ul>
    </div>
  );
}

export { Details };
