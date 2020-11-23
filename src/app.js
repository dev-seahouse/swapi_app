import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import "./app.scss";
import { HomePage } from "./pages/home.page";
import { PersonPage } from "./pages/person.page";

function App() {
  return (
    <div className="container">
      <Router>
        <main>
          <Switch>
            <Route exact path="/">
              <Redirect to="/people" />
            </Route>
            <Route exact path="/people" component={HomePage} />
            <Route path="/people/:personId" component={PersonPage} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
