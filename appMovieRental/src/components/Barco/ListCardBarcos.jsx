import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export function ListCardBarcos({ data }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {data.map((barco) => (
        <Card key={barco.id} style={{ width: 300 }}>
          <CardContent>
            <Typography variant="h6">{barco.nombre}</Typography>
            <Typography variant="body2">{barco.descripcion}</Typography>
            <Typography variant="body2">Capacidad: {barco.capacidadHuespedes}</Typography>
            <Typography variant="body2">Precio: ${barco.precio}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
