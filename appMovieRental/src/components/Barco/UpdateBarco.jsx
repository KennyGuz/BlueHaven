import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  FormHelperText
} from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import BarcoService from '../../services/BarcoService';
import HabitacionService from '../../services/HabitacionService';
import { HabitacionesForm } from './Form/HabitacionesForm';
import AddIcon from '@mui/icons-material/Add';

const schema = yup.object({
  nombre: yup.string().required('El nombre es requerido'),
  descripcion: yup.string().required('La descripción es requerida'),
  capacidadHuespedes: yup
    .number()
    .typeError('Debe ser un número')
    .required('La capacidad es requerida')
    .positive('Debe ser positivo'),
  precio: yup
    .number()
    .typeError('Debe ser un número')
    .required('El precio es requerido')
    .positive('Debe ser positivo'),
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
    .test(
      'sin-repetidos',
      'No puede repetir habitaciones',
      (value) => {
        const ids = value.map((v) => v.habitacion_id);
        return ids.length === new Set(ids).size;
      }
    ),
});

export function UpdateBarco() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
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

  useEffect(() => {
  
    HabitacionService.getHabitaciones()
      .then((res) => {
        setHabitacionesDisponibles(res.data);
      })
      .catch((err) => {
        setError('Error al cargar habitaciones');
      });
  }, []);

  useEffect(() => {
    if (id) {
      BarcoService.getBarcoById(id)
        .then((res) => {
          const barco = res.data;
          console.log('⚓ Datos del barco:', barco);

          const habitaciones = barco.habitaciones?.map((h) => ({
            habitacion_id: h.id,
            cantidad: h.cantidad,
          })) || [];

          reset({
            nombre: barco.nombre ?? '',
            descripcion: barco.descripcion ?? '',
            capacidadHuespedes: barco.capacidadHuespedes ?? '',
            precio: barco.precio ?? '',
            habitaciones: habitaciones.length
              ? habitaciones
              : [{ habitacion_id: '', cantidad: '' }],
          });

          setLoaded(true);
        })
        .catch((err) => {
          console.error('Error al obtener barco:', err);
          setError('No se pudo cargar la información del barco');
        });
    }
  }, [id, reset]);

  const addHabitacion = () => append({ habitacion_id: '', cantidad: '' });
  const removeHabitacion = (index) => remove(index);

  const onSubmit = (data) => {
    const updatedBarco = { id: Number(id), ...data };
    BarcoService.updateBarco(updatedBarco)
      .then((res) => {
        toast.success(`Barco actualizado: ${res.data.nombre}`, {
          position: 'top-center',
        });
        navigate('/barco-table');
      })
      .catch((err) => {
        setError('Error al actualizar barco');
      });
  };

  if (error) return <p style={{ padding: '2rem' }}>❌ {error}</p>;
  if (!loaded || habitacionesDisponibles.length === 0)
    return <p style={{ padding: '2rem' }}>Cargando datos...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Actualizar Barco</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre del barco"
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
            name="capacidadHuespedes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Capacidad de huéspedes"
                type="number"
                fullWidth
                error={!!errors.capacidadHuespedes}
                helperText={errors.capacidadHuespedes?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name="precio"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Precio"
                type="number"
                fullWidth
                error={!!errors.precio}
                helperText={errors.precio?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Habitaciones</Typography>
        </Grid>

        {fields.map((field, index) => (
          <HabitacionesForm
            key={field.id}
            index={index}
            control={control}
            data={habitacionesDisponibles}
            onRemove={removeHabitacion}
            disableRemoveButton={fields.length === 1}
          />
        ))}

        <Grid item xs={12}>
          <Tooltip title="Agregar habitación">
            <IconButton onClick={addHabitacion} color="primary">
              <AddIcon />
            </IconButton>
          </Tooltip>
          {errors.habitaciones && (
            <FormHelperText error>
              {errors.habitaciones.message}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="secondary">
            Guardar Cambios
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
