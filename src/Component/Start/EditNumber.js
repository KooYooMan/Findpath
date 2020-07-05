import React from 'react';
import './Alter.scss';
import mapChecking from '../Resources/Map/mapChecking';
import axios from 'axios';
import wordNumber from '../Resources/Map/wordNumber';

const getRndInterger = (low, high) => Math.floor(Math.random() * (high + 1 - low)) + low;

class EditNumber extends React.Component {
    constructor(props) {
        super(props);
        this.updateMap = this.updateMap.bind(this);
    }

    componentDidMount() {
        document.getElementById('cell-0').focus();
        let remainer = wordNumber.length - 8;
        let position = 0;
        let curRow = getRndInterger(0, 7);
        for (let i = 0; i < 8; ++i) {
            document.getElementById(`cell-${curRow * 8 + i}`).value = wordNumber[position];
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
                    document.getElementById(`cell-${curRow * 8 + i}`).value = wordNumber[position];
                    position++;
                    remainer--;
                }
            }
            else {
                for (let j = 1; j <= step; ++j) {
                    curRow++;
                    document.getElementById(`cell-${curRow * 8 + i}`).value = wordNumber[position];
                    position++;
                    remainer--;
                }
            }
        }
    }

    updateMap() {
        let full = true;
        for (let i = 0; i < 64; ++i) {
            if (document.getElementById(`cell-${i}`).value === "") {
                full = false;
                const number = Math.floor(Math.random() * (19 - 2 + 1)) + 2;
                document.getElementById(`cell-${i}`).value = number.toString();
            }
        }
        if (full === false) return;
        let list = [];
        for (let i = 0; i < 64; ++i) {
            list.push(document.getElementById(`cell-${i}`).value);
        }
        const result = mapChecking(list, wordNumber);
        if (result === true) {
            this.props.updateData(list, wordNumber);
            this.props.changeScreen(0);
        }
        else alert(result);
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
                    <h5 style={{ textAlign: 'center' }}>1 to 20</h5>
                    {data}
                </div>
            </div>
        );
    }
}

export default EditNumber;