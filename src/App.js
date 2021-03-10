import React from 'react';
import ProductPage from './pages/ProductPage/ProductPage';
import PageNotFound from './pages/PageNotFound';
import { Route, Switch } from 'react-router-dom';

const App = () => (
  <div>
    <Switch>
      <Route path={'/'} exact component={ProductPage} />
      <Route component={PageNotFound}></Route>
    </Switch>
  </div>
);

export default App;
