import axios, { AxiosError } from "axios";

// Actualizar la cantidad de un artículo en el carrito
export const updateCartQuantity = async (userId: string, dishId: string, change: number) => {
  console.log('userId', userId, 'dishId', dishId, 'quantity', change);

  const token = localStorage.getItem('token'); // Obtén el token del localStorage

  if (!token) {
    console.error('No se encontró el token en el localStorage.');
    throw new Error('Usuario no autenticado.');
  }

  try {
    const response = await axios.patch(
      `http://localhost:5000/api/cart/update`,
      {
        userId,
        dishId,
        change,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Envía el token en el encabezado
        },
      }
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
  const token = localStorage.getItem('token'); // Obtén el token del localStorage

  console.log('datos desde el front','userId:',userId,'dishId:',dishId);

  if (!token) {
    console.error('No se encontró el token en el localStorage.');
    throw new Error('Usuario no autenticado.');
  }

  try {
    const response = await axios.delete(
      `http://localhost:5000/api/cart/remove`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Envía el token en el encabezado
        },
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
