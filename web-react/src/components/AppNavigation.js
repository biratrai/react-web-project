import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Navigation from './Navigation';

const AppNavigation = () =>
  <Router>
    <div>
      <Navigation />
    </div>
  </Router>

 export default AppNavigation;
