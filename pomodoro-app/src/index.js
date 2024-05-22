import React from 'react';
import ReactDOM from 'react-dom/client';
import PlaylistModal from './components/PlaylistModal.js'
import PlaylistTable from './components/PlaylistTable.js'
import ControlPanel from './components/ControlPanel.js'
import SettingsModal from './components/SettingsModal.js'

import {Button, Modal} from 'react-bootstrap';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { POMODORO_TIME, LONG_BREAK_TIME, SHORT_BREAK_TIME } from './constants.js';


class App extends React.Component {
  constructor() {
    super();
    
    this.state={
      show:false,
      pomodoroTotalSeconds: POMODORO_TIME,
      longBreakTotalSeconds: LONG_BREAK_TIME,
      shortBreakTotalSeconds: SHORT_BREAK_TIME,
      shuffle: true
    }
    this.updateTime = this.updateTime.bind(this);
    this.updateShuffleStatus = this.updateShuffleStatus.bind(this);
  }

  
  handleModal() {
    this.setState({show:!this.state.show})
  }
  
  updateTime(pomSecs, shortBreakSecs, longBreakSecs) {
    this.setState({
      pomodoroTotalSeconds: pomSecs,
      shortBreakTotalSeconds: shortBreakSecs,
      longBreakTotalSeconds: longBreakSecs
    })
  }
  
  updateShuffleStatus() {
    this.setState((prevState => ({shuffle: !prevState.shuffle})));
  }
  
  updatePlaylists(playlistMap) {
    this.setState({
      playlistMap: playlistMap
    });
  }
  
  render() {

    return (
      <div className='container'>
        <div className=''>
          <br/>
          <SettingsModal pomodoroSeconds={this.state.pomodoroTotalSeconds} longBreakSeconds={this.state.longBreakSeconds} shortBreakSeconds={this.state.shortBreakSeconds} updateTime = {this.updateTime} shuffle={this.state.shuffle} updateShuffleStatus = {this.updateShuffleStatus}/>
          <h1 className='title-text'> Pomodoro Manager </h1>
          <br/>
          <ControlPanel pomodoroSeconds={this.state.pomodoroTotalSeconds} longBreakSeconds={this.state.longBreakTotalSeconds} shortBreakSeconds={this.state.shortBreakTotalSeconds}/>
          <br/>
          <PlaylistModal buttonText='Modify break playlists' modalHeader='Select the playlists you want to shuffle through for breaks' playlistType='break'/>
          <br/>
          <PlaylistTable playlistType='break'/>
          <br/>
          <br/>
          <PlaylistModal buttonText='Modify study playlists' modalHeader='Select the playlists you want to shuffle through for studying' playlistType='study'/>
          <br/>
          <PlaylistTable playlistType='study'/>
          <br/>
        </div>
      </div>
      
    );
  }
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

