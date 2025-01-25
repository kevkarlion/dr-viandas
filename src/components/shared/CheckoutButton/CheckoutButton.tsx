'use client'
import { useState } from 'react';
import axios from 'axios';

export function CheckoutButton({items}) {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');  // Estado para almacenar la URL

  console.log('carrito desde componente', items);
  const handlePayment = async () => {
    setLoading(true);

    const preference = {
      body: {
        items: items.map((item)=>({
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price
        }))
      }
    }

    console.log('data desde el front antes de enviar', preference)

    try {
      /// Realizamos la petición POST al backend
      const response = await axios.post(
        'http://localhost:5000/api/payments/create-payment', preference, 
         { 
          headers: {
            'Content-Type': 'application/json',
          },
        }
        );
      console.log('datos desde servidor ',response.data?.initPoint);
      const  initPoint  = response.data?.initPoint.initPoint;

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
