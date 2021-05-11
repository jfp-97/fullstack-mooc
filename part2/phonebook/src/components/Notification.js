import React from 'react'

const Notification = ({ message, succeeded }) => {
  return message
    ? <div className={`notification ${succeeded ? "success" : "error"}`}>{message}</div>
    : null
}

export default Notification
