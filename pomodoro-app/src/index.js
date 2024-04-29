import React from 'react';
import ReactDOM from 'react-dom/client';
import ModalComponent from './components/ModalComponent.js'
import PlaylistTable from './components/PlaylistTableComponent.js'
import ControlPanel from './components/ControlPanel.js'

import {Button, Modal} from 'react-bootstrap';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

class App extends React.Component {
  constructor() {
    super();
    this.state={
      show:false,
    }
  }

  
  handleModal() {
    this.setState({show:!this.state.show})
  }
  
  render() {

    return (
      <div className='container'>
        <div className=''>
          <br/>
          <h1 className='title-text'> Pomodoro Manager </h1>
          <br/>
          <ControlPanel />
          <br/>
          <ModalComponent buttonText='Modify break playlist' modalHeader='Select the playlists you want to shuffle through for breaks' playlistType='break'/>
          <br/>
          <PlaylistTable playlistMap={this.state.breakMap} playlistType='break'/>
          <br/>
          <br/>
          <ModalComponent buttonText='Modify study playlist' modalHeader='Select the playlists you want to shuffle through for studying' playlistType='study'/>
          <br/>
          <PlaylistTable playlistMap={this.state.studyMap} playlistType='study'/>
          <br/>
        </div>
      </div>
      
    );
  }
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

