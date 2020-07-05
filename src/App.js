import React from 'react';
import './App.css';
import Start from './Component/Start/Start';
import Game from './Component/Game/Game';
import axios from 'axios';
import wordNumber from './Component/Resources/Map/wordNumber';
import Map from './Component/Resources/Map/Map';
import Loading from './Loading';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      maxPoint: 0,
      questionList: [],
    };
    this.changeStage = this.changeStage.bind(this);
    this.updateMaxPoint = this.updateMaxPoint.bind(this);
    this.addMap = this.addMap.bind(this);
    this.deleteMap = this.deleteMap.bind(this);
  }

  componentDidMount() {
    this.setState({
      stage: 2,
    });
    axios.get('https://secustom.herokuapp.com/path')
      .then((result) => {
        this.setState({
          stage: 0,
          questionList: result.data.exam,
        });
      })
      .catch(() => {
        alert('Retrieve data failed. We create a auto map for you');
        this.setState({
          stage: 0,
          questionList: [{
            data: Map.map1,
            word: wordNumber
          }, {
            data: Map.map2,
            word: wordNumber
          }]
        })
      });
  }

  addMap(data, word) {
    var newQuestionList = this.state.questionList;

    newQuestionList.push({
      data: data,
      word: word,
    });

    axios.post('https://secustom.herokuapp.com/path', {
      exam: newQuestionList,
    })
      .then(() => { })
      .catch(() => {
        alert("Failed! Your map is still updated locally.")
      });

    this.setState({
      questionList: newQuestionList,
    });
  }

  deleteMap(id) {
    var newQuestionList = [];

    for (let i = 0; i < id; ++ i) newQuestionList.push(this.state.questionList[i]);

    for (let i = id + 1; i < this.state.questionList.length; ++ i) newQuestionList.push(this.state.questionList[i]);

    axios.post('https://secustom.herokuapp.com/path', {
      exam: newQuestionList,
    })
      .then(() => { })
      .catch(() => {
        alert("Failed! Your map is still updated locally.")
      });

    this.setState({
      questionList: newQuestionList,
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
            addMap={this.addMap}
            deleteMap={this.deleteMap}
            data={this.state.questionList}
          />
        )
      case 1:
        return (
          <Game
            changeStage={this.changeStage}
            updateMaxPoint={this.updateMaxPoint}
            data={this.state.questionList}
          />
        )
      case 2:
        return (
          <Loading />
        )
      default:
        return (
          <h1>Error!</h1>
        )
    }
  }
}

export default App;
