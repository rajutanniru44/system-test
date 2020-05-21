import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../common/commonFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import AddModal from "../common/components/AddModal";
import CommonConfirmation from "../common/components/CommonConfirmationModal";

const Todo = ({ onClick, completed, text }: any) => {
    const columns = ["Summary", "Priority", "Created On", "Due Date", "Actions"];
    const tableHeaders = (<thead>
        <tr key="tdd">
            {columns.map((column: string, index: number) => {
                return <th key={`${index}i`}>{column}</th>;
            })}
        </tr>
    </thead>);

    function _handleDisableMode(todo: any) {

    }

    function _handleEdit(e: React.MouseEvent<SVGSVGElement>, todo: any) {

    }

    function _handleDelete(e: React.MouseEvent<SVGSVGElement>, todo: any) {
    }

    function _handleMark(e: React.MouseEvent<HTMLButtonElement>, todo: any) {

    }

    function _handleConfirmationModal() {

    }

    function _handleCloseModal() {

    }

    return (
        <table className="table table-bordered table-hover" key="tablee">
            {tableHeaders}
            <tbody>
                <tr key={text} onClick={() => _handleDisableMode(text)}>
                    <td key={text.title} className={text.currentState ? "bg-green" : ""} style={{
                        textDecoration: completed ? 'line-through' : 'none'
                    }}>{text.title}</td>
                    <td key={text.priority} className={text.currentState ? "bg-green" : ""} style={{
                        textDecoration: completed ? 'line-through' : 'none'
                    }}>{text.priority}</td>
                    <td key={text.createdAt} className={text.currentState ? "bg-green" : ""} style={{
                        textDecoration: completed ? 'line-through' : 'none'
                    }}>{formatDate(text.createdAt, '-')}</td>
                    <td key={text.dueDate} className={text.currentState ? "bg-green" : ""} style={{
                        textDecoration: completed ? 'line-through' : 'none'
                    }}>{formatDate(text.dueDate, '-')}</td>
                    <td>
                        <FontAwesomeIcon icon={faPencilAlt} onClick={(e) => _handleEdit(e, text)} />
                        <FontAwesomeIcon icon={faTrashAlt} onClick={(e) => _handleDelete(e, text)} />
                        <button type="button" className="btn btn-primary btnAlign" onClick={onClick}>{!completed ? 'Done' : 'Re-open'}</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.object.isRequired
}

export default Todo