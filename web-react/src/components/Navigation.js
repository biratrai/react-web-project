import React from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Avatar, RaisedButton} from "material-ui";
import * as routes from '../constants/routes';

const Navigation = () =>
  <div>
    <ul>

      <li><Link to={routes.ADD_PROJECT}>Add Project</Link></li>

      <li><Link to={routes.HOME}>Home</Link></li>
    </ul>
  </div>

export default Navigation;
