import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { Link } from "react-router-dom";
import HabitacionService from "../../services/HabitacionService";

export function ListHabitaciones() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL + "/uploads";

  useEffect(() => {
    HabitacionService.getHabitaciones()
      .then((response) => {
        console.log("Datos recibidos:", response.data); 
        setData(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoaded(false);
      });
  }, []);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      {data &&
        data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id || item.ID}>
            <Card>
              <CardHeader
                sx={{
                  p: 0,
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.common.white,
                }}
                style={{ textAlign: "center" }}
                title={item.Nombre}
                subheader={`Capacidad: ${item.MinHuespedes} - ${item.MaxHuespedes} huéspedes`}
              />
              {item.imagen && (
                <CardMedia
                  component="img"
                  image={`${BASE_URL}/${item.imagen}`}
                  alt={item.Nombre}
                />
              )}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Tamaño: {item.Tamano}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Descripción: {item.Descripcion}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  backgroundColor: (theme) => theme.palette.action.focus,
                  color: (theme) => theme.palette.common.white,
                }}
              >
                <IconButton
                  component={Link}
                  to={`/habitacion/${item.id || item.ID}`} 
                  aria-label="Detalle"
                  sx={{ ml: "auto" }}
                  onClick={() => console.log("Navegando a:", `/habitacion/${item.id || item.ID}`)}
                >
                  <Info />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
