import React from 'react';
import './Start.scss';
import { Spring } from 'react-spring/renderprops';

class History extends React.Component {
    render() {
        return (
            <Spring
                from={{
                    width: '0%',
                    height: '0%',
                    top: '100%',
                    left: '100%',
                }}
                to={{
                    width: '100%',
                    height: '100%',
                    top: '0%',
                    left: '0%',
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
                                        <div style={{ height: '50%', width: '100%' }}>History</div>
                                        <div style={{ height: '50%', width: '100%', fontSize: '30px' }}>
                                            Điểm cao nhất: {this.props.maxPoint}
                                        </div>
                                    </div>
                                    <a href="/" onClick={() => this.props.changeScreen(0)}>Back</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Spring>
        );
    }
}

export default History;