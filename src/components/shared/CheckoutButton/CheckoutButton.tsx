'use client'
import { useState, useContext  } from 'react';
import axios from 'axios';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { AuthContext } from "@/Context/auth-context"


initMercadoPago('APP_USR-ccde7f56-87cf-4c81-aa68-716231206997');


export function CheckoutButton({ items }) {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');  // Estado para almacenar la URL
  const [preferenceID, setPreferenceID] = useState('');

  const authContext = useContext(AuthContext);
    if (!authContext) {
      throw new Error("AuthContext must be used within an AuthProvider");
    }
    const { user } = authContext;


  
  const preference = {
    body: {      
      items: items.map(( item )=>({
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price
      })),
      metadata: { userId: user?.id },
    }
  }

  
  console.log('carrito desde componente', items);
  const handlePayment = async () => {
    setLoading(true);
    

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
      console.log('datos desde servidor ',response.data.data.data.init_point);
      
      const initPoint = response.data.data.data.init_point;
      console.log('id de la preferencia', response.data.data.data.id);
      const preferenceID = response.data.data.data.id;
      setPreferenceID(preferenceID);
    

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
      <button className='text-black mt-2' onClick={handlePayment} disabled={loading}>
        {loading ? 'Cargando...' : 'Confirmar compra'}
      </button>

      {paymentUrl && (
        <div>
          <Wallet initialization={{ preferenceId: preferenceID }} customization={{ texts:{ action: 'pay' ,valueProp: 'security_safety'}}} />
        </div>
      )}
    </div>
  );
}
