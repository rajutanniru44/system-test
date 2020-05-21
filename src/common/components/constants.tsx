const EMPTY_STRING = '';


const NONE_VALUE = 'None';
const DONE = 'Done';
const REOPEN = 'Re-open';

const CANNOT_BE_EMPTY_MESSAGE = 'Cannot be empty.';

const FORM_HAS_ERRORS_MESSAGE = 'Form has errors.';

const UNDEFINED = 'undefined';

const TABLE_HEADERS = [
    { label: "Summary", value: "title" },
    { label: "Priority", value: "priority" },
    { label: "Created On", value: "createdAt" },
    { label: "Due Date", value: "dueDate" },
    { label: "Actions", value: "" }
];

const CONFIRMATION_MESSAGES = {
    DELETE_CONFIRMATION: 'Do you want to delete this task?',
    ARE_YOU_SURE_TO_ADD_TASK: 'Are you sure to save this task?'
}

const CSS_CLASS_LIST = {
    LINE_THOROUGH: 'line-through',
    NONE: 'none',
    BG_GREEN: ' bg-green'
}

const DATE_DELIMITERS = {
    HYPEN: '-',
    SLASH: '/'
}

export {
    EMPTY_STRING,
    NONE_VALUE,
    DONE,
    REOPEN,
    CANNOT_BE_EMPTY_MESSAGE,
    UNDEFINED,
    TABLE_HEADERS,
    CONFIRMATION_MESSAGES,
    CSS_CLASS_LIST,
    DATE_DELIMITERS,
    FORM_HAS_ERRORS_MESSAGE
}