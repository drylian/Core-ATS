import React, { useEffect, useState } from 'react';
import GlobalRouter from "./routes/Global.jsx"
import { StoreProvider } from 'easy-peasy';
import { store } from '../states/index.js';
import Loading from './components/elements/Loading.jsx';
import application from './api/application/application.js';
import ErrorBoundary from "./pages/errors/ErrorBoundary.jsx"
import Suspended from './pages/errors/Suspended.jsx';
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, SetUser]= useState(null);
  /**
   * Carrega configurações padrões antes de iniciar de fato a aplicação
   */
  useEffect(() => {
    if (!store.getState().website.data || store.getState().user.data) {
      application()
        .then(response => {
          store.getActions().website.setWebsite(response.Website);
          if(response.User) {
            store.getActions().user.setUser(response.User)
            SetUser(response.User)};
          setIsLoading(false)
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setIsLoading(false)
    }
  }, []);


  if (isLoading) {
    return (
      <Loading />
    );
  }

  if(user && user.suspended === true) {
    return (
      <Suspended reason={user.suspendedReason} />
    );
  }

  return (
    <>
      {/**
      * Configuração de store do easy-peasy
      */}
      <StoreProvider store={store}>
        <ErrorBoundary>
          <GlobalRouter />
        </ErrorBoundary>
      </StoreProvider>

    </>
  );
}