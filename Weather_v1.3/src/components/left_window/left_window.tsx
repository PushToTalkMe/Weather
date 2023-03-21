import React from "react";
import styles from "./left_window.module.scss";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer/footer";

function LeftWindow() {
  return (
    <div className={styles.leftWindow}>
      <div className={styles.status}>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}

export { LeftWindow };
