// CustomTextField.js
import React from 'react';
import TextField from '@mui/material/TextField';

function CustomTextField({ value, label, type, onChange, required, error, helperText, ...rest }) {
  const handleInputChange = (event) => {
    if (type === 'numeric') {
      // Remove non-numeric characters from input value
      event.target.value = event.target.value.replace(/\D/g, '');
    }
    // Forward the event to the onChange handler
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <TextField
      label={label}
      value={value || ''}
      variant="outlined"
      fullWidth
      type={type}
      onChange={handleInputChange}
      required={required} // Pass the required prop to TextField
      error={error}
      helperText={helperText}
      {...rest}
    />
  );
}

export default CustomTextField;
