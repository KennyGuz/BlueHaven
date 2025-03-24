import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export function SelectHabitacion({ field, data, error, onChange }) {
  return (
    <FormControl fullWidth error={error}>
      <InputLabel>Tipo de Habitación</InputLabel>
      <Select {...field} label="Tipo de Habitación" onChange={onChange}>
        {data?.map((item) => (
          <MenuItem key={item.ID} value={item.ID}>
            {item.Nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
