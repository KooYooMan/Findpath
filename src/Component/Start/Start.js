import React from 'react';
import './Start.scss';
import Path from './Path';
import Play from './Play';
import Alter from './Alter';
import Tutorial from './Tutorial';
import History from './History';
import startSound from '../Resources/Sound/Start.mp3';
import Volume from '../VolumeSlider/VolumeSlider';

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
                    <Alter
                        changeScreen={this.props.changeScreen}
                        updateData={this.props.updateData}
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
            volume: 0,
        };
        this.changeScreen = this.changeScreen.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
    }

    startSound = new Audio(startSound);

    componentDidMount() {
        this.setState({
            screen: 0,
        });
        if (this.state.volume) {
            this.startSound.loop = true;
            this.startSound.play();
        }
    }

    changeVolume(value) {
        this.startSound.pause();
        this.startSound.volume = value / 100;
        this.startSound.play();
        this.setState({
            volume: value,
        });
    }

    componentWillUnmount() {
        this.startSound.pause();
        this.startSound.currentTime = 0;
    }

    changeScreen(newScreen) {
        this.setState({
            screen: newScreen,
        });
    }

    render() {
        return (
            <div id="start-screen">
                <Volume 
                    volume={this.state.volume} 
                    changeVolume={this.changeVolume}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        height: '0px'
                    }}
                />
                <Logo
                    screen={this.state.screen}
                    changeScreen={this.changeScreen}
                    changeStage={this.props.changeStage}
                    maxPoint={this.props.maxPoint}
                    updateData={this.props.updateData}
                />
                
            </div>
        );
    }
}

export default Start;