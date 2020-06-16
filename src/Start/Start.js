import React from 'react';
import './Start.scss';
import Path from './Path';
import Play from './Play';
import Author from './Author';
import Tutorial from './Tutorial';
import History from './History';

class Logo extends React.Component {
    render() {
        switch (this.props.screen) {
            case 1:
                return (
                    <Play
                        changeScreen={this.props.changeScreen}
                        changeStage={this.props.changeStage}
                    />
                );
            case 2:
                return (
                    <Author
                        changeScreen={this.props.changeScreen}
                    />
                );
            case 3:
                return (
                    <Tutorial
                        changeScreen={this.props.changeScreen}
                    />
                );
            case 4:
                return (
                    <History
                        changeScreen={this.props.changeScreen}
                        maxPoint={this.props.maxPoint}
                    />
                );
            default:
                return (
                    <Path
                        changeScreen={this.props.changeScreen}
                    />
                );
        }

    }
}

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 0,
        };
        this.changeScreen = this.changeScreen.bind(this);
    }

    componentDidMount() {
        this.setState({
            screen: 0,
        });
    }

    changeScreen(newScreen) {
        this.setState({
            screen: newScreen,
        });
    }

    render() {
        return (
            <div id="start-screen">
                <Logo
                    screen={this.state.screen}
                    changeScreen={this.changeScreen}
                    changeStage={this.props.changeStage}
                    maxPoint={this.props.maxPoint}
                />
            </div>
        );
    }
}

export default Start;