import React from 'react';
import {Avatar, RaisedButton} from "material-ui";
import {logout} from "../helpers/auth";
import Project from './Project'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {database} from "../constants/firebaseconst";

const appTokenKey = "appToken"; // also duplicated in Login.js

const RenderLogOut = ({handleLogout}) =>  (

      <MuiThemeProvider>
        <div className="logoutButton">
            <RaisedButton
                backgroundColor="#a4c639"
                labelColor="#ffffff"
                label="Sign Out"

                onClick={handleLogout}
            />
        </div>
      </MuiThemeProvider>
);

const RenderAddProject = ({addProjectData}) => (
  <MuiThemeProvider>
    <div>
        <RaisedButton
            backgroundColor="#a4c639"
            labelColor="#ffffff"
            label="Add Project"
            onClick={addProjectData}
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
        this.writeProjectData = this.writeProjectData.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.addProjectData = this.addProjectData.bind(this)
    }

    componentWillMount() {

      var self = this
      console.log('Component Will Mount')
      const databaseRef = database.ref('projects').orderByKey()
      databaseRef.on('value', snapshot => {
         console.log(snapshot.val());
      });
      // databaseRef.once('value', snapshot => {
      //   snapshot.forEach(child =>{
      //       id: this.state.id
      //       console.log(id)
      //
      //       // url: this.state.url,
      //       // image: this.state.image,
      //
      //   });
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
              image: 'project.png',
              userName: 'userName',
              profilePic: 'profilePic'
            }
          ]
        }))
        // this.writeProjectData(this.nextId(), text, 'project.png', 'userName','profilePic')

    }

    addProjectData() {
      console.log("Addd project Data")
      alert("Add")
    }

    writeProjectData(id, url, image, userName, profilePic) {
        const databaseRef = database.ref('projects');

        const project = {
            id: id,
            url: url,
            image: image,
            profilePic : profilePic,
            userName : userName
        }

        databaseRef.push(project);
    }
    nextId() {
    		this.uniqueId = this.uniqueId || 0
    		return this.uniqueId++
    }

    eachProject(project, i) {
    		return (
    			<Project key={i}
    				  index={i}
              url={project.url}>

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

    renderForm() {
      return (
        <div>
          <form>
            <textarea placeholder="Enter your pencode url here."/>
            <button>Submit</button>
          </form>
        </div>
      )
    }

	render() {
    	return (
			     <div>
              <h1>List of project submitted</h1>
              <RenderLogOut handleLogout={this.handleLogout}/>
              <RenderAddProject addProjectData={this.addProjectData}/>
              {this.state.projects.map(this.eachProject)}
           </div>
      );
    }
}
