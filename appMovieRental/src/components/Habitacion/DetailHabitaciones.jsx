import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importar useNavigate
import {
  Container,
  Typography,
  Box,
  Grid,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Button,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import HabitacionService from "../../services/HabitacionService";

export function DetailHabitacion() {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook para navegación
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Llamar al API y obtener una habitación
    HabitacionService.getHabitacionById(id)
      .then((response) => {
        setData(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoaded(false);
      });
  }, [id]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }}>
      {data && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            {}
            {data.imagen && (
              <Box
                component="img"
                sx={{
                  borderRadius: "4%",
                  maxWidth: "100%",
                  height: "auto",
                }}
                alt="Imagen de la habitación"
                src={`${import.meta.env.VITE_BASE_URL}/uploads/${data.imagen}`}
              />
            )}
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" component="h1" gutterBottom>
              {data.Nombre}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {data.Descripcion}
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">Mínimo Huéspedes:</Box> {data.MinHuespedes}
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">Máximo Huéspedes:</Box> {data.MaxHuespedes}
            </Typography>
            <Typography component="span" variant="subtitle1" display="block">
              <Box fontWeight="bold" display="inline">Tamaño:</Box> {data.Tamano}
            </Typography>

            {}
            {data.caracteristicas && data.caracteristicas.length > 0 && (
              <Typography component="span" variant="subtitle1">
                <Box fontWeight="bold">Características:</Box>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {data.caracteristicas.map((item, index) => (
                    <ListItemButton key={index}>
                      <ListItemIcon>
                        <ArrowRightIcon />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  ))}
                </List>
              </Typography>
            )}

            {/* Botón para volver al listado */}
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => navigate("/habitacion")} 
            >
              Volver al Listado
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
