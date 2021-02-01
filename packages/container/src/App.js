import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";

import Header from "./component/Header";
import Progress from "./component/Progress";

const MarketingLazy = lazy(() => import("./component/MarketingApp"));
const AuthLazy = lazy(() => import("./component/AuthApp"));
const DashboardLazy = lazy(() => import("./component/DahsboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

const App = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  console.log("Salam");

  useEffect(() => {
    if (isSignIn) {
      history.push("/dashboard");
    }
  }, [isSignIn]);

  return (
    <Router history={history}>
      <StylesProvider {...{ generateClassName }}>
        <Header onSignOut={() => setIsSignIn(false)} {...{ isSignIn }} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthLazy onSignIn={() => setIsSignIn(true)} />
            </Route>
            <Route path="/dashboard">
              {!isSignIn && <Redirect to="/" />}
              <DashboardLazy />
            </Route>

            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};

export default App;
