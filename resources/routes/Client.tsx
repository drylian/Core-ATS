/**
 * Rotas da Area do Client.
 */
import { Route, Routes } from "react-router-dom";
import Account from "../pages/client/Account";

import Layout from "../components/elements/Layout";
import Missing from "../pages/errors/Missing";


const ClientController = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='account' element={<Account />} />
                <Route path='*' element={<Missing />} />
            </Route>
        </Routes>
    );
};

export default ClientController;
