import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css'
interface ModalProps {
    onOk: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    title: string;
    children: PropTypes.ReactElementLike;
}

export default class Modal extends React.Component<ModalProps> {
    render() {
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
                        <button onClick={this.props.onOk} className="button cancel-button">取消</button>
                        <button onClick={this.props.onCancel} className="submit submit-button">确认</button>
                    </div>
                </div>
            </div>
        )
    }
}