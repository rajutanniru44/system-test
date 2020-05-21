import React from 'react';
import styles from '../../index.scss';

import { formatDate, fieldDate } from '../commonFunctions';
import { addTodo, editTodo } from '../../actions/index';
import { connect } from 'react-redux'

interface Props {
    onConfirm: (data: boolean) => void,
    onClose: () => void,
    isReadOnly: boolean,
    isDataAvailable: boolean,
    taskObj: Task
    store: any,
    index: number
}

interface Task {
    currentState: boolean,
    title: string,
    description: string
    createdAt: Date
    dueDate: Date
    priority: string
}
interface State {
    currentState: boolean,
    title: string,
    description: string
    createdAt: Date
    dueDate: Date
    priority: string,
    errors: {
        title: string,
        description: string
    }
}
class AddModal extends React.Component<Props, State> {
    state: State;
    defaultState: State;
    constructor(props: any) {
        super(props);
        if (this.props.isDataAvailable) {
            this.state = {
                currentState: this.props.taskObj.currentState,
                title: this.props.taskObj.title,
                description: this.props.taskObj.description,
                createdAt: new Date(this.props.taskObj.createdAt),
                dueDate: new Date(this.props.taskObj.dueDate),
                priority: this.props.taskObj.priority,
                errors: {
                    title: "",
                    description: ""
                }
            }

        } else {
            this.state = {
                currentState: false,
                title: "",
                description: "",
                createdAt: new Date(),
                dueDate: new Date(),
                priority: "None",
                errors: {
                    title: "",
                    description: ""
                }
            }
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
                this.setState({ dueDate: new Date(value) });
                break;
            default:
                return null;
        }
    }

    _handleClose = () => {
        this._hideModal();
        this.props.onClose();
    }

    handleValidation = () => {
        let { title, description } = this.state;
        let errors = { title: "", description: "" };
        let formIsValid = true;

        //title
        if (!title) {
            formIsValid = false;
            errors["title"] = "Cannot be empty";
        }

        if (typeof title !== "undefined") {
            title.length >= 10 && title.length <= 140 ? formIsValid = true : formIsValid = false;
        }

        //description
        if (!description) {
            formIsValid = false;
            errors["description"] = "Cannot be empty";
        }

        if (typeof description !== "undefined") {
            description.length >= 10 && description.length <= 500 ? formIsValid = true : formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    _handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (this.handleValidation()) {
            this._hideModal();
            let task = this.state;
            task.createdAt = new Date();
            if (this.props.isDataAvailable) {
                this.props.store.dispatch(editTodo(task, this.props.index));
            } else {
                this.props.store.dispatch(addTodo(task));
            }
            this.props.onConfirm(true);
        } else {
            alert("Form has errors.")
        }
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
        const { isReadOnly, isDataAvailable } = this.props;
        return (
            <>
                <div id="myModal" className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div>
                            <span className={styles.close} onClick={this._handleClose}>&times;</span>
                            <h6>{isReadOnly ? 'View Task' : isDataAvailable ? "Edit Task" : "Add Task"}</h6>
                        </div>
                        <div className={styles.contentStyle}>
                            <form>
                                <div className="form-group">
                                    <label>Summary</label>
                                    <input className="form-control form-control-sm" value={this.state.title} type="text" name="title" onChange={this._handleDataChange} readOnly={isReadOnly} />
                                    <span style={{ color: "red" }}>{this.state.errors["title"]}</span>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-control form-control-sm" value={this.state.description} id="description" name="description" rows={3} onChange={this._handleDataChange} readOnly={isReadOnly}></textarea>
                                    <span style={{ color: "red" }}>{this.state.errors["description"]}</span>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label>Due date</label>
                                        <input className="form-control form-control-sm" value={fieldDate(new Date(this.state.dueDate), '-')} type="date" name="dueDate" id="dueDate" onChange={this._handleDataChange} readOnly={isReadOnly} />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Priority</label>
                                        <select className="form-control form-control-sm" value={this.state.priority} id="priority" name="priority"
                                            onChange={this._handleDataChange} disabled={isReadOnly}>
                                            <option>None</option>
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                    </div>
                                </div>



                                {isReadOnly ? (
                                    <>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label>Created on</label>
                                                <input className="form-control form-control-sm" value={formatDate(this.state.createdAt, '-')} type="text" name="createdAt" readOnly={isReadOnly} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Current State</label>
                                                <input className="form-control form-control-sm" value={this.state.currentState.toString()} type="text" name="currentState" readOnly={isReadOnly} />
                                            </div>
                                        </div>
                                    </>
                                ) : ""}
                            </form>
                        </div>
                        {
                            !isReadOnly ? <div className="textAlignRight">
                                <button type="submit" className="btn btn-secondary btnAlign" onClick={this._handleClose}>Cancel</button>
                                <button type="submit" className="btn btn-primary btnAlign" onClick={this._handleConfirm}>Save Task</button>
                            </div> : <div></div>
                        }


                    </div>
                </div >
            </>
        )
    }
}


export default connect()(AddModal)