import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import HabitacionService from '../../services/HabitacionService';
import FormHabitacion from './Form/FormHabitacion';

const schema = yup.object({
  nombre: yup
    .string()
    .required('Nombre requerido')
    .test(
      'nombre-existe',
      'Ya existe una habitación con ese nombre',
      async (value) => {
        if (!value) return false;
        try {
          const res = await HabitacionService.getByNombre(value);
          return res.data == null; 
        } catch {
          return true; 
        }
      }
    ),
  descripcion: yup.string().required('Descripción requerida'),
  minHuespedes: yup.number().required().positive(),
  maxHuespedes: yup.number().required().positive().moreThan(
    yup.ref('minHuespedes'),
    'Debe ser mayor al mínimo'
  ),
  tamano: yup.number().required().positive(),
});

export default function CreateHabitacion() {
  const navigate = useNavigate();
  const formMethods = useForm({
    defaultValues: {
      nombre: '',
      descripcion: '',
      minHuespedes: '',
      maxHuespedes: '',
      tamano: '',
    },
    resolver: yupResolver(schema)
  });

  const { setError } = formMethods;

  const onSubmit = async (data) => {
    try {
      const res = await HabitacionService.createHabitacion(data);
      toast.success(`Habitación creada: ${res.data.nombre}`);
      navigate('/habitacion');
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.message?.toLowerCase().includes('nombre')
      ) {
       
        setError('nombre', {
          type: 'manual',
          message: 'El nombre ya está en uso',
        });
      } else {
        toast.error('Error al crear habitación');
      }
    }
  };
  

  return (
    <FormHabitacion
      formMethods={formMethods}
      onSubmit={onSubmit}
      isUpdate={false}
    />
  );
}
