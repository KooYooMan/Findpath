import React from 'react';
import './Game.scss';
import carrot from '../Resources/Image/carrot.jpg';
import Up from '../Resources/Image/up.gif';
import Down from '../Resources/Image/down.gif';
import Left from '../Resources/Image/left.gif';
import Right from '../Resources/Image/right.gif';
import Correct from '../Resources/Sound/Correct.mp3';
import Wrong from '../Resources/Sound/Wrong.mp3';
import gameMusic from '../Resources/Sound/gameMusic.mp3';

class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            rowRabbit: 0,
            rowCarrot: 0,
        };
    }

    gameMusic = new Audio(gameMusic);

    detectRowRabbit(data) {
        for (let i = 0; i < 64; i += 8) {
            if (data[i] === 1) return i / 8;
        }
    }

    detectRowCarrot(data) {
        for (let i = 0; i < 64; i += 8) {
            if (data[i + 7] === 20) return i / 8;
        }
    }

    componentDidMount() {
        const rowRabbit = this.detectRowRabbit(this.props.data);
        const rowCarrot = this.detectRowCarrot(this.props.data);
        this.setState({
            list: this.props.data,
            rowRabbit: rowRabbit,
            rowCarrot: rowCarrot,
        });
        this.gameMusic.loop = true;
        this.gameMusic.volume = 0.3;
        this.gameMusic.play();
    }

    componentWillUnmount() {
        this.gameMusic.pause();
        this.gameMusic.currentTime = 0;
    }
 
    process(value) {
        return () => {
            if (this.props.clicked.length === 0) {
                if (document.querySelector(`#cell-${value}`).innerHTML === "1") {
                    this.props.addClicked(value);
                    this.props.updatePoint(100);
                    new Audio(Correct).play();
                    return;
                }
                else {
                    this.props.updatePoint(-50);
                    new Audio(Wrong).play();
                    document.querySelector(`#cell-${value}`).style.backgroundColor = "red";
                    setTimeout(() => {
                        document.querySelector(`#cell-${value}`).style.backgroundColor = "";
                    }, 200);
                }
            }
            else {
                const passed = this.props.clicked.length;
                const prev = this.props.clicked[this.props.clicked.length - 1];
                const prevColumn = prev % 8;
                const prevRow = (prev - prevColumn) / 8;
                const valueColumn = value % 8;
                const valueRow = (value - valueColumn) / 8;
                const foo = parseInt(document.querySelector(`#cell-${value}`).innerHTML);
                const bar = parseInt(document.querySelector(`#cell-${prev}`).innerHTML);
                if (Math.abs(prevColumn - valueColumn) + Math.abs(valueRow - prevRow) === 0) return;
                if (Math.abs(prevColumn - valueColumn) + Math.abs(valueRow - prevRow) === 1
                    && foo === bar + 1) {
                    this.props.addClicked(value);
                    this.props.updatePoint(100);
                    new Audio(Correct).play();
                    if (passed === 19) {
                        document.querySelectorAll('button').forEach(value => value.disabled = true);
                        const listCell = this.props.clicked.map(value => ({
                            column: value % 8,
                            row: (value - (value % 8)) / 8,
                        }));
                        listCell.push({
                            column: 8,
                            row: this.rowCarrot
                        });
                        let count = 0, prevRow = this.rowRabbit, prevColumn = -1;
                        listCell.forEach(({column, row}) => {
                            count ++;
                            setTimeout(() => {
                                var rabbit = document.getElementById("rabbit");
                                if (column < prevColumn) {
                                    rabbit.src = Left;
                                    rabbit.style.width = '50px';
                                    rabbit.style.top = `${-560 + row * 70}px`;
                                    rabbit.style.left = `${column * 70 - 49}px`;
                                }
                                else if (column > prevColumn) {
                                    rabbit.src = Right;
                                    rabbit.style.width = '50px';
                                    rabbit.style.top = `${-560 + row * 70}px`;
                                    rabbit.style.left = `${column * 70 - 49}px`;
                                }
                                else if (row < prevRow) {
                                    rabbit.src = Up;
                                    rabbit.style.width = '27px';
                                    rabbit.style.top = `${-560 + row * 70 + 10}px`;
                                    rabbit.style.left = `${column * 70 - 49}px`;
                                }
                                else if (row > prevRow) {
                                    rabbit.src = Down;
                                    rabbit.style.width = '27px';
                                    rabbit.style.top = `${-560 + row * 70 + 10}px`;
                                    rabbit.style.left = `${column * 70 - 49}px`;
                                }
                                prevRow = row;
                                prevColumn = column;
                            }, count * 1000);
                        });
                        setTimeout(() => {
                            this.props.changeScreen(1);
                        }, 23000);
                        setTimeout(() => {
                            this.props.changeScreen(2);
                            this.props.updateMaxPoint();
                        }, 26000);
                    }
                    return;
                }
                this.props.updatePoint(-50);
                new Audio(Wrong).play();
                document.querySelector(`#cell-${value}`).style.backgroundColor = "red";
                setTimeout(() => {
                    document.querySelector(`#cell-${value}`).style.backgroundColor = "";
                }, 200);
            };
        }
    }

    render() {
        var count = -1;
        const data = this.state.list.map(value => {
            count++;
            return (
                <button
                    className="square"
                    id={"cell-" + count}
                    key={count}
                    style={{
                        height: '70px',
                        width: '70px',
                        padding: '0',
                        margin: '0',
                        backgroundColor: (this.props.clicked.includes(count) ? '#17fc03' : ''),
                        fontSize: '30px', textAlign: 'center'
                    }}
                    onClick={this.process(count)}
                >
                    {value}
                </button>);
        })
        return (
            <div className="wrap">
                {data}
                <img
                    alt=""
                    src={carrot}
                    id="carrot"
                    style={{
                        width: '70px',
                        height: '70px',
                        position: 'relative',
                        top: `${-560 + this.state.rowCarrot * 70}px`,
                        left: '560px',
                        transitionProperty: 'top left',
                        transitionDuration: '1s',
                        transitionTimingFunction: 'linear'
                    }}
                />
                <img
                    alt=""
                    src={Right}
                    id="rabbit"
                    style={{
                        position: 'relative',
                        width: '50px',
                        height: '50px',
                        top: `${-560 + this.state.rowRabbit * 70}px`,
                        left: `-119px`,
                        transition: 'left 1s linear, top 1s linear, scale 0s',
                    }}
                />
            </div>
        );
    }
}

export default Wrap;