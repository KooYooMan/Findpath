import React from 'react';
import './Game.scss';
import door from '../Resources/Image/house.png';
import carrot from '../Resources/Image/carrot.jpg';
import Up from '../Resources/Image/up.gif';
import Down from '../Resources/Image/down.gif';
import Left from '../Resources/Image/left.gif';
import Right from '../Resources/Image/right.gif';
import Correct from '../Resources/Sound/Correct.mp3';
import Wrong from '../Resources/Sound/Wrong.mp3';
import gameMusic from '../Resources/Sound/gameMusic.mp3';
import Volume from '../VolumeSlider/VolumeSlider';

const detectRowRabbit = (data, word) => {
    for (let i = 0; i < 64; i += 8) {
        if (data[i] === word[0]) return i / 8;
    }
}

const detectRowCarrot = (data, word) => {
    for (let i = 0; i < 64; i += 8) {
        if (data[i + 7] === word[word.length - 1]) return i / 8;
    }
}

class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: 30,
        };
        this.changeVolume = this.changeVolume.bind(this);
    }

    gameMusic = new Audio(gameMusic);

    changeVolume(value) {
        this.gameMusic.pause();
        this.gameMusic.volume = value / 100;
        this.gameMusic.play();
        this.setState({
            volume: value,
        });
    }

    componentDidMount() {
        const rowRabbit = detectRowRabbit(this.props.list, this.props.word);
        const rowCarrot = detectRowCarrot(this.props.list, this.props.word);
        var rabbit = document.getElementById("rabbit");
        rabbit.style.top = `${-520 + rowRabbit * 65}px`;
        rabbit.style.left = `-119px`;
        var carrot = document.getElementById("carrot");
        carrot.style.top = `${-520 + rowCarrot * 65}px`;
        carrot.style.left = `520px`;
        this.gameMusic.loop = true;
        this.gameMusic.play();
    }

    componentWillUnmount() {
        this.gameMusic.pause();
        this.gameMusic.currentTime = 0;
    }

    process(value) {
        return () => {
            if (this.props.clicked.length === 0) {
                if (document.querySelector(`#cell-${value}`).innerHTML === this.props.word[0] && value % 8 === 0) {
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
                const prev = this.props.clicked[passed - 1];
                const prevColumn = prev % 8;
                const prevRow = (prev - prevColumn) / 8;
                const valueColumn = value % 8;
                const valueRow = (value - valueColumn) / 8;
                const foo = document.querySelector(`#cell-${value}`).innerHTML;
                if (Math.abs(prevColumn - valueColumn) + Math.abs(valueRow - prevRow) === 0) return;
                if (this.props.clicked.includes(value)) return;
                if (Math.abs(prevColumn - valueColumn) + Math.abs(valueRow - prevRow) === 1
                    && foo === this.props.word[this.props.clicked.length]) {
                    this.props.addClicked(value);
                    this.props.updatePoint(100);
                    new Audio(Correct).play();
                    if (passed === this.props.word.length - 1 && valueColumn === 7) {
                        document.querySelectorAll('button').forEach(value => {
                            value.disabled = true;
                        });
                        const listCell = this.props.clicked.map(value => ({
                            column: value % 8,
                            row: (value - (value % 8)) / 8,
                        }));
                        listCell.push({
                            column: 8,
                            row: this.rowCarrot
                        });
                        let count = 0, prevRow = this.rowRabbit, prevColumn = -1;
                        listCell.forEach(({ column, row }) => {
                            count++;
                            setTimeout(() => {
                                var rabbit = document.getElementById("rabbit");
                                if (column < prevColumn) {
                                    rabbit.src = Left;
                                    rabbit.style.width = '42px';
                                    rabbit.style.top = `${-520 + row * 65}px`;
                                    rabbit.style.left = `${column * 65 - 49}px`;
                                }
                                else if (column > prevColumn) {
                                    rabbit.src = Right;
                                    rabbit.style.width = '42px';
                                    rabbit.style.top = `${-520 + row * 65}px`;
                                    rabbit.style.left = `${column * 65 - 49}px`;
                                }
                                else if (row < prevRow) {
                                    rabbit.src = Up;
                                    rabbit.style.width = '25px';
                                    rabbit.style.top = `${-520 + row * 65 + 10}px`;
                                    rabbit.style.left = `${column * 65 - 49}px`;
                                }
                                else if (row > prevRow) {
                                    rabbit.src = Down;
                                    rabbit.style.width = '25px';
                                    rabbit.style.top = `${-520 + row * 65 + 10}px`;
                                    rabbit.style.left = `${column * 65 - 49}px`;
                                }
                                prevRow = row;
                                prevColumn = column;
                            }, count * 1000);
                        });
                        setTimeout(() => {
                            this.props.nextQuestion();
                        }, (this.props.word.length + 2) * 1000);
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
        const data = this.props.list.map(value => {
            count++;
            return (
                <button
                    className="square"
                    id={"cell-" + count}
                    key={count}
                    style={{
                        height: '65px',
                        width: '65px',
                        padding: '0',
                        margin: '0',
                        backgroundColor: (this.props.clicked.includes(count) ? '#17fc03' : ''),
                        fontSize: '30px', textAlign: 'center'
                    }}
                    onClick={this.process(count)}
                >
                    {value}
                </button>);
        });
        const rowRabbit = detectRowRabbit(this.props.list, this.props.word);
        const rowCarrot = detectRowCarrot(this.props.list, this.props.word);
        return (
            <div className="wrap">
                <h4 style={{textAlign: 'center'}}>
                    {(this.props.word[0] === '1' ? "Tìm đường đi từ 1 đến 20" : `Hãy nối các chữ cái tạo ra từ ${this.props.word}`)}
                </h4>
                {data}
                <img
                    alt=""
                    src={(this.props.last === true) ? carrot : door}
                    id="carrot"
                    style={{
                        width: '65px',
                        height: '65px',
                        position: 'relative',
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
                        width: '46px',
                        height: '46px',
                        transition: 'left 1s linear, top 1s linear, scale 0s',
                    }}
                />
                <Volume
                    volume={this.state.volume}
                    changeVolume={this.changeVolume}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '0px',
                        height: '0px'
                    }}
                />
            </div>
        );
    }
}

export default Wrap;