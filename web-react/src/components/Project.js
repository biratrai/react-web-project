import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FontIcon} from "material-ui";
import RaisedButton from 'material-ui/RaisedButton';

var cardStyle = {
   width: '50%',
   height: '50%',
   position: 'relative',
   left: '0', right: '0',
   top: '0', bottom: '0',
   margin: 'auto',
}
const style = {
  margin: 'auto'
};

export default class Project extends React.Component {
  render() {
    return (

      <MuiThemeProvider>
        <div className="project">
          <Card style={cardStyle}>
            <CardHeader
              title= {""+this.props.userName}
              avatar={""+this.props.profilePic}
            />
            <CardMedia className="thumbnail">
              <iframe src={this.props.url} frameborder="0"></iframe>
            </CardMedia>
              <RaisedButton label="Delete" secondary={true} style={style} />
          </Card>

        </div>
      </MuiThemeProvider>
    );
  }

}
