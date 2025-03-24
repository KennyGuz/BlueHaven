import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import BarcoService from "../../services/BarcoService";

export default function TableBarcos() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    BarcoService.getBarcos()
      .then((response) => {
        setData(response.data);
        setError("");
        setLoaded(true);
      })
      .catch((error) => {
        setError(error.message || "Error desconocido");
        setLoaded(false);
      });
  }, []);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Button
          component={Link}
          to="/barco/crear/"
          variant="contained"
          color="primary"
        >
          Crear Nuevo Barco
        </Button>
      </Grid>

      {data.map((barco) => (
        <Grid item xs={12} sm={6} md={4} key={barco.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {barco.nombre}
              </Typography>
              <Typography variant="body2" mt={1}>
                Descripción: {barco.descripcion || "Sin descripción"}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                🧍 Capacidad: {barco.capacidadHuespedes} pasajeros
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                💲 Precio: ${barco.precio}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to={`/barco/${barco.id}`}
                variant="contained"
                color="primary"
              >
                Ver Detalles
              </Button>
              <Button
                component={Link}
                to={`/barco/update/${barco.id}`}
                variant="outlined"
                color="secondary"
              >
                Editar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
