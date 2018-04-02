import React from 'react';
import {Avatar, RaisedButton} from "material-ui";
import {logout} from "../helpers/auth";
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const appTokenKey = "appToken"; // also duplicated in Login.js

const RenderLogOut = props =>  (

      <MuiThemeProvider>
        <div>
            <RaisedButton
                backgroundColor="#a4c639"
                labelColor="#ffffff"
                label="Sign Out"
                onTouchTap={this.handleLogout}
            />
        </div>
      </MuiThemeProvider>
);

const RenderProject = props => (
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <a href="">Link to project</a>
        </div>
);

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //firebaseUser: JSON.parse(localStorage.getItem("firebaseUser"))
        };

        //console.log("User:", this.state.firebaseUser);
        this.handleLogout = this.handleLogout.bind(this);
        // this.renderLogOut = this.renderLogOut.bind(this);
        // this.renderProject = this.renderProject.bind(this);
    }

    handleLogout() {
        logout().then(function () {
            localStorage.removeItem(appTokenKey);
            this.props.history.push("/login");
            console.log("user signed out from firebase");
        });
    }

	render() {
    	return (
			     <div>
              <h1>List of project submitted</h1>
              <RenderLogOut/>
              <RenderProject/>
           </div>


      );
    }
}
