import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Header from "./component/Header";
import Progress from "./component/Progress";

const MarketingLazy = lazy(() => import("./component/MarketingApp"));
const AuthLazy = lazy(() => import("./component/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const App = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <BrowserRouter>
      <StylesProvider {...{ generateClassName }}>
        <Header onSignOut={() => setIsSignIn(false)} {...{ isSignIn }} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthLazy onSignIn={() => setIsSignIn(true)} />
            </Route>
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
