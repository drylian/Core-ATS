import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/elements/Layout";
import Missing from "../pages/errors/Missing";
import Home from "../pages/root/Home";
import Test from "../pages/root/Test";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RequireAuth from "../components/elements/auth/RequireAuth";

export default function GlobalRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path='' element={<Home />} />
					<Route path='test/front' element={<Test />} />
					<Route path="auth/login/" element={<RequireAuth component={Login} />} />
					<Route path="auth/register/" element={<RequireAuth component={Register} />} />
					{/* <Route exact path="/account/" element={<RequireAuth Protected={1000} component={Account} />} /> */}
					<Route path='*' element={<Missing />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
