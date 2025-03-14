import axios from "axios";

// Base URL para la API de habitaciones
const BASE_URL = "http://localhost:81/BlueHaven/habitaciones"; 


class HabitacionService {
  // Obtener todas las habitaciones
  getHabitaciones() {
    return axios.get(BASE_URL);
  }

  // Obtener una habitación por ID
  getHabitacionById(habitacionId) {
    return axios.get(`${BASE_URL}/${habitacionId}`);
  }

  // Crear una nueva habitación
  createHabitacion(habitacion) {
    return axios.post(BASE_URL, JSON.stringify(habitacion));
  }

  // Actualizar una habitación existente
  updateHabitacion(habitacion) {
    return axios({
      method: "put",
      url: BASE_URL,
      data: JSON.stringify(habitacion),
    });
  }
}

export default new HabitacionService();
