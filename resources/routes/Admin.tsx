/**
 * Rotas da Area Administrativa.
 */
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/elements/auth/RequireAuth";
import Home from "../pages/admin/Home";
import Accounts from "../pages/admin/Accounts";

import Layout from "../components/admin/Layout";
import AdminMissing from "../pages/errors/admin/AdminMissing";
import AdminActivitys from "../pages/admin/Activity";
import NewAccount from "../pages/admin/account/NewAccount";
import Testes from "../pages/admin/Testes";
import EditAccount from "../pages/admin/account/EditAccount";
import ViewActivity from "../pages/admin/activity/ViewActivity";
import Tokens from "../pages/admin/Tokens";
import NewToken from "../pages/admin/tokens/NewToken";

const AdminController = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='' element={<RequireAuth Protected={2000} component={Home} />} />
				<Route path='accounts' element={<RequireAuth Protected={2000} component={Accounts} />} />
				<Route path='accounts/new' element={<RequireAuth Protected={2000} component={NewAccount} />} />
				<Route path='accounts/:id/edit' element={<RequireAuth Protected={2000} component={EditAccount} />} />

				<Route path='activity' element={<RequireAuth Protected={4000} component={AdminActivitys} />} />
				<Route path='activity/:id/view' element={<RequireAuth Protected={4000} component={ViewActivity} />} />

				<Route path='tokens' element={<RequireAuth Protected={2000} component={Tokens} />} />
				<Route path='tokens/new' element={<RequireAuth Protected={2000} component={NewToken} />} />

				<Route path='testes' element={<RequireAuth Protected={4000} component={Testes} />} />

				<Route path='*' element={<RequireAuth Protected={2000} component={AdminMissing} />} />
			</Route>
		</Routes>
	);
};

export default AdminController;
