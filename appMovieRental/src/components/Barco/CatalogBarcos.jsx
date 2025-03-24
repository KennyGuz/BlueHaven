import React, { useEffect, useState } from 'react';
import BarcoService from '../../services/BarcoService';
import { ListCardBarcos } from './ListCardBarcos';

export function CatalogBarcos() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    BarcoService.getBarcos()
      .then((response) => {
        console.log(response);
        setData(response.data);
        setError('');
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message || 'Error desconocido');
        setLoaded(false);
      });
  }, []);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return <>{data && <ListCardBarcos data={data} />}</>;
}
