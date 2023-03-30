import React, { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../../router/router";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import { testUser } from "../../utils/constants";

const App: FC = () => {
  return (
    <>
      <header>
        <Login user={testUser} />
      </header>
      <main>
        <RouterProvider router={router} />
      </main>
      <Footer />
    </>
  );
};

export default App;
