import React from 'react';
import { formatDate } from '../commonFunctions';
import AddModal from "./AddModal";

interface Props {
    columns: Array<string>,
    rows: Array<Task>
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
    hideModal: boolean,
    isReadOnly: boolean,
    // taskObj: Task
}
class Table extends React.Component<Props, State> {
    state: State;
    taskObj: Task = {
        currentState: false,
        title: "",
        description: "",
        createdAt: "",
        dueDate: "",
        priority: ""
    }
    constructor(props: any) {
        super(props);
        this.state = {
            hideModal: false,
            isReadOnly: false,

        }
    }

    componentDidMount() {
        var dataColumns = this.props.columns;
        var dataRows = this.props.rows;
        var tableHeaders = (<thead>
            <tr>
                {dataColumns.map(function (column) {
                    return <th>{column}</th>;
                })}
            </tr>
        </thead>);

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
        this.taskObj = data;
        this.setState({ hideModal: true, isReadOnly: true });
    }

    render() {
        const { hideModal, isReadOnly } = this.state;
        console.log(this.props.rows, "sdfd")
        const tableHeaders = (<thead>
            <tr>
                {this.props.columns.map((column: string, index: number) => {
                    return <th key={index}>{column}</th>;
                })}
            </tr>
        </thead>);

        const tableBody = this.props.rows.map((row: Task, index: number) => {
            return (
                <tr key={index} onClick={() => this._handleDisableMode(row)}>
                    <td key={row.title}>{row.title}</td>
                    <td key={row.priority}>{row.priority}</td>
                    <td key={row.createdAt}>{formatDate(row.createdAt, '-')}</td>
                    <td key={row.dueDate}>{formatDate(row.dueDate, '-')}</td>

                </tr>);
        });
        return (
            <>
                {hideModal ? <AddModal onConfirm={this.onConfirm} onClose={this._onClose} isReadOnly={isReadOnly} taskObj={this.taskObj} /> : ""}
                <table className="table table-bordered table-hover">
                    {tableHeaders}
                    <tbody>{tableBody}</tbody>
                </table>
            </>
        )
    }
}

export default Table;