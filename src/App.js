import React from 'react';
import './App.css';
import Start from './Component/Start/Start';
import Game from './Component/Game/Game';
import axios from 'axios';
import wordNumber from './Component/Resources/Map/wordNumber';
import wordMap from './Component/Resources/Map/Map';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      maxPoint: 0,
      data: [],
      word: ''
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
        alert('Retrieve data successfully');
        this.setState({
          stage: 0,
          data: result.data.exam[0].table,
          word: result.data.exam[0].word
        });
      })
      .catch(() => {
        alert('Retrieve data failed. We create a auto map for you');
        this.setState({
          stage: 0,
          data: wordMap,
          word: wordNumber
        })
      });
  }

  updateData(data, word) {
    this.setState({
      data: data,
      word: word,
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
            word={this.state.word}
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
