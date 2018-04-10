import React from 'react';
import {database} from "../constants/firebaseconst";
import {firebaseAuth} from "../constants/firebaseconst";
import Login from './SignIn'

export default  class AddProject extends React.Component {
  constructor(){
      super();
      this.state = {
         url : '',
         image : ''
      };

      this.handleUrlChange = this.handleUrlChange.bind(this);
      this.handleImageChange = this.handleImageChange.bind(this);
      this.addToFirebase = this.addToFirebase.bind(this);
      this.loginCallBack = this.loginCallBack.bind(this);
  }

  componentWillMount() {
    console.log('Add Project Component Will Mount'+ firebaseAuth.currentUser)
  }

  handleUrlChange (evt) {
    evt.preventDefault();
    this.setState({ url: evt.target.value });
    console.log(this.state.url);
  }

  handleImageChange (evt) {
    evt.preventDefault();
    // this.setState({ image: evt.target.files[0] });
    let reader = new FileReader();
    let file = evt.target.files[0];
    console.log('file '+ file);
    reader.onloadend = () => {
      this.setState({
        profilePic: '',
        userName: ''
      });
    }
    // reader.readAsDataURL(file);
    console.log("image: "+ this.state.image);
  }

  loginCallBack = (dataFromChild) => {
      console.log('loginCallBack dataFromChild : '+ dataFromChild)
      if(dataFromChild != null){
        this.setState({
          profilePic: dataFromChild.photoURL,
          userName: dataFromChild.displayName
        })
      }
  }

  addToFirebase (evt){
    evt.preventDefault();
    console.log("add to firebase");
    console.log("profilePic: "+this.state.profilePic);
    console.log("url: "+ this.urlLink.value)
    console.log("userName: "+this.state.userName);

    if(typeof this.state.userName === 'undefined'){
      alert('Not signed in. Please log in to submit.')
      return;
    } else {
      const databaseRef = database.ref('projects');

      const project = {
        id: 'id',
        url: this.urlLink.value,
        image: 'image',
        profilePic : this.state.profilePic,
        userName : this.state.userName
      }
      databaseRef.push(project);
      alert('Your project has been uploaded successfully.')
    }


  }

  render(){
    return (
      <div>
        <h1 className="App">Please add project</h1>
        <Login  className= "logoutButton" callbackFromParent={this.loginCallBack}/>
        <br/>
        <br/>
        <form>
          <label> Pencode url: </label>
          <input type="text" name="url" placeholder="Enter url" ref={(ref) => { this.urlLink = ref; }}/>
          <br/>

          <button onClick={this.addToFirebase}>Submit</button>
        </form>

      </div>
    )
  }
}
