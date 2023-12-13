import React, { Dispatch, SetStateAction } from "react";
import { store } from "../../states";
interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	fixed?: boolean;
}
const AdminHeader: React.FC<Props> = ({ open, setOpen, fixed }) => {
	const website = store.getState().website.data;
	const headerClassName = `corpri textpri p-6 flex items-center justify-between ${fixed ? "fixed top-0 left-0 w-full z-50" : ""
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
					<span className='textpri font-bold text-lg'>{website?.title}</span>
				</div>
			</header>
			{fixed ? <div className='h-20'></div> : null}
		</>
	);
};

export default AdminHeader;
