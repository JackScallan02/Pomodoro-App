import React from 'react';
import { POMODORO_TIME, LONG_BREAK_TIME, SHORT_BREAK_TIME } from '../constants.js';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    //defaults
      //workTime: 20 minutes
      //shortbreak: 5 minutes
      //longbreak: 15 minutes
      //longbreak every 4 times
    var breakMap;
    var studyMap;
    if (!localStorage.getItem("breakMap")) {
      breakMap = new Map();
    } else {
      breakMap = new Map(JSON.parse(localStorage.getItem("breakMap")));
    }
    
    if (!localStorage.getItem("studyMap")) {
      studyMap = new Map();
    } else {
      studyMap = new Map(JSON.parse(localStorage.getItem("studyMap")));
    }
    this.state = {
      time: this.secondsToTime(this.props.pomodoroSeconds),
      seconds: this.props.pomodoroSeconds,
      timeStarted: false,
      startButtonText: "Start",
      paused: false,
      reset: false,
      runningPomodoro: true,
      runningShortBreak: false,
      runningLongBreak: false,
      shortBreakCount: 0,
      breakMap: breakMap,
      studyMap: studyMap,
      playlistStarted: false
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.selectStudyPlaylist = this.selectStudyPlaylist.bind(this);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.pomodoroSeconds !== this.state.seconds && !this.state.timeStarted && !this.state.paused) {
      this.setState({time: this.secondsToTime(this.props.pomodoroSeconds), seconds: this.props.pomodoroSeconds});
    }
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
    //If at the beginning of running pomodoro or a break, start running one of the playlists
    if (!this.state.playlistStarted && ((this.state.runningPomodoro && this.state.seconds == this.props.pomodoroSeconds) || (this.state.runningShortBreak && this.state.seconds == this.props.shortBreakSeconds) || (this.state.runningLongBreak && this.state.seconds == this.props.longBreakSeconds))) {
      this.setState({playlistStarted: true});
      console.log("Running new playlist");
      //Run the playlist
    }
    this.setState({timeStarted: true, startButtonText: "Pause", paused: false, reset: false})
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    } else if (this.state.paused || this.state.reset) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
  
  setSeconds(seconds) {
    this.setState({seconds: seconds});
  }
  
  resetTimer() {
    clearInterval(this.timer);
    
    //If they click the reset button while pomodoro is running, then dont need to run the same playlist
    //on the next time they click start. Otherwise, we need to ensure the pomodor playlist gets started.
    if (!this.state.runningPomodoro) {
      this.setState({playlistStarted: false});
    }
    this.setState({seconds: this.props.pomodoroSeconds, time: this.secondsToTime(this.props.pomodoroSeconds)});
    this.setState({timeStarted: false, startButtonText: "Start", paused: false, reset: true});
    this.setState({runningPomodoro: true, runningShortBreak: false, runningLongBreak: false, shortBreakCount: 0});

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
    if (seconds == -1) { 
      if (this.state.runningPomodoro) {
        if (this.state.shortBreakCount < 3) {
          //Take a short break
          this.setState({time: this.secondsToTime(this.props.shortBreakSeconds), seconds: this.props.shortBreakSeconds, runningPomodoro: false, runningShortBreak: true, shortBreakCount: this.state.shortBreakCount + 1, playlistStarted: false}, () => {
            this.startTimer();
          });
        } else {
          //Take a long break
          this.setState({time: this.secondsToTime(this.props.longBreakSeconds), seconds: this.props.longBreakSeconds, runningPomodoro: false, runningLongBreak: true, shortBreakCount: 0, playlistStarted: false}, () => {
            this.startTimer();
          });
        }
      } else {
        this.setState({time: this.secondsToTime(this.props.pomodoroSeconds), seconds: this.props.pomodoroSeconds, runningShortBreak: false, runningLongBreak: false, runningPomodoro: true, playlistStarted: false}, () => {
          this.startTimer();
        });
      }
    }
  }
  
  selectStudyPlaylist() {
    //Get random item from study map
    let keys = Array.from(this.state.studyMap.keys());
    return keys[Math.floor(Math.random() * keys.length)];
    
    
  }
  
  render() {
    return (
      <>

      <div id="timer-container">
        {this.state.time.mDisp} : {this.state.time.sDisp}
        <br/>
      </div>
      <br/>
      <div id="timer-button-container">
        <button className="btn btn-success timer-button" onClick={()=>{
          if (!this.state.timeStarted) {
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