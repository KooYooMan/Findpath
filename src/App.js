import React from 'react';
import './App.css';
import Start from './Start/Start';
import Game from './Game/Game';
import data from './Resources/Map/Map';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      maxPoint: 0,
      data: []
    };
    this.changeStage = this.changeStage.bind(this);
    this.updateMaxPoint = this.updateMaxPoint.bind(this);
  }

  componentDidMount() {
    this.setState({
      stage: 0,
      data: data,
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
            data={this.state.data}
          />
        )
      default:
        return <h1>Error!</h1>
    }
  }
}

export default App;
