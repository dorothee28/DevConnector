import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  { Fragment } from 'react';

// Redux
import { Provider } from 'react-redux';
import store from './store';


//local import 
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

const App = ()  => {
  return (
    <Provider store={store}>
      <Router>
          <Fragment>
            <Route exact path='/' component={Landing} />
            <section className="container">
              <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>      
            </section>
            <Navbar />
          </Fragment>    
      </Router>
    </Provider> 
  );
}

export default App;
