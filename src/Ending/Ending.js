import React from 'react';
import './Ending.scss';
import { Spring } from 'react-spring/renderprops';

class Ending extends React.Component {
    render() {
        return (
            <Spring
                from={{
                    transform: 'translate3d(-500px, 0px, 0px)'
                }}
                to={{
                    transform: 'translate3d(0px, 0px, 0px)'
                }}
            >
                {props => (
                    <div id="ending-screen" style={props}>
                        <div className="glitch" data-text="GAME OVER">GAME OVER</div>
                        <h1 style={{ textAlign: 'center' }}>Điểm số: {this.props.point}</h1>
                        <a
                            className="box green"
                            href="/#"
                            onClick={() => this.props.changeStage(0)}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <p>Trở về màn hình chính</p>
                        </a>
                        <a
                            className="box green"
                            href="/#"
                            onClick={() => {
                                this.props.reset();
                                this.props.changeScreen(0);
                            }}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <p>Chơi lại</p>
                        </a>
                    </div>
                )}
            </Spring>
        );
    }
}

export default Ending;