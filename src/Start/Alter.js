import React from 'react';
import './Alter.scss';
import mapChecking from '../Resources/Map/mapChecking';
import { Spring } from 'react-spring/renderprops';

class Edit extends React.Component {
    componentDidMount() {
        document.getElementById('cell-0').focus();
    }

    updateMap() {
        let list = [];
        for (let i = 0; i < 64; ++ i) {
            list.push(parseInt(document.getElementById(`cell-${i}`).value));
        }
        console.log(list);
        alert(mapChecking(list));
    }

    render() {
        var count = -1;
        var list = [];
        for (let i = 0; i < 64; ++i) {
            list.push(i);
        }
        const data = list.map(value => {
            count++;
            return (
                <input
                    type="number"
                    className="square"
                    id={"cell-" + count}
                    key={count}
                    style={{
                        height: '70px',
                        width: '70px',
                        padding: '0',
                        margin: '0',
                        fontSize: '30px',
                        textAlign: 'center',
                        color: 'black'
                    }}
                />);
        })
        return (
            <div id="game">
                <div className="buttons">
                    <button
                        className="btn btn-primary"
                        style={{
                            backgroundColor: 'red',
                            width: '60px',
                            height: '30px'
                        }}
                        onClick={() => this.updateMap()}
                    >Confirm</button><br />
                    <button
                        className="btn btn-success"
                        style={{
                            backgroundColor: 'green',
                            width: '60px',
                            height: '30px'
                        }}
                        onClick={() => {
                            this.props.changeScreen(0);
                            console.log('hello');
                        }}
                    >Back</button><br />
                </div>
                <div className="wrap">
                    {data}
                </div>
            </div>
        );
    }
}

class Alter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 0,
        }
        this.changeScreen = this.changeScreen.bind(this);
    }

    componentDidMount() {
        this.setState({
            screen: 0,
        })
    }

    changeScreen(newScreen) {
        this.setState({
            screen: newScreen,
        });
    }

    render() {
        if (this.state.screen === 0) {
            return (
                <Spring
                    from={{
                        width: '0%',
                        height: '0%',
                        left: '100%',
                    }}
                    to={{
                        width: '100%',
                        height: '100%',
                        left: '0%'
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
                                            href="/#"
                                            style={{ width: '100%', fontSize: '50px' }}
                                            onClick={() => this.changeScreen(1)}
                                        >
                                            Alternative Map
                                </a>
                                        <a
                                            href="/#" onClick={() => this.props.changeScreen(0)}
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
        return (
            <Edit
                changeScreen={this.changeScreen}
            />
        );
    }
}

export default Alter;