import React from 'react';
import {database} from "../constants/firebaseconst";

const RenderForm = () => (
  <div>
    <h1>Please add project</h1>

      <form>
        <textarea placeholder="Enter your pencode url here."/>
        <button>Submit</button>
      </form>

  </div>
)

export default  class AddProject extends React.Component {
  componentWillMount() {
    console.log('Add Project Component Will Mount')
  }


  render(){
    return (
        <div>
          <RenderForm/>
        </div>
    )
  }
}
