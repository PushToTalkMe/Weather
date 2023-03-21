import React from "react";
import { useTypedSelector } from "../../../../hooks/use_typed_selector";
import { icon } from "../../../../modules/icon";
import styles from "./card.module.scss";

function Card() {
  const list = useTypedSelector((state) => state.forecast.list);

  return list.map((card: any, index: any) => {
    const { temp, feelsLike, description, time, date } = card;
    return (
      <div className={styles.card} key={index}>
        <div className={styles.date}>
          <span>{date}</span>
          <span>{time}</span>
        </div>
        <div className={styles.details}>
          <ul>
            <li className={styles.detail}>Temperature: {temp}</li>
            <li className={styles.detail}>Feels like: {feelsLike}</li>
          </ul>
          <div>
            <img
              src={"src/assets/img/" + icon(description)}
              alt={description}
            />
          </div>
        </div>
      </div>
    );
  });
}

export { Card };
