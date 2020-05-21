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

const todos = (state: any = [], action: any) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [{
                id: action.id,
                text: action.text,
                completed: false
            },
            ...state
            ]
        case 'TOGGLE_TODO':
            return state.map((todo: ReduxTask) =>
                todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
            )
        case 'EDIT_TODO': {
            let objIndex = state.findIndex((obj: ReduxTask) => {
                return obj.id === action.id
            });
            state[objIndex].text = action.text;
            return state
        }
        case 'DELETE_TODO':
            return state.filter((todo: ReduxTask) => todo.id !== action.id);
        case 'SORT_TODO':
            return action.isSorted ? state.slice().sort((a: any, b: any) => {
                if (action.key) {
                    let nameA = a.text[action.key].toLowerCase(),
                        nameB = b.text[action.key].toLowerCase()
                    if (nameA < nameB)
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
                }
            })
                : state.slice().reverse()
        default:
            return state
    }
}

export default todos