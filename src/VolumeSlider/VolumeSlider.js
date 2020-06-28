import React from 'react';
import './VolumeSlider.scss';

class Volume extends React.Component {
    render() {
        return (
            <div id="player" style={this.props.style}>
                <i className="fa fa-volume-down"></i>
                <input 
                    id="volume" 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue={this.props.volume} 
                    onChange={(event) => this.props.changeVolume(event.target.value)} />
                <i className="fa fa-volume-up"></i>
            </div>
        );
    }
}

export default Volume;