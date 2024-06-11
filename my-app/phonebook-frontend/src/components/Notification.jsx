import React from 'react'
const Notification = ({ message }) => {
    const messageStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return <div></div>
    }

    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}

export default Notification
