import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  Tooltip,
  IconButton,
} from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import BarcoService from '../../services/BarcoService';
import HabitacionService from '../../services/HabitacionService';
import { HabitacionesForm } from './Form/HabitacionesForm';
import AddIcon from '@mui/icons-material/Add';
import toast from 'react-hot-toast';

export function CreateBarco() {
  const navigate = useNavigate();


  const schema = yup.object({
    nombre: yup.string().required('El nombre es requerido'),
    descripcion: yup.string().required('La descripción es requerida'),
    capacidadHuespedes: yup
      .number()
      .typeError('Debe ser un número')
      .required('La capacidad es requerida')
      .positive('Debe ser un número positivo'),
    precio: yup
      .number()
      .typeError('Debe ser un número')
      .required('El precio es requerido')
      .positive('Debe ser un número positivo'),
    habitaciones: yup
      .array()
      .of(
        yup.object().shape({
          habitacion_id: yup.number().required('Seleccione una habitación'),
          cantidad: yup
            .number()
            .typeError('Debe ser un número')
            .required('Ingrese cantidad')
            .positive('Debe ser positivo'),
        })
      )
      .test('sin-repetidos', 'No puede repetir habitaciones', (value) => {
        const ids = value.map((v) => v.habitacion_id);
        return ids.length === new Set(ids).size;
      }),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: '',
      descripcion: '',
      capacidadHuespedes: '',
      precio: '',
      habitaciones: [{ habitacion_id: '', cantidad: '' }],
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'habitaciones',
  });

  const addHabitacion = () => {
    append({ habitacion_id: '', cantidad: '' });
  };

  const removeHabitacion = (index) => {
    remove(index);
  };

  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    HabitacionService.getHabitaciones()
      .then((res) => setHabitacionesDisponibles(res.data))
      .catch((err) => setError(err.message));
  }, []);

  const onSubmit = (dataForm) => {
    BarcoService.createBarco(dataForm)
      .then((res) => {
        if (res.data) {
          toast.success(`Barco creado: ${res.data.nombre}`, {
            position: 'top-center',
            duration: 3000,
          });
          navigate('/barco-table');
        }
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
  };

  const onError = (errors) => {
    console.log('Errores en formulario', errors);
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Crear Nuevo Barco</Typography>
        </Grid>

        {/* NOMBRE */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name="nombre"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre del barco"
                  error={Boolean(errors.nombre)}
                  helperText={errors.nombre?.message || ''}
                />
              )}
            />
          </FormControl>
        </Grid>

        {/* DESCRIPCIÓN */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name="descripcion"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descripción"
                  error={Boolean(errors.descripcion)}
                  helperText={errors.descripcion?.message || ''}
                />
              )}
            />
          </FormControl>
        </Grid>

        {/* CAPACIDAD */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Controller
              name="capacidadHuespedes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Capacidad de huéspedes"
                  type="number"
                  error={Boolean(errors.capacidadHuespedes)}
                  helperText={errors.capacidadHuespedes?.message || ''}
                />
              )}
            />
          </FormControl>
        </Grid>

        {/* PRECIO */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Controller
              name="precio"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Precio"
                  type="number"
                  error={Boolean(errors.precio)}
                  helperText={errors.precio?.message || ''}
                />
              )}
            />
          </FormControl>
        </Grid>

        {/* HABITACIONES */}
        <Grid item xs={12}>
          <Typography variant="h6">Habitaciones</Typography>
          {fields.map((field, index) => (
            <HabitacionesForm
              key={field.id}
              field={field}
              index={index}
              data={habitacionesDisponibles}
              onRemove={removeHabitacion}
              control={control}
              onChange={(e) =>
                setValue('habitaciones', [...fields], { shouldValidate: true })
              }
              disableRemoveButton={fields.length === 1}
            />
          ))}
          <Tooltip title="Agregar habitación">
            <IconButton onClick={addHabitacion} color="primary" sx={{ mt: 1 }}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          {errors.habitaciones && (
            <FormHelperText sx={{ color: '#d32f2f' }}>
              {errors.habitaciones.message}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="secondary">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
