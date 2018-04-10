import React from 'react';
import { RaisedButton} from "material-ui";
import {firebaseAuth} from "../constants/firebaseconst";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        // The component's Local state.
        this.state = {
          isSignedIn: false // Local signed-in state.
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      signInSuccessUrl: '/signedIn',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
          // Avoid redirects after sign-in.
          signInSuccess: () => false
        }
    };

    componentWillMount() {
      console.log('Sinin componentWillMount')
    }
    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
      console.log('Sinin componentDidMount')
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
          (user) => {this.setState({
            isSignedIn: !!user
          })
          this.props.callbackFromParent(firebase.auth().currentUser);
        }
        );

    }
    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
      console.log('Sinin componentWillUnmount')
      this.unregisterAuthObserver();
    }

    handleLogout() {
        firebase.auth().signOut();
        this.props.callbackFromParent(firebase.auth().currentUser);
    }

    render() {
      if (!this.state.isSignedIn) {
        return (
          <div className="signInButton">
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebaseAuth}/>
          </div>
        );
      }
      return (
        <div>
          <p className="App">Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
          <MuiThemeProvider>
            <div className="logoutButton">
                <RaisedButton
                    backgroundColor="#a4c639"
                    labelColor="#ffffff"
                    label="Sign Out"
                    onClick={this.handleLogout}
                />
            </div>
          </MuiThemeProvider>
        </div>
      );
    }
}
