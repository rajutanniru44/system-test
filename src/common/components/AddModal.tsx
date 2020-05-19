import React from 'react';
import styles from '../../index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { formatDate } from '../commonFunctions';

interface Props {
    onConfirm: (data: State) => void,
    onClose: () => void,
    isReadOnly: boolean,
    taskObj: Task
}

interface Task {
    currentState: boolean,
    title: string,
    description: string
    createdAt: string
    dueDate: string
    priority: string
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
        console.log(this.props.isReadOnly, this.props.taskObj, "sdfdf")
        if (this.props.isReadOnly) {
            this.state = {
                currentState: this.props.taskObj.currentState,
                title: this.props.taskObj.title,
                description: this.props.taskObj.description,
                createdAt: this.props.taskObj.createdAt,
                dueDate: this.props.taskObj.dueDate,
                priority: this.props.taskObj.priority
            }

        } else {
            this.state = {
                currentState: true,
                title: "",
                description: "",
                createdAt: "",
                dueDate: "",
                priority: "None"
            }
        }
        console.log(this.state, "after reste")

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
        let task = this.state;
        task.createdAt = new Date().toISOString();
        this.props.onConfirm(task);
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
        const { isReadOnly } = this.props;
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
                                    <input className="form-control form-control-sm" value={this.state.title} type="text" name="title" onChange={this._handleDataChange} readOnly={isReadOnly} />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-control form-control-sm" value={this.state.description} id="description" name="description" rows={3} onChange={this._handleDataChange} readOnly={isReadOnly}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Due date</label>
                                    <input className="form-control form-control-sm" value={this.state.dueDate} type="date" name="dueDate" id="dueDate" onChange={this._handleDataChange} readOnly={isReadOnly} />
                                </div>
                                <div className="form-group">
                                    <label>Priority</label>
                                    <select className="form-control form-control-sm" value={this.state.priority} id="priority" name="priority"
                                        onChange={this._handleDataChange} disabled={isReadOnly}>
                                        <option>None</option>
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>
                                {isReadOnly ? (
                                    <>
                                        <div className="form-group">
                                            <label>Created on</label>
                                            <input className="form-control form-control-sm" value={formatDate(this.state.createdAt, '-')} type="text" name="createdAt" readOnly={isReadOnly} />
                                        </div>
                                        <div className="form-group">
                                            <label>Current State</label>
                                            <input className="form-control form-control-sm" value={this.state.currentState.toString()} type="text" name="currentState" readOnly={isReadOnly} />
                                        </div>
                                    </>
                                ) : ""}
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