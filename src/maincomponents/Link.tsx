import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ active, children, onClick }: any) => (
    <button
        onClick={onClick}
        disabled={active}
        style={{
            marginLeft: '4px',
            backgroundColor: active ? "green" : "white",
            color: active ? "white" : "green",
            border: '1px solid  green'
        }}
    >
        {children}
    </button>
)

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link