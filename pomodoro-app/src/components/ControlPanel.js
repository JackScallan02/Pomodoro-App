import React from 'react';

class ControlPanel extends React.Component {
  constructor() {
    super();
    //defaults
      //workTime: 20 minutes
      //shortbreak: 5 minutes
      //longbreak: 15 minutes
      //longbreak every 4 times
    
    this.state = {
      time: {},
      seconds: 120,
      timeStarted: false,
      startButtonText: "Start",
      paused: false,
      reset: false
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
  }
  
  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    
    let hDisp = hours;
    let mDisp = minutes;
    let sDisp = seconds;
    
    if (hours < 10) {
      hDisp = '0' + hours.toString();
    }
    if (minutes < 10) {
      mDisp = '0' + minutes.toString();
    }
    if (seconds < 10) {
      sDisp = '0' + seconds.toString();
    }

    let timeObj = {
      "h": hours,
      "m": minutes,
      "s": seconds,
      "hDisp": hDisp,
      "mDisp": mDisp,
      "sDisp": sDisp
    };
    return timeObj;
  }
  
  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }
  
  startTimer() {
    this.setState({timeStarted: true, startButtonText: "Pause", paused: false, reset: false})
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    } else if (this.state.paused || this.state.reset) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
  
  resetTimer() {
    clearInterval(this.timer);
    //ToDo: Don't hardcode seconds
    var seconds = 120
    this.setState({seconds: seconds, time: this.secondsToTime(seconds)});
    this.setState({timeStarted: false, startButtonText: "Start", paused: false, reset: true})
  }
  
  pauseTimer() {
    clearInterval(this.timer);
    this.setState({timeStarted: false, startButtonText: "Start", paused: true, reset: false})
  }
  
  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }
  
  render() {
    return (
      <>

      <div id="timer-container">
        {this.state.time.mDisp} : {this.state.time.sDisp}
      </div>
      <br/>
      <div id="timer-button-container">
        <button className="btn btn-success timer-button" onClick={()=>{
          if (!this.state.timeStarted) {
            console.log("Started");
            this.startTimer();
          } else {
            this.pauseTimer();
            this.setState({startButtonText: "Start"});
          }
          
        }}>{this.state.startButtonText}</button>
        <button className="btn btn-danger timer-button" onClick={this.resetTimer}>Reset</button>
      </div>
      <br/>
      </>
    );
  }
}

export default ControlPanel;