import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import DynamicTimeInput from './DynamicTimeInput.js'

class SettingsModal extends React.Component {
    
  constructor() {
    super();
    this.state={
      show:false,
      pomodoroMinutes: 0,
      shortBreakMinutes: 0,
      longBreakMinutes: 0,
      pomodoroSeconds: 0,
      shortBreakSeconds: 0,
      longBreakSeconds: 0,
      submitButtonPressed: false,
    }
  }
  
  updatePomodoro = (mins, seconds) => {
    this.setState({pomodoroMinutes: mins, pomodoroSeconds: seconds});
  }
  updateShortBreak = (mins, seconds) => {
    this.setState({shortBreakMinutes: mins, shortBreakSeconds: seconds});
  }
  updateLongBreak = (mins, seconds) => {
    this.setState({longBreakMinutes: mins, longBreakSeconds: seconds});
  }
  
  handleModal() {
    this.setState({show:!this.state.show})
  }
  
  checkReadyToSubmit() {
    let totalShortBreakSeconds = this.state.shortBreakMinutes*60 + this.state.shortBreakSeconds
    let totalLongBreakSeconds = this.state.longBreakMinutes*60 + this.state.longBreakSeconds
    
    if (this.state.pomodoroMinutes >= 5 &&
      (totalShortBreakSeconds <= totalLongBreakSeconds) &&
      this.state.longBreakMinutes >= 1 && this.state.shortBreakMinutes >= 1) {
      return true;
    }
    
    return false;
  }
  
  render() {
    return (
      <>
      <Button style={{background: 'lightgray', border: '1px solid black', color: 'black', display: 'block', marginLeft: 'auto', marginRight: 0}} onClick={()=>{this.handleModal()}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
        </svg>
      </Button>
      <Modal show={this.state.show} onHide={()=>{this.handleModal()}}>
      <Modal.Header closeButton><p className="modal-title w-100 text-center settings-header">Settings</p></Modal.Header>
      <Modal.Body>
      
        <div className="row">
          <DynamicTimeInput inputCaption="Pomodoro length" pomodoroMinutes={this.state.pomodoroMinutes} pomodoroSeconds = {this.state.pomodoroSeconds} updatePomodoro={this.updatePomodoro}/>
          <DynamicTimeInput inputCaption="Short break length" shortBreakMinutes={this.state.shortBreakMinutes} shortBreakSeconds = {this.state.shortBreakSeconds} updateShortBreak={this.updateShortBreak}/>
          <DynamicTimeInput inputCaption="Long break length" longBreakMinutes={this.state.longBreakMinutes} longBreakSeconds = {this.state.longBreakSeconds} updateLongBreak={this.updateLongBreak}/>
        </div>
        
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={this.props.shuffle} onChange={this.props.updateShuffleStatus}/>
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Shuffle playlists</label>
        </div>
        
        {this.state.submitButtonPressed && this.state.pomodoroMinutes < 5 ?
          (<div className="alert alert-danger" role="alert">
            You must have at least 5 pomodoro minutes. Minutes: {this.state.pomodoroMinutes}
          </div>)
          : (this.state.submitButtonPressed && this.state.shortBreakMinutes < 1) ?
          (<div className="alert alert-danger" role="alert">
            Your short break must be at least 1 minute
          </div>)
          : (this.state.submitButtonPressed && this.state.longBreakMinutes < 1) ?
          (<div className="alert alert-danger" role="alert">
            Your long break must be at least 1 minute
          </div>)
          : (this.state.submitButtonPressed && (this.state.shortBreakMinutes*60 + this.state.shortBreakSeconds) > (this.state.longBreakMinutes*60 + this.state.longBreakSeconds)) ?
          (<div className="alert alert-danger" role="alert">
            Your long break must be at least as long as your short break
          </div>)
          :
          (<></>)
        }
      

      </Modal.Body>
      <Modal.Footer><Button type='button' onClick={()=>{
        // if (this.checkReadyToSubmit()) {
          this.handleModal();
          this.setState({submitButtonPressed: false});
          let pomodoroTotalSeconds = this.state.pomodoroMinutes*60 + this.state.pomodoroSeconds
          let shortBreakTotalSeconds = this.state.shortBreakMinutes*60 + this.state.shortBreakSeconds
          let longBreakTotalSeconds = this.state.longBreakMinutes*60 + this.state.longBreakSeconds
          this.props.updateTime(pomodoroTotalSeconds, shortBreakTotalSeconds, longBreakTotalSeconds);
        // } else {
          this.setState({submitButtonPressed: true});
        // }
        
      }}>Save changes</Button>
      </Modal.Footer>
      </Modal>
      </>
    );
  }

}

export default SettingsModal;