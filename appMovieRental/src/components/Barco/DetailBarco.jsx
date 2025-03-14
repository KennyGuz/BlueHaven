import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importar useNavigate
import { Container, Typography, Box, List, ListItem, ListItemText, Button } from "@mui/material";
import BarcoService from "../../services/BarcoService";

export function DetailBarco() {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook para la navegación
  const [barco, setBarco] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BarcoService.getBarcoById(id)
      .then((response) => {
        setBarco(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar el barco</p>;

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>{barco.Nombre}</Typography>
        <Typography variant="body1">Descripción: {barco.Descripcion}</Typography>
        <Typography variant="body1">Capacidad: {barco.CapacidadHuespedes} huéspedes</Typography>
        <Typography variant="body1">Total de Habitaciones: {barco.total_habitaciones}</Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>Habitaciones Disponibles:</Typography>
        <List>
          {barco.habitaciones && barco.habitaciones.map((habitacion) => (
            <ListItem key={habitacion.id}>
              <ListItemText primary={habitacion.Nombre} secondary={`Tamaño: ${habitacion.Tamano}`} />
            </ListItem>
          ))}
        </List>

        {/* Botón para volver al listado */}
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 3 }} 
          onClick={() => navigate("/barco")} // Volver al listado de barcos
        >
          Volver al Listado
        </Button>
      </Box>
    </Container>
  );
}
