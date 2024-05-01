import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import DynamicTimeInput from './DynamicTimeInput.js'

class SettingsModal extends React.Component {
    
  constructor() {
    super();
    this.state={
      show:false,
      pomodoroSeconds: '',
      pomodoroMinutes: '',
      pomodoroCount: 0,
      pomodoroTimeDisplay: '',
      shortBreakTime: '',
      longBreakTime: '',
      keyPressed: ''
    }
    this.pomodoroInputChanged = this.pomodoroInputChanged.bind(this);
    this.pomodoroKeyDown = this.pomodoroKeyDown.bind(this);
  }
  
  handleModal() {
    this.setState({show:!this.state.show})
  }
  
  pomodoroKeyDown(e) {
    var key = e.keyCode || e.charCode;
    this.setState({keyPressed: key});
  }
  
  pomodoroInputChanged(e) {
    let keyPressed = e.target.getAttribute('a-key')
    if ((keyPressed < 48 || keyPressed > 57) && (keyPressed != 8 && keyPressed != 46)) { //not 0-9
      return;
    }
    let keyVal = String.fromCharCode(keyPressed);
    
    if (keyPressed == 8 || keyPressed == 46) { // Backspace
      if (this.state.pomodoroCount == 1) {
          this.setState({
            pomodoroCount: 0,
            pomodoroSeconds: 0,
            pomodoroMinutes: 0,
            pomodoroTimeDisplay: '00:00'
          });
      } else if (this.state.pomodoroCount == 2) {
          this.setState({
            pomodoroCount: 1,
            pomodoroSeconds: parseInt(this.state.pomodoroTimeDisplay.substring(3, 4)),
            pomodoroMinutes: 0,
            pomodoroTimeDisplay: '00:0' + this.state.pomodoroTimeDisplay.substring(3, 4)
          });
      } else if (this.state.pomodoroCount == 3) {
          this.setState({
            pomodoroCount: 2,
            pomodoroSeconds: parseInt(this.state.pomodoroTimeDisplay.substring(1, 2) + this.state.pomodoroTimeDisplay.substring(3, 4)),
            pomodoroMinutes: 0,
            pomodoroTimeDisplay: '00:' + this.state.pomodoroTimeDisplay.substring(1, 2) + this.state.pomodoroTimeDisplay.substring(3, 4)
          });
      } else if(this.state.pomodoroCount == 4) {
          this.setState({
            pomodoroCount: 3,
            pomodoroSeconds: parseInt(this.state.pomodoroTimeDisplay.substring(1, 2) + this.state.pomodoroTimeDisplay.substring(3, 4)),
            pomodoroMinutes: parseInt(this.state.pomodoroTimeDisplay.substring(0, 1)),
            pomodoroTimeDisplay: '0' + this.state.pomodoroTimeDisplay.substring(0, 1) + ':' + this.state.pomodoroTimeDisplay.substring(1, 2) + this.state.pomodoroTimeDisplay.substring(3, 4)
        });
      }
    } else { //0-9
      if (this.state.pomodoroCount == 0) {
        this.setState({
          pomodoroCount: 1,
          pomodoroSeconds: parseInt(keyVal),
          pomodoroMinutes: 0,
          pomodoroTimeDisplay: '00:0' + keyVal
        });
      } else if (this.state.pomodoroCount == 1) {
        this.setState({
          pomodoroCount: 2,
          pomodoroSeconds: parseInt(this.state.pomodoroSeconds.toString() + keyVal),
          pomodoroMinutes: 0,
          pomodoroTimeDisplay: '00:' + this.state.pomodoroSeconds + keyVal
        });
      } else if (this.state.pomodoroCount == 2) {
        this.setState({
          pomodoroCount: 3,
          pomodoroSeconds: parseInt(this.state.pomodoroTimeDisplay.substring(4, 5) + keyVal),
          pomodoroMinutes: parseInt(this.state.pomodoroTimeDisplay.substring(3, 4)),
          pomodoroTimeDisplay: '0' + this.state.pomodoroTimeDisplay.substring(3, 4) + ':' + this.state.pomodoroTimeDisplay.substring(4, 5) + keyVal
        });
      } else if (this.state.pomodoroCount == 3) {
        this.setState({
          pomodoroCount: 4,
          pomodoroSeconds: parseInt(this.state.pomodoroTimeDisplay.substring(4, 5) + keyVal),
          pomodoroMinutes: parseInt(this.state.pomodoroTimeDisplay.substring(1,2) + this.state.pomodoroTimeDisplay.substring(3, 4)),
          pomodoroTimeDisplay: this.state.pomodoroTimeDisplay.substring(1, 2) + this.state.pomodoroTimeDisplay.substring(3, 4) + ':' + this.state.pomodoroTimeDisplay.substring(4, 5) + keyVal
        });
      }
    }
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
      <form>
      <Modal.Header closeButton><p className="modal-title w-100 text-center settings-header">Settings</p></Modal.Header>
      <Modal.Body>
      
        <div className="row">
          <DynamicTimeInput inputCaption="Pomodoro length"/>
          <DynamicTimeInput inputCaption="Short break length"/>
          <DynamicTimeInput inputCaption="Long break length"/>
        </div>
      

      </Modal.Body>
      <Modal.Footer><Button type='submit' onClick={()=>{this.handleModal()}}>Save changes</Button>
      </Modal.Footer>
      </form>
      </Modal>
      </>
    );
  }

}

export default SettingsModal;