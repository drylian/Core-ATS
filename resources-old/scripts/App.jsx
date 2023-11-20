import React from 'react';
import GlobalRouter from "./routes/Global.jsx"
import { StoreProvider } from 'easy-peasy';
import { store } from '../states/index';
import Loading from './components/elements/Loading';
import ErrorBoundary from "./pages/errors/ErrorBoundary"
import Suspended from './pages/errors/Suspended';
interface ExtWindow extends Window {
  WebsiteConf?: WebsiteConf;
  
}
export default function App() {
  const { WebsiteConf } = window as ExtWindow;
    if (PterodactylUser && !store.getState().user.data) {
        store.getActions().user.setUserData({
            uuid: PterodactylUser.uuid,
            username: PterodactylUser.username,
            email: PterodactylUser.email,
            language: PterodactylUser.language,
            rootAdmin: PterodactylUser.root_admin,
            avatarURL: PterodactylUser.avatar_url,
            roleName: PterodactylUser.admin_role_name,
            useTotp: PterodactylUser.use_totp,
            createdAt: new Date(PterodactylUser.created_at),
            updatedAt: new Date(PterodactylUser.updated_at),
        });
    }

    if (!store.getState().settings.data) {
        store.getActions().settings.setSettings(SiteConfiguration!);
    }

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