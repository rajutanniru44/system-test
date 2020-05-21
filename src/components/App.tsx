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
    createdAt: Date
    dueDate: Date
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
                createdAt: new Date(),
                dueDate: new Date(),
                priority: ""
            }
        }
    }

    _openAddModal = () => {
        this.setState({ hideModal: true })
    }

    onConfirm = (data: boolean) => {
        // this.taskList.unshift(data);
        console.log(this.taskList);
        // localStorage.setItem("listData", JSON.stringify(this.taskList));
        this.setState({ hideModal: false, data: this.taskList })
    }

    _onClose = () => {
        alert('close called');
        this.setState({ hideModal: false })
    }

    openCity(event: React.MouseEvent<HTMLButtonElement>, key: string) {
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



    getClasss = (key: string): string | undefined => {
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
                {hideModal ? <AddModal onConfirm={this.onConfirm} onClose={this._onClose} isReadOnly={isReadOnly} taskObj={taskObj} isDataAvailable={false} /> : ""}
                <div className={styles.bottomRightAlign}>
                    <FontAwesomeIcon icon={faPlus} onClick={this._openAddModal} />
                </div>
                <div className="tab">
                    <button className={this.getClasss('All Tasks')} onClick={(event) => this.openCity(event, 'All Tasks')}>All Tasks</button>
                    <button className={this.getClasss('Completed')} onClick={(event) => this.openCity(event, 'Completed')}>Completed</button>
                    <button className={this.getClasss('Pending')} onClick={(event) => this.openCity(event, 'Pending')}>Pending</button>
                </div>
                // <Table columns={dataColumns} rows={data} />
            </>
        )
    }
}


export default App;