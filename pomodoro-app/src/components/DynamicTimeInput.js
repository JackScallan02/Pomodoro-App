import React from 'react';
import { POMODORO_TIME, LONG_BREAK_TIME, SHORT_BREAK_TIME } from '../constants.js';


class DynamicTimeInput extends React.Component {
    
  constructor(props) {
    super(props);
    this.state={
      seconds: '',
      minutes: '',
      numberCount: 0,
      timeDisplay: '',
      keyPressed: ''
    }
    this.inputChanged = this.inputChanged.bind(this);
    this.keyDown = this.keyDown.bind(this);
    
  }
  
  keyDown(e) {
    var key = e.keyCode || e.charCode;
    this.setState({keyPressed: key});
  }
  
  callBackMinutes() {
    if (this.props.updatePomodoro) {
      this.props.updatePomodoro(this.state.minutes, this.state.seconds);
    } else if (this.props.updateShortBreak) {
      this.props.updateShortBreak(this.state.minutes, this.state.seconds);
    } else if (this.props.updateLongBreak) {
      this.props.updateLongBreak(this.state.minutes, this.state.seconds);
    }
  }
  
  inputChanged(e) {
    let keyPressed = e.target.getAttribute('a-key')
    if ((keyPressed < 48 || keyPressed > 57) && (keyPressed != 8 && keyPressed != 46)) { //not 0-9
      return;
    }
    let keyVal = String.fromCharCode(keyPressed);
    
    if (keyPressed == 8 || keyPressed == 46) { // Backspace
      if (this.state.numberCount == 1) {
          this.setState({
            numberCount: 0,
            seconds: 0,
            minutes: 0,
            timeDisplay: '00:00'
          }, this.callBackMinutes);
      } else if (this.state.numberCount == 2) {
          this.setState({
            numberCount: 1,
            seconds: parseInt(this.state.timeDisplay.substring(3, 4)),
            minutes: 0,
            timeDisplay: '00:0' + this.state.timeDisplay.substring(3, 4)
          }, this.callBackMinutes);
      } else if (this.state.numberCount == 3) {
          this.setState({
            numberCount: 2,
            seconds: parseInt(this.state.timeDisplay.substring(1, 2) + this.state.timeDisplay.substring(3, 4)),
            minutes: 0,
            timeDisplay: '00:' + this.state.timeDisplay.substring(1, 2) + this.state.timeDisplay.substring(3, 4)
          }, this.callBackMinutes);
      } else if(this.state.numberCount == 4) {
          this.setState({
            numberCount: 3,
            seconds: parseInt(this.state.timeDisplay.substring(1, 2) + this.state.timeDisplay.substring(3, 4)),
            minutes: parseInt(this.state.timeDisplay.substring(0, 1)),
            timeDisplay: '0' + this.state.timeDisplay.substring(0, 1) + ':' + this.state.timeDisplay.substring(1, 2) + this.state.timeDisplay.substring(3, 4)
        }, this.callBackMinutes);
      }
    } else { //0-9
      if (this.state.numberCount == 0) {
        this.setState({
          numberCount: 1,
          seconds: parseInt(keyVal),
          minutes: 0,
          timeDisplay: '00:0' + keyVal
        }, this.callBackMinutes);
      } else if (this.state.numberCount == 1) {
        this.setState({
          numberCount: 2,
          seconds: parseInt(this.state.seconds.toString() + keyVal),
          minutes: 0,
          timeDisplay: '00:' + this.state.seconds + keyVal
        }, this.callBackMinutes);
      } else if (this.state.numberCount == 2) {
        this.setState({
          numberCount: 3,
          seconds: parseInt(this.state.timeDisplay.substring(4, 5) + keyVal),
          minutes: parseInt(this.state.timeDisplay.substring(3, 4)),
          timeDisplay: '0' + this.state.timeDisplay.substring(3, 4) + ':' + this.state.timeDisplay.substring(4, 5) + keyVal
        }, this.callBackMinutes);
      } else if (this.state.numberCount == 3) {
        this.setState({
          numberCount: 4,
          seconds: parseInt(this.state.timeDisplay.substring(4, 5) + keyVal),
          minutes: parseInt(this.state.timeDisplay.substring(1,2) + this.state.timeDisplay.substring(3, 4)),
          timeDisplay: this.state.timeDisplay.substring(1, 2) + this.state.timeDisplay.substring(3, 4) + ':' + this.state.timeDisplay.substring(4, 5) + keyVal
        }, this.callBackMinutes);
      }
    }
  }
  
  render() {
    return (
      <>
        <div className="col-md-4 mb-3">
          <label htmlFor="validationServer01">{this.props.inputCaption}</label>
          <input type="text" className="form-control" placeholder="mm:ss" value={this.state.timeDisplay} a-key={this.state.keyPressed} onChange={this.inputChanged} onKeyDown={this.keyDown}/>
        </div>
      </>
    );
  }

}

export default DynamicTimeInput;