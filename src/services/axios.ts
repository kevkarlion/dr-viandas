import axios from 'axios';

// Crea una instancia de Axios con configuraciones predeterminadas
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',  // La URL base de tu API (ajústala a tu servidor)
  headers: {
    'Content-Type': 'application/json', // Configura el tipo de contenido que tu API espera
  },
});

// Agregar un interceptor para manejar la autenticación (si es necesario)
axiosInstance.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar el token de autenticación en los headers
    const token = localStorage.getItem('token'); // O donde guardes tu token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
