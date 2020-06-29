import React from 'react';
import './App.css';
import Start from './Component/Start/Start';
import Game from './Component/Game/Game';
import axios from 'axios';

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
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.setState({
      stage: 2,
    });
    axios.get('https://secustom.herokuapp.com/path')
      .then((result) => {
        this.setState({
          stage: 0,
          data: result.data.exam,
        });
      })
      .catch(() => {
        this.setState({
          stage: 3,
        })
      });
  }

  updateData(data) {
    this.setState({
      data: data,
    })
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
    console.log(this.state.data);
    switch (this.state.stage) {
      case 0:
        return (
          <Start
            changeStage={this.changeStage}
            maxPoint={this.state.maxPoint}
            updateData={this.updateData}
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
      case 2:
        return (
          <div>
            <h1>Loading Game..........</h1>
            <br></br>
            <h1>Please Wait!</h1>
          </div>
        )
      default:
        return (
          <h1>Error!</h1>
        )
    }
  }
}

export default App;
