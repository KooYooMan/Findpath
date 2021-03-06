import React from 'react';
import './Alter.scss';
import BackButton from './BackButton';

class Wrap extends React.Component {
    componentDidMount() {
        console.log(this.props.data.data);
        for (let i = 0; i < 64; ++i) {
            document.getElementById(`cell-${i}`).value = this.props.data.data[i];
        }
        document.querySelectorAll('.wrap input').forEach(value => {
            value.disabled = true;
        });
    }

    componentWillUnmount() {
        document.querySelectorAll('.wrap input').forEach(value => {
            value.disabled = false;
        });
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
                    type="text"
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
                        onClick={() => {
                            this.props.deleteMap(this.props.question - 1);
                            this.props.changeScreen(0);
                        }}
                    >Delete</button><br />
                    <button
                        className="btn btn-success"
                        style={{
                            backgroundColor: 'green',
                            width: '60px',
                            height: '30px'
                        }}
                        onClick={() => {
                            this.props.changeScreen(0);
                        }}
                    >Back</button><br />
                </div>
                <div className="wrap">
                    <h5 style={{ textAlign: 'center' }}>{
                        ((this.props.data.word[0] === "1") ? "1 to 20" : this.props.data.word)
                    }</h5>
                    {data}
                </div>
            </div>
        );
    }
}

class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 0,
            question: 0,
        };
    }

    componentDidMount() {
        this.setState({
            screen: 0,
        });
    }

    render() {
        if (this.state.screen === 0) {
            return (
                <div>
                    <BackButton 
                        backButton={() => this.props.changeScreen(0)}
                        style={{
                            position: 'relative',
                            top: '-20px'
                        }}
                    />
                    <div
                        style={{
                            paddingTop: '100px',
                            paddingLeft: '300px'
                        }}
                    >
                        <h1>What question do you want to delete?</h1>
                        <input
                            type="number"
                            id="wordLetter"
                            autoComplete="off"
                            style={{
                                width: '500px',
                                height: '30px',
                                color: 'black'
                            }}
                        />
                        <button
                            className="btn btn-success"
                            style={{
                                backgroundColor: 'green',
                                width: '100px',
                                height: '30px'
                            }}
                            onClick={() => {
                                if (document.getElementById("wordLetter").value === "") {
                                    alert("Please fill the section");
                                    return;
                                }
                                const position = parseInt(document.getElementById("wordLetter").value);
                                if (position >= 1 && position <= this.props.data.length) {
                                    this.setState({
                                        screen: 1,
                                        question: position
                                    });
                                    return;
                                }
                                alert('Invalid question');
                                return;
                            }}
                        >Confirm</button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <Wrap
                    data={this.props.data[this.state.question - 1]}
                    question={this.state.question}
                    changeScreen={this.props.changeScreen}
                    deleteMap={this.props.deleteMap}
                />
            );
        }
    }
}

export default Delete;