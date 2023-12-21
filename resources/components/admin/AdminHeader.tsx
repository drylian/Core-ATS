import React, { Dispatch, SetStateAction } from "react";
import { store } from "../../states";
import LightSwitches from "../Themechanger";
interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	fixed?: boolean;
}
const AdminHeader: React.FC<Props> = ({ open, setOpen, fixed }) => {
	const website = store.getState().website.data;
	const headerClassName = `bg-light-primary dark:bg-dark-primary text-light-primary dark:text-dark-primary duration-300 p-6 flex items-center justify-between ${fixed ? "fixed top-0 left-0 w-full z-50" : ""
		}`;

	return (
		<>
			<header className={headerClassName}>
				<div className='flex items-center space-x-2'>
					<i
						className={`bx bx-menu ${!open && "rotate-180"}`}
						onClick={() => setOpen(!open)}
						style={{
							marginLeft: "-1px",
							fontSize: "30px",
						}}
					/>
					<span className='text-light-primary dark:text-dark-primary font-bold text-lg duration-300'>{website?.title}</span>
					<LightSwitches />
				</div>
			</header>
			{fixed ? <div className='h-20'></div> : null}
		</>
	);
};

export default AdminHeader;
