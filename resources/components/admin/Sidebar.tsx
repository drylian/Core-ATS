import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { store } from "../../states";
import logout from "../../axios/auth/logout";

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
		{ title: "Registros", icon: "bxs-chart", permission: 2, path: "/admin/activity" },
		{ title: "Usuários", icon: "bxs-user", permission: 2, path: "/admin/accounts" },
		{ title: "Configurações", icon: "bxs-cog", permission: 2, path: "/admin/settings" },
		{ title: "Testes", icon: "bxs-search", permission: 2, path: "/admin/testes" },
		// { title: "Analytics", icon: "bxs-chart", permission: 2, path: "/" },
		// { title: "Files ", icon: "bxs-folder", permission: 2, path: "/" },
		// { title: "Setting", icon: "bxs-cog", permission: 2, path: "/" },
	];

	return (
		<div
			className={` ${open ? "w-72" : "w-20 "} corpri p-4 relative duration-300 overflow-auto`}
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
				<span className={`textpri font-bold text-lg origin-left duration-200 ${!open && "scale-0"}`}>
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
									className={`flex rounded-md p-2 cursor-pointer hover:bg-white hover:bg-opacity-20 textsec text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}
			  ${currentPage === Menu.path ? "border-l-4 border-blue-500 shadow-md bg-white bg-opacity-10" : ""}
              `}
								>
									{/* Use as classes do Boxicons para os ícones */}
									<i
										className={`bx ${Menu.icon}`}
										style={{
											marginLeft: "6px",
											fontSize: "20px",
										}}
									/>
									<span className={`${!open && "scale-0"} origin-left duration-200`}>
										{Menu.title}
									</span>
								</li>
							</Link>
						),
				)}
				{User && (
					<div
						className={`${
							!open && "scale-0"
						} duration-200 mt-2 p-2 bg-light-white rounded-md border border-gray-300`}
					>
						<div className='flex items-center justify-between border-b pb-2 mb-2'>
							<div>
								<div className='font-bold text-sm'>{User.username}</div>
								<div className='text-gray-500'>{User.email}</div>
							</div>
							<div
								className='mt-2 p-2 bg-light-white rounded-md border border-gray-300 flex'
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
									className='bx bx-log-out-circle'
									style={{
										marginLeft: "-1px",
										fontSize: "20px",
									}}
								/>
							</div>
						</div>
					</div>
				)}
			</ul>
		</div>
	);
};

export default App;
