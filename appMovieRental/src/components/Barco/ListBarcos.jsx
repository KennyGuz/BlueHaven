import React, { useEffect, useState } from 'react';
import BarcoService from '../../services/BarcoService';
import { ListCardBarcos } from './ListCardBarcos'; 

export function ListBarcos() {
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
        setError(error);
        setLoaded(false);
      });
  }, []);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <>{data && <ListCardBarcos data={data} />}</>;
}
