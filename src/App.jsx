import React from 'react';
import { AppProvider } from './provider/AppProvider';
import AppRoutes from "./routes/AppRoutes"
import AuthRoutes from "./routes/AuthRoutes"


function App() {
  const token = true;
  
  
  return (
    <AppProvider>
      {token ? <AppRoutes /> : <AuthRoutes />}
    </AppProvider>
  );
}

export default App;
