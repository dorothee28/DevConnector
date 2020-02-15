import React from 'react';
import  { Fragment } from 'react'

//local import 
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

import './App.css';

const App = ()  => {
  return (
    <Fragment>
      <Landing />
      <Navbar />

    </Fragment>
  );
}

export default App;
