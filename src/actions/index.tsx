let nextTodoId = 0

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
    priority: string
}

export const addTodo = (text: Task) => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
})

export const setVisibilityFilter = (filter: string) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

export const toggleTodo = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    return ({
        type: 'TOGGLE_TODO',
        id
    })
}

export const editTodo = (text: Task, id: number) => ({
    type: 'EDIT_TODO',
    id,
    text
})

export const deleteTodo = (id: number) => ({
    type: 'DELETE_TODO',
    id
})

export const deleteMultiTodo = (selectedTodos: Array<ReduxTask>) => ({
    type: 'MULTI_DELETE',
    selectedTodos
})

export const sortTodo = (key: string, isSorted: boolean) => ({
    type: 'SORT_TODO',
    key, isSorted
})

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}