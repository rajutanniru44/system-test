import React from 'react';
import styles from '../../index.scss';

interface Props {
    onConfirm: (data: boolean) => void,
    onClose: (data: boolean) => void,
    title: string,
    message: string,
    confirmLabel: string,
    cancelLabel: string
}

class CommonConfirmation extends React.Component<Props, {}> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this._showModal();
    }

    _handleClose = () => {
        this._hideModal();
        this.props.onClose(false);
    }

    _handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        this.props.onConfirm(true);
        this._hideModal();
    }

    _showModal = () => {
        let modal = document.getElementById("confirmationModal");
        modal ? modal.style.display = "block" : null;
    }

    _hideModal = () => {
        let modal = document.getElementById("confirmationModal");
        modal ? modal.style.display = "none" : null;
    }

    render() {
        const { title, message, confirmLabel, cancelLabel } = this.props;
        return (
            <>
                <div id="confirmationModal" className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div>
                            <span className={styles.close} onClick={this._handleClose}>&times;</span>
                            <h6>{title}</h6>
                        </div>
                        <div>
                            {message}
                        </div>
                        <div className="textAlignRight">
                            <button type="submit" className="btn btn-secondary btnAlign" onClick={this._handleClose}>{cancelLabel}</button>
                            <button type="submit" className="btn btn-primary btnAlign" onClick={this._handleConfirm}>{confirmLabel}</button>

                        </div>

                    </div>
                </div >
            </>
        )
    }
}


export default CommonConfirmation;