/**
 * Rotas da Area Administrativa.
 */
import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from '../components/elements/auth/RequireAuth.jsx';
import Admin from '../pages/admin/Index.jsx';
import Account from '../pages/admin/account/Index.jsx';

const AdminController = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RequireAuth Protected={2000} component={Admin} />} />
        <Route path="/account" element={<RequireAuth Protected={4000} component={Account} />} />
        <Route path="/settings" element={<RequireAuth Protected={1} component={Admin} />} />
      </Routes>
    </>
  );
};

export default AdminController;

