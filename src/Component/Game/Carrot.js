import React from 'react';
import './Game.scss';
import tenor from '../Resources/Image/tenor.gif';
import eatingCarrot from '../Resources/Sound/eatingCarrot.mp3';

class Carrot extends React.Component {
    componentDidMount() {
        new Audio(eatingCarrot).play();
    }

    render() {
        return (
            <div
                style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <img
                    src={tenor}
                    alt=""
                    style={{
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}
                />
            </div>
        );
    }
}

export default Carrot;