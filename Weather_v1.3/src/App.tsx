import { useState } from "react";
import { Routes, Route } from "react-router";
import { Header } from "./components/header/header";
import { LeftWindow } from "./components/left_window/left_window";
import { Now } from "./components/left_window/now/now";
import { Details } from "./components/left_window/details/details";
import { Forecast } from "./components/left_window/forecast/forecast";
import { RightWindow } from "./components/right_window/right_window";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Header></Header>
      <div className={styles.windows}>
        <Routes>
          <Route path="/Weather/" element={<LeftWindow />}>
            <Route path="/Weather/now" element={<Now></Now>}></Route>
            <Route
              path="/Weather/details"
              element={<Details></Details>}
            ></Route>
            <Route
              path="/Weather/forecast"
              element={<Forecast></Forecast>}
            ></Route>
          </Route>
        </Routes>
        <RightWindow></RightWindow>
      </div>
    </div>
  );
}

export default App;
