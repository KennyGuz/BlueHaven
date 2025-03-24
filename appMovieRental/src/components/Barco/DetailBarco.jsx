import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BarcoService from '../../services/BarcoService';

export function DetailBarco() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    BarcoService.getBarcoById(id)
      .then((response) => {
        setData(response.data);
        setError('');
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setLoaded(false);
      });
  }, [id]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container component="main" sx={{ mt: 8, mb: 4 }}>
      {data && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {data.nombre}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {data.descripcion}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Capacidad de huéspedes:</strong> {data.capacidadHuespedes}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Precio:</strong> ${data.precio.toLocaleString()}
            </Typography>
          </Grid>

          {/* Lista de habitaciones */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
              Habitaciones o camarotes disponibles:
            </Typography>

            {data.habitaciones && data.habitaciones.length > 0 ? (
              <ul>
                {data.habitaciones.map((hab, index) => (
                  <li key={index}>
                    {hab.nombre} – {hab.cantidad} habitación(es)
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No hay habitaciones asociadas a este barco.
              </Typography>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
