import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { testUser } from "../../utils/constants";

const App: FC = () => {
  return (
    <>
      <Header user={testUser} />
      <main>
        <Routes>
          <Route path="/" element="" />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
