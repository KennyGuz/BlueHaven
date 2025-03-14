import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import BarcoService from "../../services/BarcoService";

export function ListBarcos() {
  const [barcos, setBarcos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BarcoService.getBarcos()
      .then((response) => {
        console.log("🚢 Datos recibidos:", response.data); 
        setBarcos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error:", error);
        setError(error);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los barcos</p>;

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {barcos.map((barco) => (
        <Grid item xs={12} sm={6} md={4} key={barco.ID}>
          <Card>
            <CardHeader
              title={barco.Nombre}
              subheader={`Capacidad: ${barco.CapacidadHuespedes} huéspedes`}
            />
            <CardContent>
              <Typography variant="body2">
                Descripción: {barco.Descripcion}
              </Typography>
              <Typography variant="body2" color="primary">
                🔹 Total de Habitaciones: {barco.total_habitaciones}
              </Typography>
            </CardContent>
            {}
            <CardActions>
              <Button
                component={Link}
                to={`/barco/${barco.ID}`}
                variant="contained"
                color="primary"
              >
                Ver Detalles
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
