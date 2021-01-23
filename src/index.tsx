import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './component/Modal';
import './index.css';

interface Props {
  value?: number;
}
interface State {
  value: string | null;
}

interface TestState {
  value: number;
  isShowModal: boolean;
}
class Square extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {value: null}
  }
  render() {
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i: number) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component<Props, TestState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
      isShowModal: false
    }
  }

  updateValue = () => {
    this.setState({
      value: this.state.value + 1
    })
  }

  openModal = () => {
    this.setState({
      isShowModal: true
    })
  }
  render() {
    const ModalProps = {
      onOk: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {},
      onCancel:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {},
      title: '测试modal',
    }
    const { isShowModal } = this.state;
    return (
      <>
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
          <TestReactUpdate value={this.state.value} >
            <TestReactUpdate />
          </TestReactUpdate>
          <button onClick={this.updateValue}>click to update TestReactUpdate</button>
        </div>
        {isShowModal && <Modal {...ModalProps}>
          <div>
            {'modal content'}
          </div>
        </Modal>}
        <button onClick={this.openModal}>弹出modal框</button>
      </>
    );
  }
}

function TestReactUpdate(props: {
  value?: number;
  children?: any;
}) {
  return <div>
    props.value: {props.value}
    {new Date().toString()}
    children: {props.children}
  </div>
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
