import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

function CustomDropdown({ label, options, value, onChange, required, error, helperText }) {
    const [selected, setSelected] = useState(false);

    const handleChange = (event) => {
        onChange(event.target.value);
        setSelected(true); // Set selected to true when an item is selected
    };

    const handleBlur = () => {
        // Do not reset selected if there is an error
        if (!error) {
            setSelected(false); // Reset selected to false when the dropdown loses focus
        }
    };

    return (
        <FormControl fullWidth required={required} error={error && !selected}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                label={label}
            >
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {error && !selected && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}

export default CustomDropdown;
