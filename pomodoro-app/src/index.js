import React from 'react';
import ReactDOM from 'react-dom/client';
import ModalComponent from './components/ModalComponent.js'
import PlaylistTable from './components/PlaylistTableComponent.js'

import {Button, Modal} from 'react-bootstrap';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";






class App extends React.Component {
  constructor() {
    super();
    this.state={
      show:false
    }
  }
  
  handleModal() {
    this.setState({show:!this.state.show})
  }
  
  getSelectedPlaylists(val) {
    console.log(val);
  }
  
  render() {

    return (
      <div className='container'>
        <div className=''>
          <br/>
          <h1 className='title-text'> Pomodoro Manager </h1>
          <br/>
          <ModalComponent buttonText='Modify break playlist' modalHeader='Select the playlists you want to shuffle through for breaks'/>
          <PlaylistTable />
          <br/>
          <br/>
          <ModalComponent buttonText='Modify study playlist' modalHeader='Select the playlists you want to shuffle through for studying'/>
          <PlaylistTable />
          <br/>
        </div>
      </div>
      
    );
  }
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

