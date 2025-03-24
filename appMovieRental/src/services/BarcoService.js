import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + 'barco';

class BarcoService {
  // Listar barcos
  getBarcos() {
    return axios.get(BASE_URL);
  }

  // Obtener barco por ID
  getBarcoById(barcoId) {
    return axios.get(`${BASE_URL}/${barcoId}`);
  }

  // Crear un nuevo barco
  createBarco(barco) {
    return axios.post(BASE_URL, JSON.stringify(barco));
  }
  updateBarco(barco) {
    return axios.put(BASE_URL, JSON.stringify(barco), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  
  
  // Eliminar un barco
  deleteBarco(barcoId) {
    return axios.delete(`${BASE_URL}/${barcoId}`);
  }
}

export default new BarcoService();
