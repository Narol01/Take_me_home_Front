import React from "react"
import s from "./checkbox.module.css"

interface ICheckboxProps {
  label?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const Checkbox: React.FC<ICheckboxProps> = ({ label, checked, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <div className={s.disability_checkbox}>
        <div className={s.disability_label}>{label}</div>
      <label>
        <input type="checkbox" checked={checked} onChange={handleChange} />
      </label>
    </div>
  )
}

export default Checkbox
