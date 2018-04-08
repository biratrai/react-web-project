import React from 'react';
import {Avatar, RaisedButton} from "material-ui";
import {logout} from "../helpers/auth";
import Project from './Project'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {database} from "../constants/firebaseconst";
import Login from './SignIn'

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects : []
        };

        //console.log("User:", this.state.firebaseUser);
        this.nextId = this.nextId.bind(this)
        this.update = this.update.bind(this)
        this.eachProject = this.eachProject.bind(this)
        this.writeProjectData = this.writeProjectData.bind(this)
    }

    componentWillMount() {

      var self = this
      console.log('Component Will Mount')
      const databaseRef = database.ref('projects').orderByKey()
      databaseRef.on('value', snapshot => {
         console.log(snapshot.val());

         snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log('ChildData: '+ childData.url);
            // ...
            self.addProject(childData.url);
        });
      });
      // console.log(this.props.count)
		    // if(this.props.count) {
			  //      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
				//          .then(response => response.json())
				//              .then(json => json[0]
				// 				               .split('. ')
				// 				               .forEach(sentence => self.addProject(sentence.substring(0, 25))))
		    // }
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
      this.renderForm()
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

	render() {
    	return (
			     <div>
              <h1>List of project submitted</h1>

              <Login  history={this.props.createHashHistory}/>
              {this.state.projects.map(this.eachProject)}
           </div>
      );
    }
}
