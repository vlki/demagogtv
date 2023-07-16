import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import styled, { injectGlobal } from "styled-components";
import { useMatomo } from "@datapunt/matomo-tracker-react";

import Home from "./Home";
import Debate from "./Debate";
import PageNotFound from "./PageNotFound";
import { DEBATES_LIST } from "./data";

const App = () => {
  const { trackPageView } = useMatomo();
  const location = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location]);

  return (
    <AppContainer>
      <Switch>
        <Route exact path="/" component={Home} />
        {DEBATES_LIST.map((debate) => (
          <Route key={debate.path} path={debate.path} component={Debate} />
        ))}
        <Route component={PageNotFound} />
      </Switch>
    </AppContainer>
  );
};

injectGlobal`
  body {
    background-color: #F4F9FD;
    font-family: LatoLatinWeb, sans-serif;
    color: #3C325C;
  }
`;

const AppContainer = styled.div`
  p {
    font-family: LatoLatinWeb, sans-serif;
    font-size: 16px;
    letter-spacing: 0.025em;
    line-height: 1.5;
    color: #3c325c;
  }

  a {
    color: #f26538;
    text-decoration: none;

    &:focus {
      color: #0078a0;
      text-decoration: none;
    }

    &:hover {
      color: #0060ff;
      text-decoration: none;
    }
  }
`;

export default App;
