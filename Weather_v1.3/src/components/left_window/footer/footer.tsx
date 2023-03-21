import React from "react";
import styles from "./footer.module.scss";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className={styles.tabsItems}>
      <NavLink to={"/now"}>Now</NavLink>
      <NavLink to={"/details"}>Details</NavLink>
      <NavLink to={"/forecast"}>Forecast</NavLink>
    </div>
  );
}

export { Footer };
