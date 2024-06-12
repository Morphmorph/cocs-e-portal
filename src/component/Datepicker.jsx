import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerViews({ className }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className=''>
        <DatePicker label={'Month & Year'} views={['month', 'year']} />
      </div>
    </LocalizationProvider>
  );
}
