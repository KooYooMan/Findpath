import React from 'react';
import './Game.scss';
import carrot from './carrot.jpg';
import Up from './up.gif';
import Down from './down.gif';
import Left from './left.gif';
import Right from './right.gif';

class Wrap extends React.Component {
    process(value) {
        return () => {
            if (this.props.clicked.length === 0) {
                if (document.querySelector(`#cell-${value}`).innerHTML === "1") {
                    this.props.addClicked(value);
                    this.props.updatePoint(100);
                    return;
                }
                else {
                    this.props.updatePoint(-50);
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
                    if (passed === 19) {
                        document.querySelectorAll('button').forEach(value => value.disabled = true);
                        const listCell = this.props.clicked.map(value => ({
                            left: (value % 8) * 70 + 420,
                            top: 50 + ((value - (value % 8)) / 8) * 70
                        }));
                        listCell.push({
                            left: 965,
                            top: 250
                        });
                        let count = 0, prevLeft = 330, prevTop = 530;
                        listCell.forEach(({left, top}) => {
                            count ++;
                            setTimeout(() => {
                                var rabbit = document.getElementById("rabbit");
                                if (left < prevLeft) {
                                    rabbit.src = Left;
                                    rabbit.style.width = '50px';
                                    rabbit.style.left = `${left}px`;
                                    rabbit.style.top = `${top}px`;
                                }
                                else if (left > prevLeft) {
                                    rabbit.src = Right;
                                    rabbit.style.width = '50px';
                                    rabbit.style.left = `${left}px`;
                                    rabbit.style.top = `${top}px`;
                                }
                                else if (top < prevTop) {
                                    rabbit.src = Up;
                                    rabbit.style.width = '27px';
                                    rabbit.style.left = `${left + 10}px`;
                                    rabbit.style.top = `${top}px`;
                                }
                                else if (top > prevTop) {
                                    rabbit.src = Down;
                                    rabbit.style.width = '27px';
                                    rabbit.style.left = `${left + 10}px`;
                                    rabbit.style.top = `${top}px`;
                                }
                                
                                prevLeft = left;
                                prevTop = top;
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
                <img
                    alt=""
                    src={Right}
                    id="rabbit"
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: '50px',
                        top: '540px',
                        left: '350px',
                        transition: 'left 1s linear, top 1s linear, scale 0s',
                    }}
                />
                <img
                    alt=""
                    src={carrot}
                    id="carrot"
                    style={{
                        width: '70px',
                        height: '70px',
                        position: 'absolute',
                        top: '250px',
                        left: '965px',
                        transitionProperty: 'top left',
                        transitionDuration: '1s',
                        transitionTimingFunction: 'linear'
                    }}
                />
                {data}
            </div>
        );
    }
}

export default Wrap;