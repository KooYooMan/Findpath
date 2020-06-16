import React from 'react';
import './Start.scss';
import { Spring } from 'react-spring/renderprops';

class Tutorial extends React.Component {
    render() {
        return (
            <Spring
                from={{
                    width: '0%',
                    height: '0%',
                    top: '100%',
                }}
                to={{
                    width: '100%',
                    height: '100%',
                    top: '0%'
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
                                <div className="f c1" style={{ fontSize: '50px' }}>
                                    <div
                                        style={{
                                            height: '80%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <div style={{ height: '50%', width: '100%' }}>Tutorial</div>
                                        <h5 style={{ height: '50%', width: '100%', fontSize: '15px' }}>
                                            <div id="text-tutorial-start">
                                                Người chơi sẽ chọn lần lượt các ô có số từ 1 đến 20. Các ô được chọn sẽ được tô màu xanh. Trường hợp đang ở ô số 9, có 2 lựa chọn số 10 cho người chơi đi. Người chơi chọn vào bất cứ ô số 10 nào, đều hiển thị ô đó đúng và cộng điểm. Mỗi bước quay lại trừ đi 100 điểm (Điểm nhỏ nhất là 0) và ô đã quay lại hiển thị nền trắng như ban đầu.
                                        </div>
                                        </h5>
                                    </div>
                                    <a href="/#" onClick={() => this.props.changeScreen(0)}>Back</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Spring>
        );
    }
}

export default Tutorial;