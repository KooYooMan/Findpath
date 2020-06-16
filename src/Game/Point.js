import React from 'react';
import './Game.scss';
import { Spring } from 'react-spring/renderprops';

class Point extends React.Component {
    render() {
        return (
            <h1>
                <span>Point: </span>
                <Spring
                    from={{ number: 0 }}
                    to={{ number: this.props.point }}>
                    {props => <span style={{ color: 'red' }}>{parseInt(props.number)}</span>}
                </Spring>
            </h1>
        );
    }
}

export default Point;