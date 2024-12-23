import axios from 'axios';



console.log(process.env.REACT_APP_API_URL)

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Esto debe apuntar a tu servidor remoto de Strapi
  headers: {
    'Content-Type': 'application/json',
  },
});




export default axiosInstance;
