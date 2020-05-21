import React from 'react'
import Footer from './Footer'
import AddTodo from '../container/AddTodo'
import VisibleTodoList from '../container/VisibleTodoList'
import styles from '../index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AddModal from '../common/components/AddModal';
import { addTodo } from 'actions';


interface Props {
    store: any
}

interface State {
    hideModal: boolean,
    // data: Array<Task>,
    // activeSection: string,
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

class App extends React.Component<Props, State> {
    state: State;
    taskList: Array<Task> = [];
    constructor(props: Props) {
        super(props);
        this.state = {
            hideModal: false,
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
        this.setState({
            hideModal: false
        })
    }

    _onClose = () => {
        this.setState({ hideModal: false })
    }

    render() {
        const { hideModal, isReadOnly, taskObj } = this.state;

        return (
            <>
                <Footer />
                <VisibleTodoList />

                {hideModal ? <AddModal store={this.props.store} onConfirm={this.onConfirm} onClose={this._onClose} isReadOnly={isReadOnly} taskObj={taskObj} isDataAvailable={false} index={0} /> : ""}
                <div className={styles.bottomRightAlign}>
                    <FontAwesomeIcon icon={faPlus} onClick={this._openAddModal} />
                </div>
            </>
        )
    }
}


export default App;