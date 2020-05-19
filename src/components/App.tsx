import React from 'react';
import styles from '../index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AddModal from '../common/components/AddModal';
import Table from '../common/components/TableComponent';
import * as _ from "lodash";

interface State {
    hideModal: boolean,
    data: Array<Task>,
    activeSection: string,
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
class App extends React.Component {
    state: State;
    taskList: Array<Task> = [];
    constructor(props: any) {
        super(props);
        this.state = {
            hideModal: false,
            data: [],
            activeSection: "All Tasks",
            isReadOnly: false,
            taskObj: {
                currentState: false,
                title: "",
                description: "",
                createdAt: "",
                dueDate: "",
                priority: ""
            }
        }
    }

    _openAddModal = () => {
        this.setState({ hideModal: true })
    }

    onConfirm = (data: Task) => {
        this.taskList.unshift(data);
        console.log(this.taskList);
        // localStorage.setItem("listData", JSON.stringify(this.taskList));
        this.setState({ hideModal: false, data: this.taskList })
    }

    _onClose = () => {
        alert('close called');
        this.setState({ hideModal: false })
    }

    openCity(event, key: string) {
        // this.taskList = JSON.parse(localStorage.getItem("listData") || "[]");
        let list = _.cloneDeep(this.taskList);
        if (key === "Pending") {
            list = list.filter(obb => {
                return obb.currentState === true;
            });
        }
        if (key === "Completed") {
            list = list.filter(obb => {
                return obb.currentState === false;
            });
        }
        this.setState({ activeSection: key, data: list });
    }



    getClasss = (event, key: string): string | undefined => {
        const { activeSection } = this.state;
        if (key === activeSection) {
            return "tablinks active";
        } else {
            return "tablinks";
        }
    }

    render() {
        const { hideModal, data, isReadOnly, taskObj } = this.state;
        const dataColumns = ["Summary", "Priority", "Created On", "Due Date", "Actions"];
        return (
            <>
                {hideModal ? <AddModal onConfirm={this.onConfirm} onClose={this._onClose} isReadOnly={isReadOnly} taskObj={taskObj} /> : ""}
                <div className={styles.bottomRightAlign}>
                    <FontAwesomeIcon icon={faPlus} onClick={this._openAddModal} />
                </div>
                <div className="tab">
                    <button className={this.getClasss(event, 'All Tasks')} onClick={() => this.openCity(event, 'All Tasks')}>All Tasks</button>
                    <button className={this.getClasss(event, 'Completed')} onClick={() => this.openCity(event, 'Completed')}>Completed</button>
                    <button className={this.getClasss(event, 'Pending')} onClick={() => this.openCity(event, 'Pending')}>Pending</button>
                </div>
                <Table columns={dataColumns} rows={data} />
            </>
        )
    }
}


export default App;