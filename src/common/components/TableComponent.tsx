import React from 'react';
import { formatDate } from '../commonFunctions';
import AddModal from "./AddModal";
import CommonConfirmation from './CommonConfirmationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons'

interface Props {
    columns: Array<string>,
    rows: Array<Task>
}

interface SyntheticEvent<T> {
    currentTarget: EventTarget & T;
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
    hideModal: boolean,
    isReadOnly: boolean,
    isDataAvailable: boolean,
    hideConfirmationModal: boolean
    confirmationTitle: string
    confirmationMessage: string,
    confirmBtnLabel: string,
    cancelBtnLabel: string
    // taskObj: Task
}
class Table extends React.Component<Props, State> {
    state: State;
    taskObj: Task = {
        currentState: false,
        title: "",
        description: "",
        createdAt: new Date(),
        dueDate: new Date(),
        priority: ""
    }
    defaultTask: Task;
    constructor(props: any) {
        super(props);
        this.state = {
            hideModal: false,
            isReadOnly: false,
            isDataAvailable: false,
            hideConfirmationModal: false,
            confirmationTitle: "",
            confirmationMessage: "",
            confirmBtnLabel: "",
            cancelBtnLabel: ""
        }
        this.defaultTask = this.taskObj;
    }

    componentDidMount() {
    }

    onConfirm = (data: Task) => {
        // this.taskList.unshift(data);
        // localStorage.setItem("listData", JSON.stringify(this.taskList));
        this.setState({ hideModal: false })
    }

    _onClose = () => {
        this.setState({ hideModal: false })
    }

    _handleDisableMode(data: Task) {
        this.taskObj = this.defaultTask;
        this.taskObj = data;
        this.setState({ hideModal: true, isReadOnly: true, isDataAvailable: true });
    }

    _handleEdit(event: React.MouseEvent<SVGSVGElement>, data: Task) {
        event.stopPropagation();
        this.taskObj = this.defaultTask;
        this.taskObj = data;
        this.setState({ hideModal: true, isReadOnly: false, isDataAvailable: true })
    }

    _handleDelete(event: React.MouseEvent<SVGSVGElement>, data: Task) {
        event.stopPropagation();
        this.taskObj = this.defaultTask;
        this.taskObj = data;
        this.setState({
            hideConfirmationModal: true,
            confirmationTitle: data.title,
            confirmationMessage: "Do you want to delete this task?",
            confirmBtnLabel: "Yes",
            cancelBtnLabel: "No"
        })

    }

    _handleMark(event: React.MouseEvent<HTMLButtonElement>, data: Task) {
        event.stopPropagation();
        this.taskObj = this.defaultTask;
        this.taskObj = data;
        this.setState({
            hideConfirmationModal: true,
            confirmationTitle: data.title,
            confirmationMessage: !data.currentState ? "Do you want to mark this task as done?" : "Do you want to re-open this task?",
            confirmBtnLabel: "Yes",
            cancelBtnLabel: "No"
        });
    }

    _handleConfirmationModal = (data: boolean) => {
        const { confirmationMessage } = this.state;
        if (confirmationMessage === "Do you want to delete this task?") {
            this.props.rows.filter((obj: Task) => {
                return obj.title != this.taskObj.title
            });
        } else {
            this.props.rows.forEach((obj: Task) => {
                if (obj.title === this.taskObj.title) {
                    obj.currentState = !this.taskObj.currentState;
                }
            })
        }
        this.setState({ hideConfirmationModal: false });
    }

    _handleCloseModal = (data: boolean) => {
        this.setState({ hideConfirmationModal: false })
    }

    render() {
        const { hideModal, isReadOnly, isDataAvailable, hideConfirmationModal, confirmationMessage, confirmationTitle, confirmBtnLabel, cancelBtnLabel } = this.state;
        const tableHeaders = (<thead>
            <tr key="tdd">
                {this.props.columns.map((column: string, index: number) => {
                    return <th key={`${index}i`}>{column}</th>;
                })}
            </tr>
        </thead>);

        const tableBody = this.props.rows.map((row: Task, index: number) => {
            return (
                <tr key={index} onClick={() => this._handleDisableMode(row)}>
                    <td key={row.title} className={row.currentState ? "bg-green" : ""} >{row.title}</td>
                    <td key={row.priority} className={row.currentState ? "bg-green" : ""}>{row.priority}</td>
                    <td key={row.createdAt.toString()} className={row.currentState ? "bg-green" : ""}>{formatDate(row.createdAt, '-')}</td>
                    <td key={row.dueDate.toString()} className={row.currentState ? "bg-green" : ""}>{formatDate(row.dueDate, '-')}</td>
                    <td>
                        <FontAwesomeIcon icon={faPencilAlt} onClick={(e) => this._handleEdit(e, row)} />
                        <FontAwesomeIcon icon={faTrashAlt} onClick={(e) => this._handleDelete(e, row)} />
                        <button type="button" className="btn btn-primary btnAlign" onClick={(e) => this._handleMark(e, row)}>{!row.currentState ? 'done' : 're-open'}</button>
                    </td>
                </tr>);
        });
        return (
            <>
                {hideModal ? <AddModal
                    onConfirm={this.onConfirm}
                    onClose={this._onClose}
                    isReadOnly={isReadOnly}
                    taskObj={this.taskObj}
                    isDataAvailable={isDataAvailable}
                /> : ""}

                {hideConfirmationModal ? <CommonConfirmation
                    onConfirm={this._handleConfirmationModal}
                    onClose={this._handleCloseModal}
                    title={confirmationTitle}
                    message={confirmationMessage}
                    confirmLabel={confirmBtnLabel}
                    cancelLabel={cancelBtnLabel} /> : ""}

                <table className="table table-bordered table-hover">
                    {tableHeaders}
                    <tbody>{tableBody}</tbody>
                </table>
            </>
        )
    }
}

export default Table;