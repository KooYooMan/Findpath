import React from 'react';
import './Game.scss';
import carrot from './carrot.jpg';
import bunny from './bunny.jpg';

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
                        for (let i = 0; i < this.props.clicked.length; ++i) {
                            const pos = this.props.clicked[i];
                            const column = pos % 8;
                            const row = (pos - column) / 8;
                            setTimeout(() => {
                                var rabbit = document.getElementById("rabbit");
                                rabbit.style.left = `${400 + column * 70}px`;
                                rabbit.style.top = `${40 + row * 70}px`;
                            }, (i + 1) * 1000);
                        }
                        setTimeout(() => {
                            var rabbit = document.getElementById("rabbit");
                            rabbit.style.left = `965px`;
                            rabbit.style.top = `250px`;
                        }, 21000);
                        setTimeout(() => {
                            this.props.changeScreen(1);
                        }, 22000);
                        setTimeout(() => {
                            this.props.changeScreen(2);
                            this.props.updateMaxPoint();
                        }, 23000);
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
                    src={bunny}
                    id="rabbit"
                    style={{
                        width: '70px',
                        height: '70px',
                        position: 'absolute',
                        top: '530px',
                        left: '331px',
                        transitionProperty: 'top left',
                        transitionDuration: '1s',
                        transitionTimingFunction: 'linear'
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