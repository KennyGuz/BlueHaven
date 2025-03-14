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
import CruceroService from "../../services/CruceroService";
import CardMedia from '@mui/material/CardMedia';

export function ListCruceros() {
  const [cruceros, setCruceros] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL + 'uploads';

  useEffect(() => {
    CruceroService.getCruceros()
      .then((response) => {
        console.log("🚢 Datos recibidos:", response.data); 
        setCruceros(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error:", error);
        setError(error);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los cruceros</p>;

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {cruceros.map((crucero) => (
        <Grid item xs={12} sm={6} md={4} key={crucero.ID}>
          <Card>
            <CardHeader
              title={crucero.Nombre}
            />
            <CardMedia
                component="img"
                image={`${BASE_URL}/${crucero.Foto}`}
                alt={crucero.title}
              />
            <CardContent>  
              <Typography variant="body2">
                Dias: {crucero.Dias}
              </Typography>
              <Typography variant="body2" color="primary">
                🔹 Barco: {crucero.NombreBarco}
              </Typography>
            </CardContent>
            {}
            <CardActions>
              <Button
                component={Link}
                to={`/cruceros/${crucero.ID}`}
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