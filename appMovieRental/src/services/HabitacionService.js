import axios from "axios";

// Base URL para la API de habitaciones
const BASE_URL = import.meta.env.VITE_BASE_URL + 'habitacion';

class HabitacionService {
  // Obtener todas las habitaciones


getHabitaciones() {
  return axios.get(BASE_URL);
}

getHabitacionById(id) {
  return axios.get(`${BASE_URL}/${id}`);
}

createHabitacion(data) {
  return axios.post(BASE_URL, JSON.stringify(data));
}

updateHabitacion(data) {
  return axios.put(BASE_URL, JSON.stringify(data));
}

deleteHabitacion(id) {
  return axios.delete(`${BASE_URL}/${id}`);
}

getByNombre(nombre) {
  return axios.get(`${BASE_URL}/nombre/${nombre}`);
}

}

export default new HabitacionService();
