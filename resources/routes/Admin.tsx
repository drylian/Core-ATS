/**
 * Rotas da Area Administrativa.
 */
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/elements/auth/RequireAuth";
import Home from "../pages/admin/Home";
import Layout from "../components/admin/Layout";

const AdminController = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/' element={<RequireAuth Protected={2000} component={Home} />} />
				{/* <Route path="/account" element={<RequireAuth Protected={4000} component={Account} />} />
                <Route path="/account/:id/edit" element={<RequireAuth Protected={4000} component={AccountEdit} />} />

                <Route path="/settings" element={<RequireAuth Protected={1} component={Admin} />} /> */}
			</Route>
		</Routes>
	);
};

export default AdminController;
