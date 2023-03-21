import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/use_typed_selector";
import { setFavoriteCity, deleteFavoriteCity } from "../../../store/reducers";
import { icon } from "../../../modules/icon";
import styles from "./now.module.scss";

function Now() {
  const { city, temp, description } = useTypedSelector(
    (state) => state.weather
  );
  const favorite = useTypedSelector((state) => state.favorite);
  const dispatch = useDispatch();
  return temp ? (
    <div>
      <h1 className={styles.h1}>{temp}</h1>
      <img
        className={styles.icon}
        src={"./img/" + icon(description)}
        alt={description}
      />
      <div className={styles.footerStatus}>
        <p className={styles.p}>{city}</p>
        {favorite.find((cityInFavorite) => cityInFavorite === city) ? (
          <button
            className={styles.buttonFavorite}
            onClick={() => dispatch(deleteFavoriteCity(city))}
          >
            <img src="./img/shaped.png" alt="shaped" />
          </button>
        ) : (
          <button
            className={styles.buttonFavorite}
            onClick={() => dispatch(setFavoriteCity(city))}
          >
            <img src="./img/shape.png" alt="shape" />
          </button>
        )}
      </div>
    </div>
  ) : null;
}

export { Now };
