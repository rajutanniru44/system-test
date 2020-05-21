import React from 'react'
import FilterLink from '../container/FilterLink'
import { VisibilityFilters } from '../actions'
import styles from '.././index.scss';

const TabsHeader = () => (
    <div className={styles.textAlignCenter}>
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>All Tasks</FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Pending</FilterLink>
    </div >
)

export default TabsHeader