import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'; // Import dayjs library for date formatting

function CustomDatePicker({ label, value, onChange, error, helperText, yearOnly }) {
  // Format the date value if it exists
  const formattedValue = value ? dayjs(value).format('YYYY-MM-DD') : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={formattedValue} // Use the formatted value
        onChange={onChange}
        views={yearOnly ? ['year'] : undefined}
        error={!!error}
        helperText={helperText}
        format="YYYY-MM-DD"
        slotProps={{ 
          textField: {
            helperText: error ? helperText : "",
            error: !!error,
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
