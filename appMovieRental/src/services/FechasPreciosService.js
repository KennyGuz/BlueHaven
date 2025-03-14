import axios from "axios";

const BASE_URL = "http://localhost:81/BlueHaven/FechasPrecios";

class FechasPreciosService {
  getBarcos() {
    return axios.get(BASE_URL);
  }

  getFechasPreciosById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }
}

export default new FechasPreciosService();
