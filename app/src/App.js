import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Header from'./components/header';
import UploadImages from './components/uploadImages';
import RaisedButton from 'material-ui/RaisedButton';

// import {Canvas,Circle, Image, Path, Text} from 'react-fabricjs';
// import './common';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isDownloadArchive: false
    }
  }
    handlerDownloadArchive = () => {
      this.setState({
        isDownloadArchive: true
      })
  }
  
  render() {
   
    return (
      <div className="App">
        <div id="main" className="clearfix">
        

        <UploadImages 
          isDownloadArchive={this.state.isDownloadArchive}
        />
        </div>
      </div>
    );
  }
}

export default App;
