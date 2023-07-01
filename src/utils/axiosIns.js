import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;




const axiosIns = axios.create({
    baseURL: API_BASE_URL,
  });


  export default axiosIns; 