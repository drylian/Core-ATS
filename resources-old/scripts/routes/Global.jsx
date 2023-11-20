import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "../components/elements/Layout.jsx";
import RequireAuth from '../components/elements/auth/RequireAuth.jsx';

// Paginas de Auth '../pages/auth';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';

// Paginas de Erros '../pages/errors';
import Missing from '../pages/errors/Missing.jsx';
import Loading from '../components/elements/Loading.jsx';

// Paginas Livres '../pages/root'
import Home from '../pages/root/Home.jsx';
import TermsOfService from '../pages/root/TermsOfService.jsx';
import Pedrinhodograu from '../pages/pedrinhodograu/Index.jsx';

// Paginas Protegidas "../pages/account"
import Account from '../pages/account';

// Controlador Administrativo
import AdminController from './Admin.jsx';

export default function GlobalRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={< Home />} />
          <Route exact path="/termsofservice" element={< TermsOfService />} />
          <Route exact path="/pedrinho" element={< Pedrinhodograu />} />

          <Route exact path="/auth/login/" element={<RequireAuth component={Login} />} />
          <Route exact path="/auth/register/" element={<RequireAuth component={Register} />} />
          <Route exact path="/account/" element={<RequireAuth Protected={1000} component={Account} />} />

           {/* <Route exact path="/client/*" element={<RequireAuth Protected={1} component={ClientController} />} /> */}
          <Route exact path="/admin*" element={<RequireAuth Protected={2000} component={AdminController} />} /> 
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
