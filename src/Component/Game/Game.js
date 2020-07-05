import React from 'react';
import './Game.scss';
import Ending from '../Ending/Ending';
import Wrap from './Wrap';
import Point from './Point';
import Carrot from './Carrot';

const detectRowRabbit = (data, word) => {
    for (let i = 0; i < 64; i += 8) {
        if (data[i] === word[0]) return i / 8;
    }
}

const detectRowCarrot = (data, word) => {
    for (let i = 0; i < 64; i += 8) {
        if (data[i + 7] === word[word.length - 1]) return i / 8;
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: [],
            point: 0,
            screen: 0,
            curQuestion: 0,
        };
        this.addClicked = this.addClicked.bind(this);
        this.removeClicked = this.removeClicked.bind(this);
        this.clearClicked = this.clearClicked.bind(this);
        this.updatePoint = this.updatePoint.bind(this);
        this.changeScreen = this.changeScreen.bind(this);
        this.reset = this.reset.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    componentDidMount() {
        this.setState({
            clicked: [],
            point: 0,
            screen: 0,
            curQuestion: 0,
        });
    }

    addClicked(value) {
        let clicked = this.state.clicked;
        clicked.push(value);
        this.setState({
            clicked: clicked,
        });
    }

    removeClicked() {
        let clicked = this.state.clicked;
        clicked.pop();
        this.setState({
            clicked: clicked,
        });
    }

    clearClicked() {
        let clicked = [];
        this.setState({
            clicked: clicked,
        });
    }

    updatePoint(value) {
        const newPoint = Math.max(this.state.point + value, 0);
        this.setState({
            point: newPoint,
        });
    }

    changeScreen(newScreen) {
        this.setState({
            screen: newScreen
        });
    }

    reset() {
        const passed = this.state.clicked.length;
        const newPoint = Math.max(0, this.state.point - passed * 100);
        this.setState({
            clicked: [],
            point: newPoint,
        });
    }

    nextQuestion() {
        document.querySelectorAll('button').forEach(value => {
            value.disabled = false;
        });
        if (this.state.curQuestion + 1 < this.props.data.length) {
            const newCurQuestion = this.state.curQuestion + 1;
            const rowRabbit = detectRowRabbit(this.props.data[newCurQuestion].data, this.props.data[newCurQuestion].word);
            const rowCarrot = detectRowCarrot(this.props.data[newCurQuestion].data, this.props.data[newCurQuestion].word);
            var rabbit = document.getElementById("rabbit");
            rabbit.style.top = `${-520 + rowRabbit * 65}px`;
            rabbit.style.left = `-119px`;
            var carrot = document.getElementById("carrot");
            carrot.style.top = `${-520 + rowCarrot * 65}px`;
            carrot.style.left = `520px`;
            this.setState({
                clicked: [],
                curQuestion: newCurQuestion,
            });
        }
        else {
            this.changeScreen(1);
            setTimeout(() => this.changeScreen(2), 3000);
            this.props.updateMaxPoint(this.state.point);
        }
    }

    render() {
        switch (this.state.screen) {
            case 0:
                return (
                    <div id="game">
                        <div className="buttons">
                            <Point
                                point={this.state.point}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={() => this.props.changeStage(0)}
                            >Quit</button><br />
                            <button
                                className="btn btn-default"
                                onClick={() => {
                                    this.updatePoint(-this.state.point);
                                    this.clearClicked();
                                }}
                            >Restart</button><br />
                            <button
                                className="btn btn-success Default"
                                onClick={
                                    () => {
                                        this.removeClicked();
                                        this.updatePoint(-100);
                                    }
                                }
                            >Back</button><br />
                            <h1>Stage: {this.state.curQuestion + 1} / {this.props.data.length}</h1>
                        </div>
                        <Wrap
                            list={this.props.data[this.state.curQuestion].data}
                            word={this.props.data[this.state.curQuestion].word}
                            clicked={this.state.clicked}
                            addClicked={this.addClicked}
                            removeClicked={this.removeClicked}
                            updatePoint={this.updatePoint}
                            nextQuestion={this.nextQuestion}
                            last={(this.state.curQuestion === this.props.data.length - 1)}
                        />
                    </div>
                );
            case 1:
                return (
                    <Carrot />
                );
            case 2:
                return (
                    <Ending
                        changeStage={this.props.changeStage}
                        changeScreen={this.changeScreen}
                        point={this.state.point}
                        reset={this.reset}
                    />
                );
            default:
                return (
                    <h1>Error.....</h1>
                );
        }

    }
}

export default Game;