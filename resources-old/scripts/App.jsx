import React, { useEffect } from 'react';
import RouterController from "./routes/RouterController.jsx"
import { AuthProvider } from './contexts/AuthContext.jsx';

// useEffect(() => {
//   /**
//    * Async Raiz, usado para todos os tipos de codigos
//    */
//   (async () => {

//   })()
// }, []);

export default function App() {
  return (
    <>
      {/* Configuração do auth */}
      <AuthProvider>
        {/* Roteador principal */}
        <RouterController />
      </AuthProvider>
    </>
  );
}