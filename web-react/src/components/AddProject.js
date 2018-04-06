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
        image: file
      });
    }
    // reader.readAsDataURL(file);
    console.log("image: "+ this.state.image);
  }

  addToFirebase (evt){
    evt.preventDefault();
    console.log("add to firebase");
    console.log("Url: "+this.state.url);
    console.log("url: "+ this.urlLink.value)
    console.log('fils: '+ this.uploadInput.files[0])
    console.log("screenshot: "+this.state.screenshot);
  }

  render(){
    return (
      <div>
        <h1>Please add project</h1>

          <form>
            <label> Pencode url: </label>
            <input type="text" name="url" placeholder="Enter url" ref={(ref) => { this.urlLink = ref; }}/>
            <br/>
            <br/>
            <label> Screen shot: </label>
            <input ref={(ref) => { this.uploadInput = ref; }} placeholder="Upload screenshot" type="file" />

            <br/>
            <br/>
            <button onClick={this.addToFirebase}>Submit</button>
          </form>

      </div>
    )
  }
}
