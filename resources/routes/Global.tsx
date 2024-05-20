import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/elements/Layout";
import Missing from "../pages/errors/Missing";
import Home from "../pages/root/Home";
import Login from "../pages/auth/login/Container";
import Register from "../pages/auth/register/Container";
import RequireAuth from "../components/elements/auth/RequireAuth";
import AdminController from "./Admin";
import ClientController from "./Client";

import Loader from "../components/elements/Loading";
import Tests from "../pages/root/Tests";
export default function GlobalRouter() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Rotas Globais */}
				<Route path='/admin/*' element={<RequireAuth Protected={2000} component={AdminController} />} />
				<Route path='/client/*' element={<RequireAuth Protected={1000} component={ClientController} />} />

				<Route path='/' element={<Layout />}>
					<Route path='' element={<Home />} />
					<Route path='tests' element={<Tests />} />
					<Route path='auth/login' element={<RequireAuth component={Login} />} />
					<Route path='auth/register' element={<RequireAuth component={Register} />} />
					<Route path='/loading' element={<RequireAuth Protected={1000} component={Loader} />} />
					<Route path='*' element={<Missing />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
