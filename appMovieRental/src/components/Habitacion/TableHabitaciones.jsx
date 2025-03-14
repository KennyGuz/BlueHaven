import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HabitacionService from "../../services/HabitacionService";

// Componente Tabla de Habitaciones
export default function TableHabitaciones() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Obtener lista de habitaciones desde el API
  useEffect(() => {
    HabitacionService.getHabitaciones()
      .then((response) => {
        setData(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setLoaded(false);
        console.log(error);
      });
  }, []);

  const update = (id) => {
    return navigate(`/habitacion/update/${id}`);
  };

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Listado de Habitaciones
        <Tooltip title="Crear">
          <IconButton component={Link} to="/habitacion/crear/" color="success">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Typography>

      {data.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de habitaciones">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Nombre
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Descripción
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Mín. Huéspedes
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Máx. Huéspedes
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Tamaño
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Acciones
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.Nombre}</TableCell>
                  <TableCell align="left">{row.Descripcion}</TableCell>
                  <TableCell align="left">{row.MinHuespedes}</TableCell>
                  <TableCell align="left">{row.MaxHuespedes}</TableCell>
                  <TableCell align="left">{row.Tamano}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Actualizar">
                      <IconButton onClick={() => update(row.id)} color="success">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
