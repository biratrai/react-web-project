import React from 'react';
import {database} from "../constants/firebaseconst";

// const RenderForm = ({addToFirebase}) => (
//   <div>
//     <h1>Please add project</h1>
//
//       <form>
//         <label> Pencode url.</label>
//         <input type="text" name="url" placeholder="Enter url" value={props.state.url} onChange={this.handleUrlChange}/>
//         <br/>
//         <br/>
//         <label> Screen shot.</label>
//         <input type="text" name="image" placeholder="Upload screenshot" value={props.state.image} onChange={this.handleImageChange}/>
//         <br/>
//         <br/>
//         <button onClick={addToFirebase}>Submit</button>
//       </form>
//
//   </div>
// )

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
  }

  componentWillMount() {
    console.log('Add Project Component Will Mount')
  }

  handleUrlChange (evt) {
    this.setState({ url: evt.target.value });
    console.log(this.state.url);
  }

  handleImageChange (evt) {
    this.setState({ image: evt.target.value });
  }

  addToFirebase (evt){
    console.log("add to firebase");
    console.log("Url: "+this.state.url);
    console.log("screenshot: "+this.state.screenshot);
  }

  render(){
    return (
      <div>
        <h1>Please add project</h1>

          <form>
            <label> Pencode url: </label>
            <input type="text" name="url" placeholder="Enter url" value={this.state.url} onChange={this.handleUrlChange}/>
            <br/>
            <br/>
            <label> Screen shot: </label>
            <input type="text" name="image" placeholder="Upload screenshot" value={this.state.image} onChange={this.handleImageChange}/>
            <br/>
            <br/>
            <button onClick={this.addToFirebase}>Submit</button>
          </form>

      </div>
    )
  }
}
