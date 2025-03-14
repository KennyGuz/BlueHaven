import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import ReservaService from "../../services/ReservaService";


export function DetailReserva() {
  const { id } = useParams(); // Obtener el ID de la reserva desde la URL
  const [reserva, setReserva] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ReservaService.getReserva(id)
      .then((response) => {
        setReserva(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar la reserva:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando detalles de la reserva...</p>;
  if (error) return <p>Error al cargar la reserva</p>;

  return (
    <Grid container justifyContent="center" sx={{ p: 3 }}>
      <Card sx={{ maxWidth: 600, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {reserva.NombreCrucero}
          </Typography>
          <Typography variant="body1">
            <strong>Fecha:</strong> {reserva.FechaReserva}
          </Typography>
          <Typography variant="body1">
            <strong>Total Habitaciones:</strong> {reserva.TotalHabitaciones}
          </Typography>
          <Typography variant="body1">
            <strong>Total Complementos:</strong> ${reserva.TotalComplementos}
          </Typography>

          {/* 🔹 Sección de Habitaciones */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Habitaciones:
          </Typography>
          {reserva.habitaciones?.length ? (
            reserva.habitaciones.map((hab, index) => (
              <Typography key={index} variant="body2">
                {hab.Nombre} - {hab.CantidadHabitaciones} habs, {hab.CantidadHuespedes} huéspedes
              </Typography>
            ))
          ) : (
            <Typography variant="body2">No hay habitaciones asignadas.</Typography>
          )}

          {/* 🔹 Sección de Complementos */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Complementos:
          </Typography>
          {reserva.complementos?.length ? (
            reserva.complementos.map((comp, index) => (
              <Typography key={index} variant="body2">
                {comp.Nombre} - {comp.Cantidad} x ${comp.Precio} = ${comp.Total}
              </Typography>
            ))
          ) : (
            <Typography variant="body2">No hay complementos agregados.</Typography>
          )}

          <Button component={Link} to="/reservas" variant="contained" sx={{ mt: 2 }}>
            Volver a Reservas
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
