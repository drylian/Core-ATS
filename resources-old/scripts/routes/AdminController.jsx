/**
 * Rotas da Area Administrativa.
 */
import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from '../components/auth/RequireAuth.jsx';
import Teste from '../pages/admin/teste.jsx';

const AdminController = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<RequireAuth Protected={1} component={Teste} />} />
        <Route path="users" element={<RequireAuth Protected={1} component={Teste} />} />
        <Route path="settings" element={<RequireAuth Protected={1} component={Teste} />} />
      </Routes>
    </>
  );
};

export default AdminController;

