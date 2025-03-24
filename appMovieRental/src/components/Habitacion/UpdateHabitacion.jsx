// UpdateHabitacion.jsx
import React, { useEffect, useState } from 'react';
import {
  Button, Grid, Typography, TextField, FormHelperText
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import HabitacionService from '../../services/HabitacionService';
import toast from 'react-hot-toast';

const schema = yup.object({
  nombre: yup.string().required('El nombre es obligatorio'),
  descripcion: yup.string().required('La descripción es obligatoria'),
  minHuespedes: yup.number().required('Mínimo requerido').positive().integer(),
  maxHuespedes: yup.number().required('Máximo requerido').moreThan(yup.ref('minHuespedes'), 'Debe ser mayor que el mínimo'),
  tamano: yup.number().required('Tamaño requerido').positive()
});


export default function UpdateHabitacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    HabitacionService.getHabitacionById(id)
      .then((res) => {
        const hab = res.data;
        reset({
          nombre: hab.Nombre,
          descripcion: hab.Descripcion,
          minHuespedes: hab.MinHuespedes,
          maxHuespedes: hab.MaxHuespedes,
          tamano: hab.Tamano
        });
        setLoaded(true);
      })
      .catch((err) => setError(err.message));
  }, [id, reset]);

  const onSubmit = (data) => {
    const payload = {
      id: Number(id),
      ...data
    };
    HabitacionService.updateHabitacion(payload)
      .then((res) => {
        toast.success(`Habitación actualizada: ${res.data.nombre}`);
        navigate('/habitacion');
      })
      .catch((err) => setError(err.message));
  };

  if (error) return <p>Error: {error}</p>;
  if (!loaded) return <p>Cargando datos...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}><Typography variant="h5">Actualizar Habitación</Typography></Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Nombre" fullWidth error={!!errors.nombre} helperText={errors.nombre?.message} />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="descripcion"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Descripción" fullWidth error={!!errors.descripcion} helperText={errors.descripcion?.message} />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name="minHuespedes"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Mín. Huéspedes" type="number" fullWidth error={!!errors.minHuespedes} helperText={errors.minHuespedes?.message} />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name="maxHuespedes"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Máx. Huéspedes" type="number" fullWidth error={!!errors.maxHuespedes} helperText={errors.maxHuespedes?.message} />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name="tamano"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Tamaño m2" type="number" fullWidth error={!!errors.tamano} helperText={errors.tamano?.message} />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Guardar Cambios</Button>
        </Grid>
      </Grid>
    </form>
  );
}
