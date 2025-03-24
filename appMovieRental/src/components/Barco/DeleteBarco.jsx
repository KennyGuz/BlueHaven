import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BarcoService from "../../services/BarcoService";

export function DeleteBarco({ barcoId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este barco?")) {
      await BarcoService.deleteBarco(barcoId);
      navigate("/barco");
    }
  };

  return (
    <Button variant="contained" color="error" onClick={handleDelete}>
      Eliminar Barco
    </Button>
  );
}
