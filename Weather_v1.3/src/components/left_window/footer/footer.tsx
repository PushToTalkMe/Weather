import React from "react";
import styles from "./footer.module.scss";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className={styles.tabsItems}>
      <NavLink to={"/Weather/now"}>Now</NavLink>
      <NavLink to={"/Weather/details"}>Details</NavLink>
      <NavLink to={"/Weather/forecast"}>Forecast</NavLink>
    </div>
  );
}

export { Footer };
