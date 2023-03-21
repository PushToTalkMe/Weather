import React from "react";
import { useTypedSelector } from "../../../hooks/use_typed_selector";
import { Card } from "./card/card";
import styles from "./forecast.module.scss";
function Forecast() {
  const city = useTypedSelector((state) => state.forecast.city);
  return city ? (
    <div className={styles.forecast}>
      <h1>{city}</h1>
      <Card />
    </div>
  ) : null;
}

export { Forecast };
