import { useState } from 'react';
import axios from 'axios';

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');  // Estado para almacenar la URL

  const handlePayment = async () => {
    setLoading(true);

    const items = [
      {
        title: 'Producto de prueba',
        quantity: 1,
        unit_price: 1000, // El precio de tu producto
      },
    ];

    const data = {
      items,
    };

    try {
      // Realizamos la petición POST al backend
      const response = await axios.post('http://localhost:5000/api/payments/create-payment', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('datos desde servidor ',response.data.initPoint.init_point);
      const  initPoint  = response.data.initPoint.init_point;

      if (initPoint) {
        // Establece la URL del pago en el estado para mostrarla
        setPaymentUrl(initPoint);
        console.log('URL del pago:', paymentUrl);
      } else {
        console.error('No se recibió la URL del pago');
      }
    } catch (error) {
      console.error('Error al crear el pago', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className='text-black' onClick={handlePayment} disabled={loading}>
        {loading ? 'Cargando...' : 'Pagar con Mercado Pago'}
      </button>

      {paymentUrl && (
        <div>
          <p>URL para el pago:</p>
          <input
            type="text"
            value={paymentUrl}
            readOnly
            className="border p-2 w-full mt-2"
          />
          <button
            onClick={() => navigator.clipboard.writeText(paymentUrl)}
            className="mt-2 p-2 bg-blue-500 text-white"
          >
            Copiar URL
          </button>
        </div>
      )}
    </div>
  );
}
