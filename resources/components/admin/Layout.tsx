import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import React, { useState } from "react";
import Loading from "../elements/Loading";
import ProgressBar from "../elements/ProgressBar";

const Layout = () => {
	const [open, setOpen] = useState(window.innerWidth < 768 ? false : true);
	return (
		<>
			<main className='flex'>
				<Sidebar open={open} />
				<div className={"flex flex-col flex-1 min-h-screen"}>
					<AdminHeader open={open} setOpen={setOpen} fixed={window.innerWidth < 768 ? true : false} />
					<div
						className={`flex-1 overflow-auto min-w-[200px] w-[calc(100% - 200px)] duration-200 origin-right ${
							!open ? "relative" : window.innerWidth < 768 ? "fixed scale-0" : "relative"
						}`}
					>
						<React.Suspense fallback={<Loading />}>
							<ProgressBar />
							<Outlet />
						</React.Suspense>
					</div>
				</div>
			</main>
		</>
	);
};

export default Layout;
