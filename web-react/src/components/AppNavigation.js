import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './Navigation';
import AddProject from './AddProject';
import HomePage from './Home';

import * as routes from '../constants/routes';

const AppNavigation = () =>
  <Router>
    <div>
      <Navigation />    
    </div>
  </Router>

 export default AppNavigation;
