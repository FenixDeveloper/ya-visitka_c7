import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { testUser } from "../../utils/constants";
import styles from "./App.module.scss";

const App: FC = () => {
  return (
    <>
      <Header user={testUser} />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element="" />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
