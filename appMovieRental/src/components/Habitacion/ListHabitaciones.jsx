import React, { useEffect, useState } from "react";
import { Info, Edit, Delete, Add } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import HabitacionService from "../../services/HabitacionService";

export function ListHabitaciones() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL + "/uploads";

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  const cargarHabitaciones = () => {
    HabitacionService.getHabitaciones()
      .then((response) => {
        console.log("Datos recibidos:", response.data);
        setData(response.data);
        setError(null);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoaded(false);
      });
  };

  const deleteHabitacion = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta habitación?")) {
      try {
        await HabitacionService.deleteHabitacion(id);
        setData((prevData) => prevData.filter((habitacion) => habitacion.id !== id)); 
      } catch (error) {
        console.error("Error al eliminar:", error);
        setError("No se pudo eliminar la habitación.");
      }
    }
  };
  
  
  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box sx={{ p: 3 }}>
      {/* 🔹 Botón para Crear Nueva Habitación */}
      <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button
          component={Link}
          to="/habitacion/crear"
          variant="contained"
          color="primary"
          startIcon={<Add />}
        >
          Crear Habitación
        </Button>
      </Box>

      {/* 🔹 Tarjetas de habitaciones */}
      <Grid container spacing={3}>
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
                <CardActions disableSpacing>
                  {/* 🔹 Botón de Detalle */}
                  <IconButton component={Link} to={`/habitacion/${item.id || item.ID}`} aria-label="Detalle">
                    <Info />
                  </IconButton>

                  {/* 🔹 Botón de Editar */}
                  <IconButton component={Link} to={`/habitacion/update/${item.id || item.ID}`} aria-label="Editar" color="primary">
                    <Edit />
                  </IconButton>

                  {/* 🔹 Botón de Eliminar */}
                  {/*<IconButton onClick={() => deleteHabitacion(item.id || item.ID)} aria-label="Eliminar" color="error">
                    <Delete />
                  </IconButton>*/}
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
