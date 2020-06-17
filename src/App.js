import React from 'react';
import './App.css';
import Start from './Start/Start';
import Game from './Game/Game';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      maxPoint: 0,
    };
    this.changeStage = this.changeStage.bind(this);
    this.updateMaxPoint = this.updateMaxPoint.bind(this);
  }

  componentDidMount() {
    this.setState({
      stage: 0
    });
  }

  changeStage(newStage) {
    this.setState({
      stage: newStage,
    });
  }

  updateMaxPoint(value) {
    const result = Math.max(value, this.state.maxPoint);
    this.setState({
      maxPoint: result,
    });
  }

  render() {
    switch (this.state.stage) {
      case 0:
        return (
          <Start
            changeStage={this.changeStage}
            maxPoint={this.state.maxPoint}
          />
        )
      case 1:
        return (
          <Game
            changeStage={this.changeStage}
            updateMaxPoint={this.updateMaxPoint}
          />
        )
      default:
        return <h1>Error!</h1>
    }
  }
}

export default App;
