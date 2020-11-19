import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './app.scss';

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/people" />
          </Route>
          <Route path="/people" exact>
            <div className="">
              <h1>People page</h1>
            </div>
          </Route>
          <Route path="/people/:personId">
            <div className="">
              <h1>People Details</h1>
            </div>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
