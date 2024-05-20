import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import React, { useState } from "react";
import Loading from "../elements/Loading";
import ProgressBar from "../elements/ProgressBar";
import useResize from "../useResize";

const Layout = () => {
	const { mobile, tablet } = useResize();

	const [open, setOpen] = useState((mobile || tablet)? false : true);

	return (
		<>
			<main className='flex'>
				<Sidebar open={open} mobile={mobile} tablet={tablet} setOpen={setOpen}/>
				<div className={"flex flex-col flex-1 min-h-screen"}>
					<AdminHeader open={open} setOpen={setOpen} fixed={(mobile || tablet) ? true : false} />
					<div
						className={`flex-1 overflow-auto min-w-[200px] w-[calc(100% - 200px)] duration-300 origin-right ${!open ? "relative" : (mobile || tablet) ? "fixed scale-0" : "relative"
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
