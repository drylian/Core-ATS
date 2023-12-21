import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { store } from "../../states";
import logout from "../../axios/auth/logout";
import BoxModel from "../elements/models/BoxModel";

interface Menu {
	title: string;
	icon: string;
	permission: number;
	path: string;
	gap?: boolean;
}

interface Props {
	open: boolean;
}

const App: React.FC<Props> = ({ open }) => {
	const nav = useNavigate();
	const location = useLocation();
	const [currentPage, setCurrentPage] = useState("");

	useEffect(() => {
		// Atualiza o estado currentPage sempre que a localização mudar
		setCurrentPage(location.pathname);
	}, [location]);

	const User = store.getState().user.data;
	// const website = store.getState().website.data;
	const Menus: Menu[] = [
		{ title: "Retornar", icon: "bx-arrow-back", permission: 0, path: "/" },
		{ title: "Dashboard", icon: "bxs-dashboard", permission: 2, path: "/admin" },
		{ title: "Atividades", icon: "bxs-chart", permission: 2, path: "/admin/activity" },
		{ title: "Usuários", icon: "bxs-user", permission: 2, path: "/admin/accounts" },
		{ title: "Tokens", icon: "bx bx-network-chart", permission: 2, path: "/admin/tokens" },
		{ title: "Configurações", icon: "bxs-cog", permission: 2, path: "/admin/settings" },
		{ title: "Testes", icon: "bxs-search", permission: 2, path: "/admin/testes" },
		// { title: "Files ", icon: "bxs-folder", permission: 2, path: "/" },
		// { title: "Setting", icon: "bxs-cog", permission: 2, path: "/" },
	];

	return (
		<div
			className={` ${open ? "w-72" : "w-20 "} bg-light-primary dark:bg-dark-primary p-4 relative duration-300 overflow-auto`}
			style={{
				marginLeft: open ? "" : window.innerWidth < 768 ? "-80px" : "",
			}}
		>
			<div className='flex gap-x-4 items-center'>
				<img
					src={"/img/favicon.png"}
					style={{
						cursor: "pointer",
						transitionDuration: "500ms",
						transform: open ? "rotate(360deg)" : "",
						maxWidth: "50px", // Defina o tamanho máximo desejado
					}}
					alt='Logo'
				/>
				<span className={`text-light-primary dark:text-dark-primary font-bold text-lg origin-left duration-300 ${!open && "scale-0"}`}>
					Administração
				</span>
			</div>
			<ul className='pt-2'>
				{Menus.map(
					(Menu, index) =>
						// Verifique a permissão aqui 
						User &&
						User.permissions &&
						User.permissions >= Menu.permission && (
							<Link to={Menu.path} key={index}>
								<li
									className={`flex duration-300 rounded-md p-2 cursor-pointer hover:bg-white hover:bg-opacity-20 text-light-secondary dark:text-dark-secondary text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}
			  ${currentPage === Menu.path ? "border-l-4 border-blue-500 shadow-md bg-white hover:border-blue-300 after:border-blue-500 bg-opacity-10" : "border-blue-400"}
              `}
								>
									{/* Use as classes do Boxicons para os ícones */}
									<i
										className={`bx ${Menu.icon} text-light-primary dark:text-dark-primary duration-300`}
										style={{
											marginLeft: "6px",
											fontSize: "20px",
										}}
									/>
									<span className={`${!open && "scale-0"} text-light-primary dark:text-dark-primary origin-left duration-300`}>
										{Menu.title}
									</span>
								</li>
							</Link>
						),
				)}
				{User && (
					<BoxModel className={`${!open && "scale-0"
						} duration-300 mt-3`} noheader nopad>
						<div className="flex items-center justify-between p-2">
							<div className="w-10 h-10 flex items-center justify-center border-4 border-blue-500 rounded-full">
								<i className="bx bx-user text-light-primary dark:text-dark-primary duration-300" style={{ fontSize: '20px' }} />
							</div>
							<div>
								<p className="text-xs text-light-primary dark:text-dark-primary duration-300">
									{User.email}
								</p>
								<p className="text-xs text-light-secondary dark:text-dark-secondary duration-300">
									{User.permissions ?? 'N/A'}
								</p>
							</div>
							<div
								className='rounded-full justify-between items-center'
								style={{
									cursor: "pointer",
								}}
								onClick={() => {
									logout().then(() => {
										nav("/");
										window.location.reload();
									});
								}}
							>
								<i
									className='bx bx-exit'
									style={{
										marginLeft: "-1px",
										fontSize: "30px",
									}}
								/>
							</div>
						</div>
					</BoxModel>
				)}
			</ul>
		</div>
	);
};

export default App;
