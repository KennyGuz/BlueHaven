import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ReservaService from "../../services/ReservaService";

export function ListReservas() {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ReservaService.getReservas()
      .then((response) => {
        setReservas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar las reservas</p>;

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {reservas.map((reserva) => (
        <Grid item xs={12} sm={6} md={4} key={reserva.id}>
          <Card>
            <CardHeader title={reserva.NombreCrucero} subheader={`Fecha: ${reserva.FechaReserva}`} />
            <CardContent>
              <Typography variant="body2">Total Habitaciones: {reserva.TotalHabitaciones}</Typography>
              <Typography variant="body2">Total Complementos: ${reserva.TotalComplementos}</Typography>
              <Button component={Link} to={`/reservas/${reserva.id}`} variant="contained" color="primary">
  Ver Detalles
</Button>

            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
