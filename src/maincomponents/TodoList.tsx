import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import { formatDate } from '../common/commonFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import CommonConfirmation from '../common/components/CommonConfirmationModal';
import { deleteTodo, sortTodo } from '../actions/index';
import { connect, useStore } from 'react-redux'

import AddModal from '../common/components/AddModal';

interface Task {
    label: string,
    value: string
}
const TodoList = ({ todos, toggleTodo, dispatch }: any) => {
    const store = useStore()

    const [hideAddModal, setAddmodal] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [isDataAvailable, setDataAvailable] = useState(false);
    const [taskObj, setTaskObj] = useState({
        currentState: false,
        title: "",
        description: "",
        createdAt: new Date(),
        dueDate: new Date(),
        priority: "None"
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

    const columns = [
        {
            label: "Summary", value: "title"
        },
        { label: "Priority", value: "priority" },
        { label: "Created On", value: "createdAt" },
        { label: "Due Date", value: "dueDate" },
        { label: "Actions", value: "" }];
    const tableHeaders = (<thead>
        <tr key="tdd">
            {columns.map((column: Task, index: number) => {
                return <th key={`${index}i`} onClick={(e) => _sortTodo(e, column.value)} > {column.label}</th>;
            })}
        </tr>
    </thead >);

    function _sortTodo(event: React.MouseEvent<HTMLTableHeaderCellElement>, columm: string) {
        event.stopPropagation();
        let sorted = !isSorted;
        setSortedStatus(sorted)
        dispatch(sortTodo(columm, sorted));
    }

    function _handleDisableMode(todo: any, id: number) {
        setCurrentIndex(id);
        setTaskObj(todo);
        setAddmodal(true);
        setReadOnly(true);
        setDataAvailable(true);
    }

    function _handleEdit(event: React.MouseEvent<SVGSVGElement>, todo: any, id: number) {
        event.stopPropagation();
        setCurrentIndex(id);
        setTaskObj(todo);
        setAddmodal(true);
        setReadOnly(false);
        setDataAvailable(true);
    }

    function _handleDelete(event: React.MouseEvent<SVGSVGElement>, todo: any, id: number) {
        event.stopPropagation();
        setTodo(id);
        setTitle(todo.title);
        setMessage("Do you want to delete this task?");
        setConfirmLabel('Yes');
        setCancelLabel('No');
        setCount(true);
    }

    function _handleConfirmationModal() {
        dispatch(deleteTodo(todo));
        setTitle('');
        setMessage('');
        setConfirmLabel('');
        setCancelLabel('');
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
            title: "",
            description: "",
            createdAt: new Date(),
            dueDate: new Date(),
            priority: "None"
        });
        setAddmodal(false);
        setReadOnly(false);
        setDataAvailable(false);
    }

    return (
        <div>
            {
                hideAddModal ? <AddModal
                    store={store}
                    onConfirm={onConfirm}
                    onClose={_onClose}
                    isReadOnly={isReadOnly}
                    taskObj={taskObj}
                    isDataAvailable={isDataAvailable}
                    index={currentIndex}
                /> : ""
            }


            {hideConfirmationModal ? <CommonConfirmation
                onConfirm={_handleConfirmationModal}
                onClose={_handleCloseModal}
                title={title}
                message={message}
                confirmLabel={confirmLabel}
                cancelLabel={cancelLabel} /> : ""}


            <table className="table table-bordered table-hover" key="tablee">
                {tableHeaders}
                <tbody key="todo-body">
                    {todos.map((todo: any, index: number) => {
                        return (
                            <tr key={`${index}tr`} onClick={() => _handleDisableMode(todo.text, todo.id)}>
                                <td key={`${index}title`} className={todo.text.currentState ? "bg-green" : ""} style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none'
                                }}>{todo.text.title}</td>
                                <td key={`${index}priority`} className={todo.text.currentState ? "bg-green" : ""} style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none'
                                }}>{todo.text.priority}</td>
                                <td key={`${index}createdAt`} className={todo.text.currentState ? "bg-green" : ""} style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none'
                                }}>{formatDate(todo.text.createdAt, '-')}</td>
                                <td key={`${index}dueDate`} className={todo.text.currentState ? "bg-green" : ""} style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none'
                                }}>{formatDate(todo.text.dueDate, '-')}</td>
                                <td>
                                    <FontAwesomeIcon icon={faPencilAlt} onClick={(e) => _handleEdit(e, todo.text, todo.id)} />
                                    <FontAwesomeIcon icon={faTrashAlt} onClick={(e) => _handleDelete(e, todo.text, todo.id)} />
                                    <button type="button" className="btn btn-primary btnAlign" onClick={(e) => toggleTodo(e, todo.id)}>{!todo.completed ? 'Done' : 'Re-open'}</button>
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