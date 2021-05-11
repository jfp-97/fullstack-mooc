import React from 'react'

const Input = ({ text, placeholder, value, onChange }) => {
  return (
    <div>
      {text}
      <input placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}

export default Input
