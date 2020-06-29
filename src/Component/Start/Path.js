import React from 'react';
import './Start.scss';
import { Spring } from 'react-spring/renderprops';

class Path extends React.Component {
    render() {
        return (
            <div className="logo">
                <Spring
                    from={{
                        position: 'relative',
                        top: '-250px',
                    }}
                    to={{
                        top: '0px',
                    }}
                    config={{
                        duration: 300
                    }}
                >
                    {props => (
                        <button
                            className="card left"
                            onClick={() => this.props.changeScreen(1)}
                            style={props}
                        >
                            <div className="flipper">
                                <div className="f c1">P</div>
                            </div>
                        </button>
                    )}
                </Spring>
                <Spring
                    from={{
                        position: 'relative',
                        left: '250px',
                    }}
                    to={{
                        left: '0px',
                    }}
                    config={{
                        duration: 300
                    }}
                >
                    {props => (
                        <button
                            className="card left"
                            onClick={() => this.props.changeScreen(2)}
                            style={props}
                        >
                            <div className="flipper">
                                <div className="f c3">A</div>
                            </div>
                        </button>
                    )}
                </Spring>
                <Spring
                    from={{
                        position: 'relative',
                        left: '-250px',
                    }}
                    to={{
                        left: '0px',
                    }}
                    config={{
                        duration: 300
                    }}
                >
                    {props => (
                        <button
                            className="card left"
                            onClick={() => this.props.changeScreen(3)}
                            style={props}
                        >
                            <div className="flipper">
                                <div className="f c3">T</div>
                            </div>
                        </button>
                    )}
                </Spring>
                <Spring
                    from={{
                        position: 'relative',
                        top: '250px',
                    }}
                    to={{
                        top: '0px',
                    }}
                    config={{
                        duration: 300
                    }}
                >
                    {props => (
                        <button
                            className="card left"
                            onClick={() => this.props.changeScreen(4)}
                            style={props}
                        >
                            <div className="flipper">
                                <div className="f c4">H</div>
                            </div>
                        </button>
                    )}
                </Spring>
            </div>
        );
    }
}

export default Path;