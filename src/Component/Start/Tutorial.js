import React from 'react';
import './Start.scss';
import { Spring } from 'react-spring/renderprops';

class Tutorial extends React.Component {
    render() {
        return (
            <Spring
                from={{
                    width: '0%',
                    height: '0%',
                    top: '100%',
                }}
                to={{
                    width: '100%',
                    height: '100%',
                    top: '0%'
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
                                <div className="f c1" style={{ fontSize: '50px' }}>
                                    <div
                                        style={{
                                            height: '80%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <div style={{ height: '50%', width: '100%' }}>Tutorial</div>
                                        <h5 style={{ height: '50%', width: '100%', fontSize: '15px' }}>
                                            <a href="https://github.com/KooYooMan/Findpath/blob/master/README.md" target="_blank">Link Tutorial</a>
                                        </h5>
                                    </div>
                                    <a onClick={() => this.props.changeScreen(0)}>Back</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Spring>
        );
    }
}

export default Tutorial;