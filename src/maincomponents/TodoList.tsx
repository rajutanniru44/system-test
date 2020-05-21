import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import { formatDate } from '../common/commonFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const TodoList = ({ todos, toggleTodo }: any) => {
    return (
        <div>
            {todos.map((todo: any, index: number) => {
                return (
                    <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />

                )
            })}
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

export default TodoList