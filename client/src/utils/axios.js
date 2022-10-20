import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;
axios.defaults.headers = {
  "content-type": "application/json",
  accept: "application.json",
};
axios.defaults.withCredentials = true;

export default axios;
