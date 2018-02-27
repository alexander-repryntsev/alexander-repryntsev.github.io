import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from'./components/header';
import UploadImages from './components/uploadImages'

// import {Canvas,Circle, Image, Path, Text} from 'react-fabricjs';
// import './common';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <div id="main">
        <UploadImages />
<button id="downloadLink" className="btn btn-disable btn-green btn-upload">download</button>
        </div>
      </div>
    );
  }
}

export default App;
