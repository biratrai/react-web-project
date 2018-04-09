import React from 'react';
import Project from './Project'
import {database} from "../constants/firebaseconst";
import Login from './SignIn'

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects : []
        };

        this.nextId = this.nextId.bind(this)
        this.eachProject = this.eachProject.bind(this)
        this.writeProjectData = this.writeProjectData.bind(this)
        this.loginCallBack = this.loginCallBack.bind(this)
    }

    componentWillMount() {

      var self = this
      const databaseRef = database.ref('projects').orderByKey()
      console.log('Component Will Mount '+ databaseRef)
      databaseRef.on('value', snapshot => {
         console.log('snapshot.val -> '+snapshot.val());

         snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log('ChildData: '+ childData.url);

            self.addProject(childData.url, childData.profilePic, childData.userName);
        });
      });
    }

    addProject(url, profilePic, userName) {
      console.log('addProject url: '+ url);
      console.log('addProject userName: '+ userName)
        this.setState(prevState => ({
          projects: [
            ...prevState.projects,
            {
              id: this.nextId(),
              url: url,
              image: 'project.png',
              userName: userName,
              profilePic: profilePic
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
      console.log('eachProject userName: '+ project.userName)
    		return (
    			<Project key={i}
    				  index={i}
              url={project.url}
              userName={project.userName}
              profilePic={project.profilePic}>
    		    </Project>
    		)
    }

    loginCallBack = (dataFromChild) => {
        console.log('loginCallBack dataFromChild : '+ dataFromChild)
    }

	render() {
    	return (
			     <div>
              <h1>List of project submitted</h1>

              <Login  callbackFromParent={this.loginCallBack}/>
              {this.state.projects.map(this.eachProject)}
           </div>
      );
    }
}
