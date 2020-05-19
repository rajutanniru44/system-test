import React from 'react';
import styles from '../../index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
interface Props {
    onConfirm: () => void,
    onClose: () => void
}
interface State {
    currentState: boolean,
    title: string,
    description: string
    createdAt: string
    dueDate: string
    priority: string
}
class AddModal extends React.Component<Props, State> {
    state: State;
    defaultState: State;
    constructor(props: any) {
        super(props);
        this.state = {
            currentState: true,
            title: "",
            description: "",
            createdAt: "",
            dueDate: "",
            priority: "None"
        }
        this.defaultState = this.state;
    }

    componentDidMount() {
        this._showModal();
    }

    _handleDataChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        event.preventDefault();
        let { name, value } = event.target;
        switch (name) {
            case "title":
                this.setState({ title: value });
                break;
            case "description":
                this.setState({ description: value });
                break;
            case "priority":
                this.setState({ priority: value });
                break;
            case "dueDate":
                this.setState({ dueDate: new Date(value).toISOString() });
                break;
            default:
                return null;
        }
    }

    _handleClose = () => {
        this._hideModal();
        this.props.onClose();
    }

    _handleConfirm = (event: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        this._hideModal();
        this.props.onConfirm();
    }

    _showModal = () => {
        let modal = document.getElementById("myModal");
        modal ? modal.style.display = "block" : null;
    }

    _hideModal = () => {
        let modal = document.getElementById("myModal");
        modal ? modal.style.display = "none" : null;
        this.setState(this.defaultState)
    }

    render() {
        return (
            <>
                <div id="myModal" className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div>
                            <span className={styles.close} onClick={this._handleClose}>&times;</span>
                            <h6>Add Task</h6>
                        </div>
                        <div className={styles.contentStyle}>
                            <form>
                                <div className="form-group">
                                    <label>Summary</label>
                                    <input className="form-control form-control-sm" value={this.state.title} type="text" name="title" onChange={this._handleDataChange} />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-control form-control-sm" value={this.state.description} id="description" name="description" rows={3} onChange={this._handleDataChange}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Due date</label>
                                    <input className="form-control form-control-sm" value={this.state.dueDate} type="date" name="dueDate" id="dueDate" onChange={this._handleDataChange} />
                                </div>
                                <div className="form-group">
                                    <label>Priority</label>
                                    <select className="form-control form-control-sm" value={this.state.priority} id="priority" name="priority"
                                        onChange={this._handleDataChange}>
                                        <option>None</option>
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>

                            </form>
                        </div>
                        <div className="textAlignRight">
                            <button type="submit" className="btn btn-secondary btnAlign" onClick={this._handleClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary btnAlign" onClick={this._handleConfirm}>Save</button>

                        </div>

                    </div>
                </div >
            </>
        )
    }
}


export default AddModal;