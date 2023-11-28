import React, { useState } from "react";

interface SidebarItem {
    icon: React.ReactNode;
    label: string;
    link: string;
}

const Navbar: React.FC = () => {
	const sidebarItems: SidebarItem[] = [{ icon: "bx bxs-cog", label: "Retornar ao Menu", link: "/" }];

	const [active, setActive] = useState(true);

	return (
		<div className='h-screen'>
			<div
				className={`transition-all duration-300 flex flex-col h-full p-3 ${
					active ? "w-60" : "w-16"
				} dark:bg-gray-900 dark:text-gray-100`}
			>
				<div className='space-y-3'>
					<div className='flex items-center justify-between'>
						{active && <h2>Dashboard</h2>}
						<button className='p-2' onClick={() => setActive(!active)}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 512 512'
								className='w-5 h-5 fill-current dark:text-gray-100'
							>
								<rect width='352' height='32' x='80' y='96'></rect>
								<rect width='352' height='32' x='80' y='240'></rect>
								<rect width='352' height='32' x='80' y='384'></rect>
							</svg>
						</button>
					</div>
					<div className='flex-1'>
						<ul className='pt-2 pb-4 space-y-1 text-sm'>
							{sidebarItems.map((item, index) => (
								<li key={index} className='rounded-sm'>
									<a
										rel='noopener noreferrer'
										href={item.link}
										className='flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-gray-300'
									>
										<i className={`bx ${item.icon} text-xl`}></i>
										{active && (
											<span
												className={`relative text-xl transition-transform duration-300 transform ${
													active ? "translate-x-[-0.5rem]" : "translate-x-0"
												}`}
											>
												{item.label}
											</span>
										)}
									</a>
								</li>
							))}
						</ul>
					</div>
					{/* ... Other code ... */}
				</div>
				{/* ... Other code ... */}
			</div>
		</div>
	);
};

export default Navbar;
