// src/components/Habitacion/Form/FormHabitacion.jsx
import React from 'react';
import {
  TextField,
  Grid,
  Button,
  Typography,
  FormHelperText,
} from '@mui/material';
import { Controller, FormProvider } from 'react-hook-form';

export default function FormHabitacion({ formMethods, onSubmit, isUpdate }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">
              {isUpdate ? 'Actualizar Habitación' : 'Crear Habitación'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="nombre"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre"
                  fullWidth
                  error={!!errors.nombre}
                  helperText={errors.nombre?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="descripcion"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descripción"
                  fullWidth
                  error={!!errors.descripcion}
                  helperText={errors.descripcion?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="minHuespedes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mínimo de Huéspedes"
                  type="number"
                  fullWidth
                  error={!!errors.minHuespedes}
                  helperText={errors.minHuespedes?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="maxHuespedes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Máximo de Huéspedes"
                  type="number"
                  fullWidth
                  error={!!errors.maxHuespedes}
                  helperText={errors.maxHuespedes?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="tamano"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tamaño (m²)"
                  type="number"
                  fullWidth
                  error={!!errors.tamano}
                  helperText={errors.tamano?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {isUpdate ? 'Guardar Cambios' : 'Crear Habitación'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
