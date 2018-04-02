import React from 'react';
import {Avatar, RaisedButton} from "material-ui";
import {logout} from "../helpers/auth";
import Project from './Project'
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

const RenderAddProject = props => (
  <MuiThemeProvider>
    <div>
        <RaisedButton
            backgroundColor="#a4c639"
            labelColor="#ffffff"
            label="Add Project"
            onTouchTap={this.addProject}
        />
    </div>
  </MuiThemeProvider>
)

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //firebaseUser: JSON.parse(localStorage.getItem("firebaseUser"))
            projects : []
        };

        //console.log("User:", this.state.firebaseUser);
        this.handleLogout = this.handleLogout.bind(this);
        this.nextId = this.nextId.bind(this)
        this.update = this.update.bind(this)
        this.eachProject = this.eachProject.bind(this)
    }

    componentWillMount() {

      var self = this
      console.log('Component Will Mount')
      console.log(this.props.count)
		    if(this.props.count) {
			       fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
				         .then(response => response.json())
				             .then(json => json[0]
								               .split('. ')
								               .forEach(sentence => self.addProject(sentence.substring(0, 25))))
		    }
    }

    addProject(text) {
        this.setState(prevState => ({
          projects: [
            ...prevState.projects,
            {
              id: this.nextId(),
              url: text,
              image: 'project.png'
            }
          ]
        }))
    }

    nextId() {
    		this.uniqueId = this.uniqueId || 0
    		return this.uniqueId++
    }

    eachProject(project, i) {
    		return (
    			<Project key={i}
    				  index={i}
    				  onChange={this.update}
    				  onRemove={this.remove}>
    				  {project.url}
    		    </Project>
    		)
    }

    update(newText, i) {
    		console.log('updating item at index', i, newText)
    		this.setState(prevState => ({
    			projects: prevState.projects.map(
    				project => (project.id !== i) ? project : {...project, project: newText}
    			)
    		}))
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
              {this.state.projects.map(this.eachProject)}
              <div >
                <RenderAddProject/>
              </div>
           </div>
      );
    }
}
