import React from 'react';

const SelectForm = ({ id, name, value, options, className, onChange }) => {
  return (
    <select id={id} name={name} value={value} className={className} onChange={onChange}>
      <option value="">Select an option</option>
      {options && options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectForm;