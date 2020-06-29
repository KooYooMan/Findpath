import React from 'react';
import './Start.scss';
import { Spring } from 'react-spring/renderprops';

class Play extends React.Component {
    render() {
        return (
            <Spring
                from={{
                    width: '0%',
                    height: '0%'
                }}
                to={{
                    width: '100%',
                    height: '100%'
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
                                        onClick={() => this.props.changeStage(1)}
                                        style={{ width: '100%', fontSize: '50px' }}
                                    >
                                        Play
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
    }
}

export default Play;