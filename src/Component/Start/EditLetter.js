import React from 'react';
import './Alter.scss';
import mapChecking from '../Resources/Map/mapChecking';
import BackButton from './BackButton';

const toInputUppercase = e => {
    e.target.value = ("" + e.target.value).toUpperCase();
};

const getRndInterger = (low, high) => Math.floor(Math.random() * (high + 1 - low)) + low;

class WrapLetter extends React.Component {
    constructor(props) {
        super(props);
        this.updateMap = this.updateMap.bind(this);
    }

    updateMap() {
        let full = true;
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < 64; ++i) {
            const valueCell = document.getElementById(`cell-${i}`).value.trim();
            if (valueCell === "") {
                full = false;
                while (true) {
                    const number = Math.floor(Math.random() * 26);
                    if (alphabet[number] !== this.props.word[0] && alphabet[number] !== this.props.word[this.props.word.length - 1]) {
                        document.getElementById(`cell-${i}`).value = alphabet[number];
                        break;
                    }
                }
            }
        }
        if (full === false) return;
        let list = [];
        for (let i = 0; i < 64; ++i) {
            const valueCell = document.getElementById(`cell-${i}`).value.trim();
            list.push(valueCell);
        }
        const result = mapChecking(list, this.props.word);
        if (result === true) {
            this.props.addMap(list, this.props.word);
            this.props.changeScreen(0);
        }
        else alert(result);
    }

    componentDidMount() {
        document.getElementById('cell-0').focus();
        let remainer = this.props.word.length - 8;
        let position = 0;
        let curRow = getRndInterger(0, 7);
        for (let i = 0; i < 8; ++i) {
            document.getElementById(`cell-${curRow * 8 + i}`).value = this.props.word[position];
            position++;
            if (i === 0 || i === 7) continue;
            const low = Math.max(0, remainer - (6 - i) * 4), high = Math.min(remainer, 4);
            let step = getRndInterger(low, high);
            if (i === 6) step = remainer;
            let direction = getRndInterger(0, 1);
            if ((direction === 0 && curRow < step) || (direction === 1 && curRow + step > 7)) {
                direction = 1 - direction;
            }
            if (direction === 0) {
                for (let j = 1; j <= step; ++j) {
                    curRow--;
                    document.getElementById(`cell-${curRow * 8 + i}`).value = this.props.word[position];
                    position++;
                    remainer--;
                }
            }
            else {
                for (let j = 1; j <= step; ++j) {
                    curRow++;
                    document.getElementById(`cell-${curRow * 8 + i}`).value = this.props.word[position];
                    position++;
                    remainer--;
                }
            }
        }
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
                    onInput={toInputUppercase}
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
                />
            );
        });
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
                            backgroundColor: 'blue',
                            width: '60px',
                            height: '30px'
                        }}
                        onClick={() => {
                            for (let i = 0; i < 64; ++i) {
                                document.getElementById(`cell-${i}`).value = "";
                            }
                        }}
                    >Clear</button><br />
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
                    <h5 style={{ textAlign: 'center' }}>{this.props.word}</h5>
                    {data}
                </div>
            </div>
        );
    }
}

class EditLetter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 0,
        }
        this.changeScreen = this.changeScreen.bind(this);
    }

    changeScreen(screen) {
        this.setState({
            screen: screen,
        })
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
                        <h1>Choose the word you wana play</h1>
                        <input
                            type="text"
                            onInput={toInputUppercase}
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
                                const wordLetter = document.getElementById("wordLetter").value.trim();
                                if (wordLetter.length < 8 || wordLetter.length > 20) {
                                    alert('The word must contains 8-20 letters');
                                    return;
                                }
                                for (let i = 0; i < wordLetter.length; ++i) {
                                    if (wordLetter[i] < 'A' || wordLetter[i] > 'Z') {
                                        alert("The word must contains uppercase alphabet letters");
                                        return;
                                    }
                                }
                                this.setState({
                                    screen: 1,
                                    word: wordLetter,
                                })
                            }}
                        >Confirm</button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <WrapLetter
                    changeScreen={this.props.changeScreen}
                    addMap={this.props.addMap}
                    word={this.state.word}
                />
            );
        }
    }
}

export default EditLetter;