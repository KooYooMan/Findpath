import React from 'react';
import './BackButton.scss';

class BackButton extends React.Component {
    render() {
        return (
            <a
                className="back-button-flip"
                data-back="🡰 Trở lại"
                data-front="🡰 Trở lại"
                onClick={this.props.backButton}
                style={this.props.style}
            ></a>
        );
    }
}

export default BackButton;