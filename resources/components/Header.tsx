import { Link, useLocation } from "react-router-dom";
import { store } from "../states";
import { useEffect, useState } from "react";
import LightSwitches from "../components/Themechanger";
import Trans from "../components/elements/Trans";
import logout from "../axios/auth/logout";
import useResize from "../components/useResize";

const Header = () => {
	const website = store.getState().website.data
	const location = useLocation();
	const [currentPage, setCurrentPage] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const user = store.getState().user.data;
	const handleLogout = async () => {
		logout().then(() => {
			window.location.reload();
		});
	};
	const { mobile, tablet, desktop } = useResize();
	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};
	const NavegationPages = [
		{ path: '/', label: 'Home', title: "Bem-vindo ao nosso site - " + website?.title },
		{ path: '/loja', label: 'Serviços', title: "Loja de serviços " + website?.title },
		{ path: '/terms-of-service', label: 'Termos', title: "Termos de serviço " + website?.title },
		{ path: '/tests', label: 'Testes', title: "Area de Testes " + website?.title },

	];
	useEffect(() => {
		// Atualiza o estado currentPage sempre que a localização mudar
		setCurrentPage(location.pathname);
		{
			NavegationPages.map((item) => {
				if (currentPage === item.path) {
					document.title = website?.title + " - " + item.title;
				}
			})
		}
	}, [location]);
	return (
		<>
			<header className="bg-light-primary dark:bg-dark-primary duration-300 p-4">
				{/** Desktop Vision */}
				{desktop && <><div className='flex items-center space-x-4'>
					<img src='/img/favicon.png' alt='Logo' className='w-10 h-10' />


					<span className='text-light-primary dark:text-dark-primary duration-300 font-extrabold text-lg'>{website?.title}</span>
					<nav className=" items-center flex-1 justify-end">
						<ul className="flex ">
							{NavegationPages.map((item) => (
								<li key={item.path} className={currentPage === item.path ? 'mr-4 font-bold duraction-300 border-b-[1px] border-blue-500 dark:border-blue-800 text-blue-500 dark:text-blue-800' : ' text-light-secondary dark:text-dark-secondary mr-4'}>
									<Link to={item.path} className={currentPage !== item.path ? "duraction-300 hover:border-b-[1px] hover:border-blue-500 dark:hover:border-blue-800" : ""}>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className="flex items-center justify-center gap-3">
						<LightSwitches />
						{user && user.permissions && user.permissions >= 1000 ? (
							<button
								onClick={toggleDropdown}
								className='bg-light-secondary dark:bg-dark-secondary hover:bg-blue-300 dark:hover:bg-blue-600 duration-300 space-x-2 px-4 py-2 border border-white rounded-lg  text-light-primary dark:text-dark-primary'
							>
								<i className='bx bxs-user-circle'></i>
								<span>{user?.username}</span>
								<i className={`bx ${showDropdown ? "bx-chevron-up" : "bx-chevron-down"}`}></i>
							</button>
						) : (
							<Link
								to='/auth/login'
								className='bg-light-secondary dark:bg-dark-secondary hover:bg-blue-300 dark:hover:bg-blue-600 duration-300 space-x-2 px-4 py-2 border border-white rounded-lg  text-light-primary dark:text-dark-primary'
							>
								<i className='bx bx-log-in text-light-primary dark:text-dark-primary duration-200'></i>{" "}
								<span className="text-light-primary dark:text-dark-primary duration-200">
									<Trans ns={"attributes"} i18nKey={"login"} />
								</span>
							</Link>
						)}

					</div>
				</div>
				</>}
				{/** Mobile Vision */}
				{(mobile || tablet) && <>
					<div className="flex items-center justify-between">
						<div className='flex items-center space-x-4'>

							<img src='/img/favicon.png' alt='Logo' className='w-10 h-10' />
							<span className='text-light-primary dark:text-dark-primary duration-300 font-bold text-lg'>{website?.title}</span>
						</div>
						<div className='flex items-center gap-3'>
							<LightSwitches />

							<button
								onClick={toggleDropdown}
								className='bg-light-secondary dark:bg-dark-secondary hover:bg-blue-300 dark:hover:bg-blue-600 duration-300 space-x-2 px-4 py-2 border border-white rounded-lg  text-light-primary dark:text-dark-primary'
							>
								<span>Menu</span>
								<i className={`bx ${showDropdown ? "bx-chevron-up" : "bx-chevron-down"}`}></i>
							</button>
						</div>

					</div>
				</>}
				<div className={`absolute right-0 mt-2 bg-light-secondary dark:bg-dark-secondary duration-300 text-light-primary dark:text-dark-primary border border-gray-300 rounded-lg shadow-md origin-top ${showDropdown ? "" : "scale-0"}`}>
					<div className='relative'>
						{(mobile || tablet) && <>
							<div className="flex items-center">
								<div className='border-b border-gray-400 w-full mr-1' />
								<span className="duration-300">Links</span>
								<div className='border-b border-gray-400 w-full ml-1' />
							</div>
							{NavegationPages.map((item) => (
								<Link to={item.path} className={`flex space-x-2 items-center px-4 py-2 w-full text-left hover:bg-blue-300 dark:hover:bg-blue-600 duration-300`}>
									<i className='bx bx-link'></i>{" "}
									<span>
										{item.label}
									</span>
								</Link>
							))}
							{!user && (
							<>
								<div className='border-b border-gray-400 w-full mr-1' />

								<Link
									to='/auth/login'
									onClick={() => {
										toggleDropdown();
									}}
									className={`flex space-x-2 items-center px-4 py-2 w-full text-left hover:bg-blue-300 rounded-br-lg rounded-bl-lg dark:hover:bg-blue-600 duration-300`}>

									<i className='bx bxs-cog'></i>{" "}
									<span>
										<Trans ns={"attributes"} i18nKey={"login"} />
									</span>
								</Link>
							</>
						)}
						</>}
						{user && user.permissions && user.permissions >= 1000 && (
							<>
								{(mobile || tablet) && <div className="flex items-center">
									<div className='border-b border-gray-400 w-full mr-1' />
									<span>{user?.username}</span>
									<div className='border-b border-gray-400 w-full ml-1' />
								</div>}
								<Link
									to='/account/settings'
									onClick={() => {
										toggleDropdown();
									}}
									className={`flex space-x-2 items-center px-4 py-2 w-full text-left hover:bg-blue-300 dark:hover:bg-blue-600 duration-300`}>

									<i className='bx bxs-cog'></i>{" "}
									<span>
										<Trans ns={"attributes"} i18nKey={"account"} />
									</span>
								</Link>
							</>
						)}
						{user && user.permissions && user.permissions >= 2000 && (
							<Link
								to='/admin/settings'
								onClick={() => {
									toggleDropdown();
								}}
								className={`flex space-x-2 items-center px-4 py-2 w-full text-left hover:bg-blue-300 dark:hover:bg-blue-600 duration-300`}>

								<i className='bx bxs-cog'></i>{" "}
								<span>
									<Trans ns={"attributes"} i18nKey={"administration"} />
								</span>
							</Link>
						)}
						{user && user.permissions && user.permissions >= 1000 && (
							<button
								onClick={() => {
									handleLogout();
									toggleDropdown();
								}}
								className={`flex space-x-2 items-center px-4 py-2 w-full text-left hover:bg-blue-300 rounded-br-lg rounded-bl-lg dark:hover:bg-blue-600 duration-300`}>

								<i className='bx bxs-exit'></i>{" "}
								<span>
									<Trans ns={"attributes"} i18nKey={"logout"} />
								</span>
							</button>
						)}
					</div>
				</div>
			</header >

		</>
	);
};

export default Header;
