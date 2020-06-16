import React from 'react';
import './Ending.scss';

class Ending extends React.Component {
    render() {
        return (
            <div id="ending-screen">
                <div className="glitch" data-text="GAME OVER">GAME OVER</div>
                <h1 style={{textAlign: 'center'}}>Điểm số: {this.props.point}</h1>
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
        );
    }
}

export default Ending;