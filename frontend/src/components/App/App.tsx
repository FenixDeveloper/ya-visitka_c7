import React, { FC } from "react";
import styles from "./App.module.css";
import { RouterProvider } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { testUser } from "../../utils/constants";
import { router } from "../../router/router";

const App: FC = () => {
  return (
    <div className={styles.App}>
      <Header user={testUser} />
      <main className={styles.App__main}>
        <RouterProvider router={router} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
