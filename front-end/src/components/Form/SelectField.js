import React, { useCallback } from 'react';
import Select from 'react-select';

export const SelectField = ({
    options,
    field,
    form,
    onChange,
    ...props
  }) => {
    const handleChange = useCallback((option) => {
        form.setFieldValue(field.name, option.value);
        onChange && onChange(option);
    })


    return (
    <Select
      options={options}
      name={field.name}
      value={options ? options.find(option => option.value === field.value) : ''}
      onChange={handleChange}
      onBlur={field.onBlur}
      {...props} 
    />
  )}