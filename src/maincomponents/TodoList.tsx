import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../common/commonFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import CommonConfirmation from '../common/components/CommonConfirmationModal';
import { deleteTodo, sortTodo, deleteMultiTodo } from '../actions/index';
import { connect, useStore } from 'react-redux'
import styles from '../index.scss';
import AddModal from '../common/components/AddModal';
import { EMPTY_STRING, NONE_VALUE, TABLE_HEADERS, CONFIRMATION_MESSAGES, DONE, REOPEN, CSS_CLASS_LIST, DATE_DELIMITERS } from '../common/components/constants';

interface HeaderData {
    label: string,
    value: string
}

interface ReduxTask {
    completed: boolean
    id: number,
    text: Task
}

interface Task {
    currentState: boolean,
    title: string,
    description: string
    createdAt: Date
    dueDate: Date
    priority: string,
    isChecked: boolean
}
const TodoList = ({ todos, toggleTodo, dispatch }: any) => {
    const store = useStore()

    const [hideAddModal, setAddmodal] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [isDataAvailable, setDataAvailable] = useState(false);
    const [taskObj, setTaskObj] = useState({
        currentState: false,
        title: EMPTY_STRING,
        description: EMPTY_STRING,
        createdAt: new Date(),
        dueDate: new Date(),
        priority: NONE_VALUE,
        isChecked: false
    });
    const [currentIndex, setCurrentIndex] = useState(0);


    const [hideConfirmationModal, setCount] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [cancelLabel, setCancelLabel] = useState('Yes');
    const [confirmLabel, setConfirmLabel] = useState('No');
    const [todo, setTodo] = useState(0);

    /**sorting data */
    const [isSorted, setSortedStatus] = useState(false);

    //group by
    const [renderGroup, setgroupby] = useState(false);
    const [groupData, setGroupData] = useState({});

    const tableHeaders = (<thead>
        <tr key="table-headers">
            <th>&nbsp;</th>
            {TABLE_HEADERS.map((column: HeaderData, index: number) => {
                return <th className={styles.cursorPointer} key={`${index}i`} onClick={(e) => _sortTodo(e, column.value)} > {column.label}</th>;
            })}
        </tr>
    </thead >);

    function _sortTodo(event: React.MouseEvent<HTMLTableHeaderCellElement>, columm: string) {
        event.stopPropagation();
        let sorted = !isSorted;
        setSortedStatus(sorted)
        dispatch(sortTodo(columm, sorted));
    }

    function _handleDisableMode(todo: Task, id: number) {
        setCurrentIndex(id);
        setTaskObj(todo);
        setAddmodal(true);
        setReadOnly(true);
        setDataAvailable(true);
    }

    function _handleEdit(event: React.MouseEvent<SVGSVGElement>, todo: Task, id: number) {
        event.stopPropagation();
        setCurrentIndex(id);
        setTaskObj(todo);
        setAddmodal(true);
        setReadOnly(false);
        setDataAvailable(true);
    }

    function _handleDelete(event: React.MouseEvent<SVGSVGElement>, todo: Task, id: number) {
        event.stopPropagation();
        setTodo(id);
        setTitle(todo.title);
        setMessage(CONFIRMATION_MESSAGES.DELETE_CONFIRMATION);
        setConfirmLabel('Yes');
        setCancelLabel('No');
        setCount(true);
    }

    function _handleConfirmationModal() {
        dispatch(deleteTodo(todo));
        setTitle(EMPTY_STRING);
        setMessage(EMPTY_STRING);
        setConfirmLabel(EMPTY_STRING);
        setCancelLabel(EMPTY_STRING);
        setCount(false)
    }

    function _handleCloseModal() {
        setCount(false)
    }

    function onConfirm(data: boolean) {
        setAddmodal(false);
    }

    function _onClose() {
        setAddmodal(false);
        setCurrentIndex(0);
        setTaskObj({
            currentState: false,
            title: EMPTY_STRING,
            description: EMPTY_STRING,
            createdAt: new Date(),
            dueDate: new Date(),
            priority: NONE_VALUE,
            isChecked: false
        });
        setAddmodal(false);
        setReadOnly(false);
        setDataAvailable(false);
    }

    function _handleCheckChange(event: React.MouseEvent<HTMLInputElement>, todo: Task, id: number) {
        event.stopPropagation();
        todo.isChecked = event.currentTarget.checked;
        setTaskObj(todo)
    }

    function _deleteAll(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        let arr = todos.filter((obj: ReduxTask) => {
            return obj.text.isChecked == true
        });
        dispatch(deleteMultiTodo(arr));
    }



    function groupBy(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        const cats = todos.reduce((catsSoFar: any,
            { text }: ReduxTask) => {
            if (!catsSoFar[text.priority]) catsSoFar[text.priority] = [];
            catsSoFar[text.priority].push(text);
            return catsSoFar;
        }, {});
        console.log(cats);
        setGroupData(cats)
        setgroupby(true);
    }

    return (
        <div>
            {hideAddModal ?
                <AddModal
                    store={store}
                    onConfirm={onConfirm}
                    onClose={_onClose}
                    isReadOnly={isReadOnly}
                    taskObj={taskObj}
                    isDataAvailable={isDataAvailable}
                    index={currentIndex}
                /> : EMPTY_STRING}


            {hideConfirmationModal ?
                <CommonConfirmation
                    onConfirm={_handleConfirmationModal}
                    onClose={_handleCloseModal}
                    title={title}
                    message={message}
                    confirmLabel={confirmLabel}
                    cancelLabel={cancelLabel}
                /> : EMPTY_STRING}
            <div className={styles.textAlignRight}>
                <button type="submit" className="btn btn-danger btnAlign" onClick={(e) => groupBy(e)}>Group By</button>
            </div>
            <div className={styles.textAlignRight}>
                <button type="submit" className="btn btn-danger btnAlign" onClick={(e) => _deleteAll(e)}>All delete</button>
            </div>
            {/* group by rendering option starts here */}
            {renderGroup ? <div>
                {

                    // Object.keys(groupData).map((key) => (
                    //     <p>{[`${key}`]}</p>
                    // ))

                    Object.entries(groupData).map(([key, value]) => {
                        return (
                            <div>{key} : {JSON.stringify(value)}</div>
                        );
                    })

                }
            </div> : EMPTY_STRING
            }
            {/* group by rendering option ends here */}

            <table className="table table-bordered table-hover" key="tablee">
                {tableHeaders}
                <tbody key="todo-body">
                    {todos.map((todo: ReduxTask, index: number) => {
                        return (
                            <tr key={`${index}tr`} onClick={() => _handleDisableMode(todo.text, todo.id)}>
                                <td>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" onClick={(e) => _handleCheckChange(e, todo.text, todo.id)} />
                                    </div>
                                </td>
                                <td key={`${index}title`} className={todo.text.currentState ? CSS_CLASS_LIST.BG_GREEN : EMPTY_STRING} style={{
                                    textDecoration: todo.completed ? CSS_CLASS_LIST.LINE_THOROUGH : CSS_CLASS_LIST.NONE
                                }}>{todo.text.title}</td>
                                <td key={`${index}priority`} className={todo.text.currentState ? CSS_CLASS_LIST.BG_GREEN : EMPTY_STRING} style={{
                                    textDecoration: todo.completed ? CSS_CLASS_LIST.LINE_THOROUGH : CSS_CLASS_LIST.NONE
                                }}>{todo.text.priority}</td>
                                <td key={`${index}createdAt`} className={todo.text.currentState ? CSS_CLASS_LIST.BG_GREEN : EMPTY_STRING} style={{
                                    textDecoration: todo.completed ? CSS_CLASS_LIST.LINE_THOROUGH : CSS_CLASS_LIST.NONE
                                }}>{formatDate(todo.text.createdAt, DATE_DELIMITERS.HYPEN)}</td>
                                <td key={`${index}dueDate`} className={todo.text.currentState ? CSS_CLASS_LIST.BG_GREEN : EMPTY_STRING} style={{
                                    textDecoration: todo.completed ? CSS_CLASS_LIST.LINE_THOROUGH : CSS_CLASS_LIST.NONE
                                }}>{formatDate(todo.text.dueDate, DATE_DELIMITERS.HYPEN)}</td>
                                <td>
                                    <FontAwesomeIcon icon={faPencilAlt} onClick={(e) => _handleEdit(e, todo.text, todo.id)} />
                                    <FontAwesomeIcon icon={faTrashAlt} onClick={(e) => _handleDelete(e, todo.text, todo.id)} />
                                    <button type="button" className="btn btn-primary btnAlign" onClick={(e) => toggleTodo(e, todo.id)}>{!todo.completed ? DONE : REOPEN}</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.object.isRequired
        }).isRequired
    ).isRequired,
    toggleTodo: PropTypes.func.isRequired
}

export default connect()(TodoList)