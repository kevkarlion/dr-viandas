import axios, { AxiosError } from "axios";

// Configuración global para incluir cookies en las solicitudes
type RequestConfig = {
  withCredentials: true;
};

const config: RequestConfig = {
  withCredentials: true,
};

// Actualizar la cantidad de un artículo en el carrito
export const updateCartQuantity = async (userId: string, dishId: string, change: number) => {
  console.log('userId', userId, 'dishId', dishId, 'quantity', change);

  try {
    const response = await axios.patch(
      `http://localhost:5000/api/cart/update`,
      {
        userId,
        dishId,
        change,
      },
      config // Se envían las cookies con la petición
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error al actualizar el carrito:", error.response?.data);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
};

// Eliminar un artículo del carrito
export const removeCartItem = async (userId: string, dishId: string) => {
  console.log('datos desde el front', 'userId:', userId, 'dishId:', dishId);

  try {
    const response = await axios.delete(
      `http://localhost:5000/api/cart/remove`,
      {
        ...config, // Se envían las cookies con la petición
        params: {
          userId,
          dishId,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error al eliminar del carrito:", error.response?.data);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
};
