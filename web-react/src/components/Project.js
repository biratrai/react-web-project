import React from 'react';
import logo from './logo.svg';

export default class Project extends React.Component {
  render() {
    return (
      <div class="note">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="">Link to project</a>
      </div>
    );
  }

}
