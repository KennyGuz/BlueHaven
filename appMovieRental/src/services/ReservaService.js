import axios from "axios";

const API_URL = "http://localhost:81/BlueHaven/reservas"; 

const ReservaService = {
  getReservas: () => axios.get(API_URL),
  getReserva: (id) => axios.get(`${API_URL}/${id}`), 
};

export default ReservaService;
