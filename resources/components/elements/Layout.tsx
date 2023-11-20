import { Outlet } from "react-router-dom";
import ProgressBar from "./ProgressBar";
const Layout = () => {
	return (
		<>
			<ProgressBar />

			<Outlet />
		</>
	);
};

export default Layout;
