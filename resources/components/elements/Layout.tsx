import { Outlet } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import ErrorBoundary from "../../pages/errors/ErrorBoundary";
const Layout = () => {
	return (
		<>
			<ErrorBoundary>
				<ProgressBar />
				<Outlet />
			</ErrorBoundary>
		</>
	);
};

export default Layout;
