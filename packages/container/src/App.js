import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import MarketingApp from "./component/MarketingApp";
import Header from "./component/Header";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const App = () => {
  return (
    <BrowserRouter>
      <StylesProvider {...{ generateClassName }}>
        <Header />
        <MarketingApp />
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
