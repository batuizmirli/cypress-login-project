import { useState } from 'react';
import Login from './components/Login';
import Success from './components/Success';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <Success /> : <Login onSuccess={() => setLoggedIn(true)} />;
}

export default App;
