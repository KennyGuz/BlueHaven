import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
  Button,
  Grid,
  ListItemText,
} from "@mui/material";
import CruceroService from "../../services/CruceroService";
import ItinerarioService from "../../services/ItinerarioService";
import FechasPreciosService from "../../services/FechasPreciosService";
import Box from "@mui/material/Box";

export function DetailCrucero() {
  const { id } = useParams();
  const [crucero, setCrucero] = useState(null);
  const [itinerario, setItinerario] = useState(null);
  const [fechasPrecios, setFechasPrecios] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

  useEffect(() => {
    CruceroService.getCruceroById(id)
      .then((response) => {
        console.log("Respuesta del API:", response.data);
        const cruceroData = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        setCrucero(cruceroData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el crucero:", error);
        setError(error);
        setLoading(false);
      });

    ItinerarioService.getItinerarioById(id)
      .then((response) => {
        console.log("Respuesta del API:", response.data);
        const ItinerarioData = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        setItinerario(ItinerarioData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el itinerario:", error);
        setError(error);
        setLoading(false);
      });

    FechasPreciosService.getFechasPreciosById(id)
      .then((response) => {
        console.log("Respuesta del API:", response.data); // Verifica los datos de la respuesta
        const fechasPreciosData = Array.isArray(response.data) ? response.data : [];
        console.log("Datos procesados para fechasPrecios:", fechasPreciosData); // Verifica los datos procesados
        setFechasPrecios(fechasPreciosData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar las fechas y precios:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando detalles de la reserva...</p>;
  if (error) return <p>Error al cargar la reserva</p>;
  if (!crucero) return <p>No se encontró el crucero</p>;
  if (!itinerario) return <p>No se encontró el itinerario</p>;
  if (!fechasPrecios) return <p>No se encontró el fechasPrecios</p>;

  return (
    <Grid container justifyContent="center" sx={{ p: 3 }}>
      {crucero ? (
        <Card sx={{ maxWidth: 600, p: 2 }}>
          <Box
            component="img"
            sx={{
              borderRadius: "4%",
              maxWidth: "100%",
              height: "auto",
            }}
            alt="Crucero"
            src={`${BASE_URL}/${crucero.Foto}`}
          />
          <Grid size={5}></Grid>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {crucero?.Nombre || "Nombre no disponible"}
            </Typography>

            <Typography variant="body1">
              <strong>Días:</strong> {crucero?.Dias || "No disponible"}
            </Typography>

            <Typography variant="body1">
              <strong>Barco:</strong> {crucero?.NombreBarco || "No disponible"}
            </Typography>

            <Typography variant="body1">
              <strong>Descripcion:</strong>{" "}
              {itinerario?.Descripcion || "No disponible"}
            </Typography>

            <Typography variant="body1">
              <List>
                <strong>Puertos: </strong>
                {itinerario.puertos &&
                  itinerario.puertos.map((puerto) => (
                    <ListItem key={puerto.IDPuerto}>
                      -<ListItemText primary={puerto.NombrePuerto} />
                    </ListItem>
                  ))}
              </List>
            </Typography>

            <Typography>
              <List>
                <strong>Fechas y Precios de Habitaciones</strong>

                {/* Verificar si fechasPrecios es un array antes de hacer el mapeo */}
                <strong>Fechas de inicio</strong>
                {Array.isArray(fechasPrecios) && fechasPrecios.length > 0 ? (
                  fechasPrecios.map((fechas) => (
                    <ListItem key={fechas.ID}>
                      -<ListItemText primary={`Fecha de inicio: ${new Date(fechas.FechaInicio).toLocaleDateString()}`} />
                      <ListItemText primary= {`Fecha de llegada: ${new Date(fechas.FechaLlegada).toLocaleDateString()}`}/>
                    </ListItem>
                  ))
                ) : (
                  <p>No se encontraron fechas disponibles</p>
                )}

                {/* Precios de habitaciones */}
                <strong>Precios de Habitaciones</strong>
                {Array.isArray(fechasPrecios) && fechasPrecios.length > 0 ? (
                  fechasPrecios.map((fechas) => (
                    <ListItem key={fechas.ID}>
                      -<ListItemText
                        primary={`Habitacion: ${fechas.NombreHabitacion}`}
                      />
                      <ListItemText
                        primary={`Precio por persona: $${fechas.PrecioPorPersona}`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <p>No se encontraron precios de habitaciones disponibles</p>
                )}
              </List>
            </Typography>


            <Button
              component={Link}
              to="/crucero"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Volver a Reservas
            </Button>
          </CardContent>
        </Card>
      ) : (
        <p>Cargando detalles...</p>
      )}
    </Grid>
  );
}
