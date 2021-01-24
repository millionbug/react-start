import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import './Modal.css'
interface ModalProps {
    onOk: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onCancel: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    title: string;
    children: PropTypes.ReactElementLike;
}

interface ModalState {
    isShowModal: boolean;
}

export class ModalService {
    static open(props: ModalProps) {
        const modalContainer = document.createElement('div');
        document.body.appendChild(modalContainer);
        function onOk() {
            props.onOk();
            ReactDOM.unmountComponentAtNode(modalContainer);
        }

        function onCancel() {
            props.onCancel();
            ReactDOM.unmountComponentAtNode(modalContainer);
        }
        ReactDOM.render(<Modal {...props} onOk={onOk} onCancel={onCancel} />, modalContainer);
    }
}


export default class Modal extends React.Component<ModalProps, ModalState> {

    constructor(props: ModalProps) {
        super(props);
        this.state = {
            isShowModal: true
        }
    }

    onOk = () => {
        // 暂时先让外面来close掉吧
        this.props.onOk();
    }

    onCancel = () => {
        this.props.onCancel();
    }

    // 组件形式打开的，则只能外面关掉该弹框。如果命令方式打开，则需要内部关掉
    close = () => {
        this.setState({
            isShowModal: false
        })
    }

    render() {
        if (!this.state.isShowModal) {
            return;
        }
        return (
            <div className="modal-container">
                <div className="modal-instance">
                    <div className="modal-title">
                        {this.props.title}
                    </div>

                    <div className="modal-content">
                        {this.props.children}
                    </div>

                    <div className="modal-footer">
                        <button onClick={this.onCancel}  className="button cancel-button">取消</button>
                        <button onClick={this.onOk} className="submit submit-button">确认</button>
                    </div>
                </div>
            </div>
        )
    }
}