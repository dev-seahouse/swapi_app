import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './app.scss';
import { People } from './components/people/peopleList.component';
import { Home } from './pages/home.page';

function App() {
  return (
    <div className="container">
      <Router>
        <main>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/people" />
            </Route>
            <Route path="/people" exact>
              <Home />
            </Route>
            <Route path="/people/:personId">
              <div>
                <h1>People Details</h1>
              </div>
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
