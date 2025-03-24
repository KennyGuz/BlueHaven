import React from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller } from 'react-hook-form';
import { SelectHabitacion } from './SelectHabitacion';

export function HabitacionesForm({
  index,
  control,
  data,
  onRemove,
  disableRemoveButton,
}) {
  return (
    <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
      <Grid item xs={6} sm={5}>
        <Controller
          name={`habitaciones.${index}.habitacion_id`}
          control={control}
          render={({ field, fieldState }) => (
            <SelectHabitacion
              field={field}
              data={data}
              error={fieldState.invalid}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
      </Grid>

      <Grid item xs={4} sm={5}>
        <Controller
          name={`habitaciones.${index}.cantidad`}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Cantidad"
              type="number"
              fullWidth
              error={fieldState.invalid}
              helperText={fieldState.error?.message || ''}
            />
          )}
        />
      </Grid>

      <Grid item xs={2} sm={2}>
        <IconButton
          onClick={() => onRemove(index)}
          disabled={disableRemoveButton}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
