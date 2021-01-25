import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import './TestModal.css'

import Modal, { ModalService } from '../Modal.component/Modal';

interface Props {
    value?: number;
}
interface TestState {
    value: number;
    isShowModal: boolean;
    inputName: string;
    inputNameStash: string;
  }

export default class TestModal extends React.Component<Props, TestState> {

    constructor(props: Props) {
        super(props);
        this.state = {
          value: 0,
          isShowModal: false,
          inputName: '',
          inputNameStash: '',
        }
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

    openModalServicePromise = async () => {
        ModalService.open({
            title: '期待返回promise进行链式调用',
            children: '这是期待的promise返回的格式，这样更好用感觉'
        }).then(() => {
            console.log('modal 点击了确定✅, and close')
        }).catch(() => {
            console.log('modal 点击了取消🈲️, and close')
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
        {isShowModal && <Modal {...ModalProps}>
            <div>
              <input type="text" value={this.state.inputNameStash} onChange={this.inputNameChange} />
            </div>
          </Modal>}
          <button onClick={this.openModal}>弹出modal框inputName: {this.state.inputName}</button>
          <button onClick={this.openModalService}>点击测试命令ModalService打开弹框</button>
          <button onClick={this.openModalServicePromise}>点击测试命令ModalService返回promise</button>
        </>
        )
    }
    
}