import { useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../states";
import logout from "../axios/auth/logout";
import Trans from "./elements/Trans";

const Header = ({ fixed = false }: { fixed?: boolean }) => {
	const website = store.getState().website.data;
	const [showDropdown, setShowDropdown] = useState(false);
	const user = store.getState().user.data;
	const [loggedIn, setLoggedIn] = useState(user !== undefined);

	const handleLogout = async () => {
		logout().then(() => {
			setLoggedIn(false);
			window.location.reload();
		});
	};

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const headerClassName = `bg-light-primary dark:bg-dark-primary duration-300 text-light-primary dark:text-dark-primary p-4 flex items-center justify-between ${
		fixed ? "fixed top-0 left-0 w-full z-50" : ""
	}`;

	return (
		<>
			<header className={headerClassName}>
				<div className='flex items-center space-x-2'>
					<img src='/img/favicon.png' alt='Logo' className='w-10 h-10' />
					<span className='text-light-primary dark:text-dark-primary duration-300 font-bold text-lg'>{website?.title}</span>
				</div>
				{loggedIn && user ? (
					<div className='relative'>
						<button
							onClick={toggleDropdown}
							className='bg-light-tertiary dark:bg-dark-tertiary duration-300 flex items-center space-x-2 px-4 py-2 border border-white rounded-lg hover:bg-gray-300 hover:text-clay-800'
						>
							<i className='bx bxs-user-circle'></i>
							<span>{user?.username}</span>
							<i className={`bx ${showDropdown ? "bx-chevron-up" : "bx-chevron-down"}`}></i>
						</button>
						{showDropdown && (
							<div className='absolute right-0 mt-2 bg-light-tertiary dark:bg-dark-tertiary duration-300 text-light-primary dark:text-dark-primary border border-gray-300 rounded-lg shadow-md'>
								<Link
									to='/account/settings'
									onClick={() => {
										toggleDropdown();
									}}
									className='flex space-x-2 items-center px-4 py-2 w-full text-left hover:bg-gray-200 rounded-lg'
								>
									<i className='bx bxs-cog'></i>{" "}
									<span>
										<Trans ns={"attributes"} i18nKey={"account"} />
									</span>
								</Link>
								{user.permissions && user.permissions >= 2000 && (
									<Link
										to='/admin'
										onClick={() => {
											toggleDropdown();
										}}
										className='flex space-x-2 items-center px-4 py-2 w-full text-left hover:bg-gray-200 rounded-lg'
									>
										<i className='bx bxs-cog'></i>{" "}
										<span>
											<Trans ns={"attributes"} i18nKey={"administration"} />
										</span>
									</Link>
								)}
								<button
									onClick={() => {
										handleLogout();
										toggleDropdown();
									}}
									className='flex space-x-2 items-center px-4 py-2 w-full text-left hover:bg-gray-200 rounded-lg'
								>
									<i className='bx bxs-exit'></i>{" "}
									<span>
										<Trans ns={"attributes"} i18nKey={"logout"} />
									</span>
								</button>
							</div>
						)}
					</div>
				) : (
					<Link
						to='/auth/login'
						className='flex items-center space-x-2 px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-gray-800'
					>
						<i className='bx bx-log-in'></i>{" "}
						<span>
							<Trans ns={"attributes"} i18nKey={"login"} />
						</span>
					</Link>
				)}
			</header>
			{fixed ? <div className='h-20'></div> : null}
		</>
	);
};

export default Header;
