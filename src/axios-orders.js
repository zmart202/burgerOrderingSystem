import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-ordering-system.firebaseio.com"
});

export default instance;
