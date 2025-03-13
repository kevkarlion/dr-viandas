import axios from "axios";
import Cookies from "js-cookie";

// Crea una instancia de Axios con configuraciones predeterminadas
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Ajusta la URL base de tu backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Habilita el envío de cookies en las solicitudes
});

// Interceptor para agregar el token desde las cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // 🔥 Obtiene el token desde las cookies
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // ✅ Envía el token en los headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
