import React from 'react';
import './Game.scss';
import data from './Map';
import finished from './finished.png';
import Ending from '../Ending/Ending';
import Wrap from './Wrap';
import Point from './Point';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: [],
            point: 0,
            screen: 0,
        };
        this.addClicked = this.addClicked.bind(this);
        this.removeClicked = this.removeClicked.bind(this);
        this.clearClicked = this.clearClicked.bind(this);
        this.updatePoint = this.updatePoint.bind(this);
        this.changeScreen = this.changeScreen.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this.setState({
            clicked: [],
            point: 0,
            screen: 0,
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
        this.setState({
            clicked: [],
            point: 0,
        });
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
                            {/* <button className="btn btn-danger Rainbow">Rainbow!</button><br />
                            <button className="btn btn-warning Fade">Fade</button> */}
                        </div>
                        <Wrap
                            list={data}
                            clicked={this.state.clicked}
                            addClicked={this.addClicked}
                            removeClicked={this.removeClicked}
                            updatePoint={this.updatePoint}
                            changeScreen={this.changeScreen}
                            updateMaxPoint={() => {
                                this.props.updateMaxPoint(this.state.point);
                            }}
                        />
                    </div>
                );
            case 1:
                return (
                    <img 
                        src={finished} 
                        alt="" 
                        style = {{
                            height: '100vh',
                            width: '100vw',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                    />
                );
            case 2:
                return (
                    <Ending 
                        changeStage = {this.props.changeStage}
                        changeScreen = {this.changeScreen}
                        point = {this.state.point}
                        reset = {this.reset}
                    />
                );
            default:
                return (
                    <h1>Error!</h1>
                );
        }

    }
}

export default Game;