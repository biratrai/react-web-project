import React from 'react';
import logo from './logo.svg';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var cardStyle = {
   width: '50%',
   height: '50%',
   position: 'relative',
   left: '0', right: '0',
   top: '0', bottom: '0',
   margin: 'auto',
}

export default class Project extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div class="project">
          <Card style={cardStyle}>
            <CardHeader
              title="URL Avatar"
              subtitle="Subtitle"
              avatar="images/jsa-128.jpg"
            />
            <CardMedia >
              <img src={logo} alt="" />
            </CardMedia>
            <CardTitle title="Pixel Art Project" subtitle={this.props.url} />
            <CardActions>
              <FlatButton label="Favorite" />
            </CardActions>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }

}
