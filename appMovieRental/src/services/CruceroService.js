import axios from "axios";

const BASE_URL = "http://localhost:81/BlueHaven/cruceros";

class CruceroService {
  getCruceros() {
    return axios.get(BASE_URL);
  }

  getCruceroById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }
}

export default new CruceroService();