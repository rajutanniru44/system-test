import React from 'react'
import Footer from './Footer'
import VisibleTodoList from '../container/VisibleTodoList'
import styles from '../index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AddModal from '../common/components/AddModal';
import { addTodo } from 'actions';
import { EMPTY_STRING } from '../common/components/constants';


interface Props {
    store: any
}

interface State {
    hideModal: boolean,
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
    textInput: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            hideModal: false,
            isReadOnly: false,
            taskObj: {
                currentState: false,
                title: EMPTY_STRING,
                description: EMPTY_STRING,
                createdAt: new Date(),
                dueDate: new Date(),
                priority: EMPTY_STRING
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

    componentDidMount() {
        window.addEventListener('keyup', this.handleKeyUp, false);
    }

    handleKeyUp = (e: KeyboardEvent) => {
        if (e.keyCode == 27) {
            this.setState({ hideModal: false })
        } else if (e.shiftKey && e.ctrlKey && e.keyCode == 70) {
            this.focusTextInput();
        }
    }

    focusTextInput = () => {
        if (this.textInput != null) {
            this.textInput.current!.focus();
        }
    }


    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeyUp, false);
    }

    _handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    }

    render() {
        const { hideModal, isReadOnly, taskObj } = this.state;

        return (
            <>
                <div className={styles.textAlignCenter}>
                    Global search <input type="text" ref={this.textInput} onChange={this._handleSearchChange} />
                </div>
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