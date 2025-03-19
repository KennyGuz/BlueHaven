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
import Box from "@mui/material/Box";

export function DetailCrucero() {
  const { id } = useParams();
  const [crucero, setCrucero] = useState(null);
  const [itinerario, setItinerario] = useState(null);
  const [fechasPrecios, setFechasPrecios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

  useEffect(() => {
    CruceroService.getCruceroById(id)
      .then((response) => {
        console.log("🔵 API Crucero:", response.data);
        setCrucero(Array.isArray(response.data) ? response.data[0] : response.data);
      })
      .catch((error) => {
        console.error("🔴 Error en Crucero:", error);
        setError(error);
      });

    ItinerarioService.getItinerarioById(id)
      .then((response) => {
        console.log("🔵 API Itinerario:", response.data);
        setItinerario(response.data);
        setFechasPrecios(response.data.fechas || []); // ✅ Guardamos las fechas desde Itinerario
      })
      .catch((error) => {
        console.error("🔴 Error en Itinerario:", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando detalles de la reserva...</p>;
  if (error) return <p>Error al cargar la reserva</p>;
  if (!crucero) return <p>No se encontró el crucero</p>;
  if (!itinerario) return <p>No se encontró el itinerario</p>;

  return (
    <Grid container justifyContent="center" sx={{ p: 3 }}>
      {crucero && (
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
              <strong>Descripción del Itinerario:</strong> {itinerario?.Descripcion || "No disponible"}
            </Typography>

            {/* Lista de puertos */}
            <div>
              <Typography variant="h6"><strong>Puertos:</strong></Typography>
              <List>
                {Array.isArray(itinerario?.puertos) && itinerario.puertos.length > 0 ? (
                  itinerario.puertos.map((puerto) => (
                    <ListItem key={puerto.IDPuerto}>
                      - <ListItemText primary={`${puerto.Nombre_Puerto} (${puerto.Pais_Puerto})`} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="⚠ No hay puertos disponibles en la API." />
                  </ListItem>
                )}
              </List>
            </div>

            {/* Fechas y habitaciones */}
            <div>
              <Typography variant="h6"><strong>Fechas y Habitaciones Disponibles</strong></Typography>
              <List>
                {Array.isArray(fechasPrecios) && fechasPrecios.length > 0 ? (
                  fechasPrecios.map((fecha) => {
                    console.log("Fecha recibida:", fecha);

                    const fechaInicio = fecha.Fecha_Salida
                      ? new Date(fecha.Fecha_Salida).toLocaleDateString("es-ES")
                      : "Fecha no disponible";

                    const fechaRegreso = fecha.Fecha_Regreso && fecha.Fecha_Regreso !== "0000-00-00"
                      ? new Date(fecha.Fecha_Regreso).toLocaleDateString("es-ES")
                      : "Fecha no disponible";

                    return (
                      <List key={`fecha-${fecha.IDFecha}`} sx={{ pl: 2 }}>
                        <ListItem>
                          <ListItemText primary={`📅 Fecha de inicio: ${fechaInicio}`} secondary={`Fecha de regreso: ${fechaRegreso}`} />
                        </ListItem>

                        {Array.isArray(fecha.habitaciones) && fecha.habitaciones.length > 0 ? (
                          <List sx={{ pl: 4 }}>
                            {fecha.habitaciones.map((habitacion) => (
                              <ListItem key={`habitacion-${habitacion.IDHabitacion}`} sx={{ pl: 2 }}>
                                🛏️ <ListItemText primary={`Habitación: ${habitacion.Habitacion || "No disponible"}`} />
                                💰 <ListItemText primary={`Precio: $${habitacion.Precio_Habitacion || "No disponible"}`} />
                              </ListItem>
                            ))}
                          </List>
                        ) : (
                          <ListItem sx={{ pl: 4 }}>
                            <ListItemText primary="⚠ No hay habitaciones disponibles para esta fecha." />
                          </ListItem>
                        )}
                      </List>
                    );
                  })
                ) : (
                  <Typography variant="body2">No se encontraron fechas disponibles</Typography>
                )}
              </List>
            </div>

            <Button component={Link} to="/crucero" variant="contained" sx={{ mt: 2 }}>
              Volver a Reservas
            </Button>
          </CardContent>
        </Card>
      )}
    </Grid>
  );
}
