import React from 'react';
import { POMODORO_TIME, LONG_BREAK_TIME, SHORT_BREAK_TIME } from '../constants.js';
import {RunPlaylist} from '../spotify_service.js'

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
      playlistStarted: false,
      breakTypeDisp: "pomodoro"
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.selectStudyPlaylist = this.selectStudyPlaylist.bind(this);
    this.runNextState = this.runNextState.bind(this);
  }
  
  componentDidUpdate(prevProps, prevState) {
    //If not paused and not started running and pomodoroseconds from props doesnt equal seconds from state
      //then set the time and seconds to the pomodoro seconds from props 
    if (this.state.runningPomodoro) {
      if (this.props.pomodoroSeconds !== this.state.seconds && !this.state.timeStarted && !this.state.paused) {
        this.setState({time: this.secondsToTime(this.props.pomodoroSeconds), seconds: this.props.pomodoroSeconds});
      }
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
    
    if (!this.state.playlistStarted) {
      let playlistToRunID;
      if (this.state.runningPomodoro && this.state.seconds == this.props.pomodoroSeconds) {
        //Run study playlist
        playlistToRunID = this.selectStudyPlaylist();
      } else if ((this.state.runningShortBreak && this.state.seconds == this.props.shortBreakSeconds) || (this.state.runningLongBreak && this.state.seconds == this.props.longBreakSeconds)) {
        //Run break playlist 
        playlistToRunID = this.selectBreakPlaylist();
      }
      
      if (playlistToRunID) {
        //RunPlaylist(playlistToRunID);
      }
      
      this.setState({playlistStarted: true});
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
    this.setState({runningPomodoro: true, runningShortBreak: false, runningLongBreak: false, shortBreakCount: 0, breakTypeDisp: "pomodoro"});

  }
  
  pauseTimer() {
    clearInterval(this.timer);
    this.setState({timeStarted: false, startButtonText: "Start", paused: true, reset: false})
  }
  
  runShortBreak() {
    this.setState({time: this.secondsToTime(this.props.shortBreakSeconds), seconds: this.props.shortBreakSeconds, runningPomodoro: false, runningShortBreak: true, runningLongBreak: false, shortBreakCount: this.state.shortBreakCount + 1, playlistStarted: false, breakTypeDisp: "short break"}, () => {
      if (this.state.timeStarted) {
        this.startTimer();
      }
    });
  }
  
  runLongBreak() {
    this.setState({time: this.secondsToTime(this.props.longBreakSeconds), seconds: this.props.longBreakSeconds, runningPomodoro: false, runningShortBreak: false, runningLongBreak: true, shortBreakCount: 0, playlistStarted: false, breakTypeDisp: "long break"}, () => {
      if (this.state.timeStarted) {
        this.startTimer();
      }
    });
  }
  
  runPomodoro() {
    this.setState({time: this.secondsToTime(this.props.pomodoroSeconds), seconds: this.props.pomodoroSeconds, runningShortBreak: false, runningLongBreak: false, runningPomodoro: true, playlistStarted: false, breakTypeDisp: "pomodoro"}, () => {
      if (this.state.timeStarted) {
        this.startTimer();
      }
    });
  }
  
  runNextState() {
    //Goes to the next break or pomodoro
    if (this.state.runningPomodoro) {
      if (this.state.shortBreakCount < 3) {
        this.runShortBreak();
      } else {
        this.runLongBreak();
      }
    } else if (this.state.runningLongBreak || this.state.runningShortBreak) {
      this.runPomodoro();
    }  
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
      this.runNextState();
    }
  }
  
  selectStudyPlaylist() {
    //Get random playlist from study map
    let keys = Array.from(this.state.studyMap.keys());
    console.log(Math.floor(Math.random() * (keys.length + 1)));
    return keys[Math.floor(Math.random() * (keys.length + 1))];
  }
  
  selectBreakPlaylist() {
    //Get random playlist from break map
    let keys = Array.from(this.state.breakMap.keys());
    return keys[Math.floor(Math.random() * (keys.length + 1))];
  }
  
  render() {
    return (
      <>
      <div id="timer-container">
        {this.state.time.mDisp} : {this.state.time.sDisp}
        <br/>
      </div>
      <br/>
      <h4 className='title-text'> Current interval: {this.state.breakTypeDisp} </h4>
      <br/>
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
        <button className="btn btn-primary timer-button" onClick={this.runNextState}>Jump to next</button>
      </div>
      <br/>
      </>
    );
  }
}

export default ControlPanel;