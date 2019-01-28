import React, { Component, createRef } from 'react';
import { SOUND_TYPES, playSound, getRandomSound } from './utills/soundService';
import './App.css';

class App extends Component {
  state = {
    isGameOver: false,
    level: 1500,
    sequence: [],
    userSequence: [],
    userCount: 0,
  };

  redButton = createRef();
  greenButton = createRef();
  blueButton = createRef();
  yellowButton = createRef();
  levelButton = createRef();

  resetState = () => {
    this.setState({
      sequence: [],
      userSequence: [],
    })
  };

  onClickHandler = ({ target }, value) => {
    const { userCount, isGameOver } = this.state;
    this.playButton({ target }, value);
    if (isGameOver) {
      return;
    }
    this.setState({
      userSequence: [...this.state.userSequence, { index: value }],
      userCount: this.state.userCount + 1
    }, () => {
      if (this.state.userSequence[userCount].index !== this.state.sequence[userCount].index) {
        this.setState({
          userCount: 0,
          isGameOver: true,
        });
        this.resetState();
        return;
      }

      if (this.state.userSequence.length === this.state.sequence.length) {
        setTimeout(() => {
          this.playNextRound();
        }, 1000);
        this.setState({
          userCount: 0
        });
      }
    });
  };

  playNextRound = () => {
    this.setState({
      sequence: [...this.state.sequence, getRandomSound()],
      userSequence: [],
    }, () => {
      this.playSequence(this.state.sequence);
    });
  };

  playSequence = sequence => {
    const { level } = this.state;
    let count = 0;
    const interval = setInterval(() => {
      if (count >= sequence.length) {
        clearInterval(interval);
        return;
      }

      const currentTarget = this[`${sequence[count].color}Button`].current;
      const currentSoundIndex = sequence[count].index;

      this.playButton({ target: currentTarget }, currentSoundIndex);
      ++count;
    }, level);
  };

  playButton = ({ target }, value) => {
    const REMOVE_CLASS_TIMEOUT = 200;
    target.classList.add('canvas-item--pressed');
    playSound(value);
    setTimeout(() => {
      target.classList.remove('canvas-item--pressed');
    }, REMOVE_CLASS_TIMEOUT);
  };

  onStart = () => {
    this.setState({
      isGameOver: false,
      sequence: [...this.state.sequence, getRandomSound()]
    }, () => {
      this.playSequence(this.state.sequence);
    });
  };

  onChangeLevel = (e) => {
    e.preventDefault();
    this.setState({
      level: parseFloat(this.levelButton.current.value)
    }, () => {
      this.resetState();
    })
  };

  render() {
    const { sequence, isGameOver } = this.state;
    return (
      <div className="app">
        <header>Simon the Game</header>
        <div>
          <div>
            <div>
              Level: {sequence.length}
            </div>
            <select
              onChange={this.onChangeLevel}
              ref={this.levelButton}
            >
              <option value="1500">Easy</option>
              <option value="1000">Normal</option>
              <option value="400">Hard</option>
            </select>
            <div className="controls">
              <button onClick={this.onStart}>Start</button>
              <div>
                {isGameOver && "You have lost, please start new game"}
              </div>
            </div>
          </div>

          <div className="canvas-wrapper">
            <div
              ref={this.redButton}
              onClick={(e) => { this.onClickHandler(e, SOUND_TYPES.RED) }}
              className="canvas-item canvas-item--red"
            />
            <div
              ref={this.greenButton}
              onClick={(e) => { this.onClickHandler(e, SOUND_TYPES.GREEN) }}
              className="canvas-item canvas-item--green"
            />
            <div
              ref={this.blueButton}
              onClick={(e) => { this.onClickHandler(e, SOUND_TYPES.BLUE) }}
              className="canvas-item canvas-item--blue"
            />
            <div
              ref={this.yellowButton}
              onClick={(e) => { this.onClickHandler(e, SOUND_TYPES.YELLOW) }}
              className="canvas-item canvas-item--yellow"
            />
          </div>

        </div>
      </div>
    );
  }
}

export default App;
