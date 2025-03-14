import axios from "axios";

const BASE_URL = "http://localhost:81/BlueHaven/Itinerario";

class ItinerarioService {
  getItinerario() {
    return axios.get(BASE_URL);
  }

  getItinerarioById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  getItinerarioByCrucero(id) {
    return axios.getItinerarioByCrucero(`${BASE_URL}/${id}`);
  }
}

export default new ItinerarioService();
