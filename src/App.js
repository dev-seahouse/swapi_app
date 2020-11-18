import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router basename="/people">
      <main>
        <Switch>
          <Route path="/" exact>
            <div className="">
              <h1>People page</h1>
            </div>
          </Route>
          <Route path="/:personId">
            <div className="">
              <h1>People Details</h1>
            </div>
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
