import { useState } from 'react';
import Home from './components/Home';
import OrderForm from './components/OrderForm';
import OrderConfirmation from './components/OrderConfirmation';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [orderResponse, setOrderResponse] = useState(null);

  const handleOrderSuccess = (response) => {
    setOrderResponse(response);
    setPage('success');
  };

  if (page === 'home') {
    return <Home onStartOrder={() => setPage('form')} />;
  }

  return (
    <>
      {page === 'form' ? (
        <OrderForm onOrderSuccess={handleOrderSuccess} onGoHome={() => setPage('home')} />
      ) : (
        <OrderConfirmation
          orderResponse={orderResponse}
          onCreateNewOrder={() => setPage('form')}
          onGoHome={() => setPage('home')}
        />
      )}
    </>
  );
}

export default App;
