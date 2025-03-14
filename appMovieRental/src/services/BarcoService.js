import axios from "axios";

const BASE_URL = "http://localhost:81/BlueHaven/barcos";

class BarcoService {
  getBarcos() {
    return axios.get(BASE_URL);
  }

  getBarcoById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }
}

export default new BarcoService();
