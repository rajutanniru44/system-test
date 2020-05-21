let nextTodoId = 0
export const addTodo = (text: any) => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
})

export const setVisibilityFilter = (filter: any) => ({
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

export const editTodo = (text: any, id: number) => ({
    type: 'EDIT_TODO',
    id,
    text
})

export const deleteTodo = (id: number) => ({
    type: 'DELETE_TODO',
    id
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