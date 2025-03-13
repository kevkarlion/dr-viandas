import axios from 'axios';

export const handlePayment = async () => {
  const data = {
    items: [
      {
        title: 'Vianda saludable',
        description: 'Vianda completa con ensalada y postre',
        quantity: 1,
        unit_price: 700,
      },
    ]
  };

  try {
    const response = await axios.post('http://localhost:5000/api/payments/create-payment', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { initPoint } = response.data;

    // Redirige al cliente al enlace de Mercado Pago
    window.location.href = initPoint;
  } catch (error) {
    console.error('Error al crear el pago:', error);
  }
};
