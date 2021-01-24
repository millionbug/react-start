import React from 'react';
import ReactDOM from 'react-dom';
import Modal, { ModalService } from './component/Modal';
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
  inputName: string;
  inputNameStash: string;
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
      isShowModal: false,
      inputName: '',
      inputNameStash: '',
    }
  }

  updateValue = () => {
    this.setState({
      value: this.state.value + 1
    })
  }

  inputNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputNameStash: event.target.value
    });
  }

  openModal = () => {
    this.setState({
      isShowModal: true
    })
  }

  openModalService = () => {
    ModalService.open({
      onOk: () => {
        console.log('modal submit 👌 by service, and close')
      },
      onCancel: () => {
        console.log('modal cancel ❌ by service, and close')
      },
      title: '这是service打开的',
      children: '这是service打开的,如果需要children中潜入form我还没有想到怎么写，sad 😭'
    })
  }

  render() {
    const ModalProps = {
      onOk: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({
          isShowModal: false,
          inputName: this.state.inputNameStash
        });
        console.log(this.state.inputName);
        console.log('modal submit 👌, and close')
      },
      onCancel:(event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({
          isShowModal: false,
          inputNameStash: this.state.inputName
        });
        console.log('modal cancel ❌, and close')
      },
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
            <input type="text" value={this.state.inputNameStash} onChange={this.inputNameChange} />
          </div>
        </Modal>}
        <button onClick={this.openModal}>弹出modal框inputName: {this.state.inputName}</button>
        <button onClick={this.openModalService}>点击测试命令ModalService打开弹框</button>
      </>
    );
  }
}

/**
 * 结论：react做diff时，发现节点有更改，则直接将节点下掉
 * 不会对子节点进行diff
 */
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
