import React from 'react';
import './Alter.scss';
import { Spring } from 'react-spring/renderprops';
import EditNumber from './EditNumber';
import EditLetter from './EditLetter';
import Delete from './Delete';
import BackButton from './BackButton';

class Option extends React.Component {
    render() {
        return (
            <div>
                <BackButton
                    backButton={() => this.props.changeScreen(0)}
                    style={{
                        position: 'relative',
                        top: '-20px',
                    }}
                />
                <div id="dot">
                    <button onClick={() => {
                        if (this.props.data.length === 0) {
                            alert('There is no questions to delete!');
                            return;
                        }
                        this.props.changeScreen(5);
                    }}>
                        <span className="dot">
                            <div>Delete Question</div>
                        </span>
                    </button>
                    <button onClick={() => {
                        if (this.props.data.length >= 3) {
                            alert("Can't create more than 3 questions!");
                            return;
                        }
                        this.props.changeScreen(4);
                    }}>
                        <span className="dot">
                            <div>Add Question</div>
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}

class Edit extends React.Component {
    render() {
        return (
            <div>
                <BackButton
                    backButton={() => this.props.changeScreen(0)}
                    style={{
                        position: 'relative',
                        top: '-20px',
                    }}
                />
                <div id="dot">
                    <button onClick={() => this.props.changeScreen(2)}>
                        <span className="dot">
                            <div>Letter</div>
                        </span>
                    </button>
                    <button onClick={() => this.props.changeScreen(3)}>
                        <span className="dot">
                            <div>Number</div>
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}

class Alter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 0,
        }
        this.changeScreen = this.changeScreen.bind(this);
    }

    componentDidMount() {
        this.setState({
            screen: 0,
        })
    }

    changeScreen(newScreen) {
        this.setState({
            screen: newScreen,
        });
    }

    render() {
        switch (this.state.screen) {
            case 0:
                return (
                    <Spring
                        from={{
                            width: '0%',
                            height: '0%',
                            left: '100%',
                        }}
                        to={{
                            width: '100%',
                            height: '100%',
                            left: '0%'
                        }}
                        config={{
                            duration: 1000,
                            delay: -1000
                        }}
                    >
                        {props => (
                            <div className="logo">
                                <div className="card left" style={props}>
                                    <div className="flipper">
                                        <div
                                            className="f c1"
                                            style={{
                                                fontSize: '50px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignContent: 'center',
                                                justifyContent: 'space-around'
                                            }}
                                        >
                                            <a
                                                style={{ width: '100%', fontSize: '50px' }}
                                                onClick={() => this.changeScreen(1)}
                                            >
                                                Alter Map
                                    </a>
                                            <a
                                                onClick={() => this.props.changeScreen(0)}
                                                style={{ width: '100%' }}
                                            >
                                                Back
                                    </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Spring>
                );
            case 1:
                return (
                    <Option
                        changeScreen={this.changeScreen}
                        data={this.props.data}
                    />
                );
            case 2:
                return (
                    <EditLetter
                        changeScreen={this.changeScreen}
                        addMap={this.props.addMap}
                    />
                );
            case 3:
                return (
                    <EditNumber
                        changeScreen={this.changeScreen}
                        addMap={this.props.addMap}
                    />
                );
            case 4:
                return (
                    <Edit
                        changeScreen={this.changeScreen}
                    />
                )
            case 5:
                return (
                    <Delete
                        changeScreen={this.changeScreen}
                        deleteMap={this.props.deleteMap}
                        data={this.props.data}
                    />
                )
        }
    }
}

export default Alter;