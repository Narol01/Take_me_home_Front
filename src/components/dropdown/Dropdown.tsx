import React from 'react';
import s from "./dropdown.module.css";

interface IDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
  label?: string;
  options: any[];
  customValueKey?: string;
}

export const Dropdown = (props: IDropdownProps) => {
  const { label, options, onChange, customValueKey, ...rest } = props;

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedValue = event.target.value;
    if (onChange) onChange(event); // Передаем полное событие
  };

  return (
    <div className={s.container}>
      <label>{label}</label>
      <select onChange={handleChange} {...rest}>
        <option value="">Any</option>
        {options.map((option, index) => (
          <option key={index} value={customValueKey ? option[customValueKey] : option.value}>
            {customValueKey ? option[customValueKey] : option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;