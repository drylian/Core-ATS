import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SquareModelProps {
	title: string;
	value?: string | number | null;
	active?: boolean;
	icon: string;
	className?: string;
}
export const SquareLoading: React.FunctionComponent = () => {
	return (
		<div className='p-1 w-full animate-pulse'>
			<div className='flex items-center rounded shadow-md bg-light-secondary dark:bg-dark-secondary duration-300'>
				<div className='bg-light-primary rounded-md dark:bg-dark-primary duration-300 p-5'>
					<i className={"bx bxs-layout animate-pulse text-light-tertiary duration-600 dark:text-dark-tertiary"} style={{ fontSize: "50px" }} />
				</div>
				<div className='ml-4 mr-4 P-3 '>
					<div className='pointer-events-none animate-pulse select-none text-lg rounded-md font-bold bg-light-tertiary duration-400 text-transparent dark:bg-dark-tertiary text-none'>-----------------------------</div>
					<span className='pointer-events-none animate-pulse select-none font-bold rounded-md text-transparent duration-200 bg-light-tertiary text-none dark:bg-dark-tertiary'>----------------------</span>
				</div>
			</div>
		</div>
	);
};
const SquareModel: React.FunctionComponent<SquareModelProps> = ({ title, value, active, icon, className }) => {
	if(value === null || value === undefined){
		return <SquareLoading/>
	}
	return (
		<div className='p-1 w-full'>
			<div className='flex items-center rounded shadow-md  bg-light-secondary dark:bg-dark-secondary duration-300'>
				<div className='bg-light-primary dark:bg-dark-primary duration-300 p-5'>
					<i className={twMerge(icon,className !== undefined ? className : " text-light-primary dark:text-dark-primary")} style={{ fontSize: "50px" }} />
				</div>
				<div className='ml-4 mr-4 P-3 '>
					<div className='text-lg font-bold text-light-primary dark:text-dark-primary'>{title}</div>
					{value ? (
						<span className='font-bold text-gray-500'>{value}</span>
					) : active ? (
						<span className='text-green-500 font-semibold'>Habilitado</span>
					) : (
						<span className='text-red-500 font-semibold'>Desabilitado</span>
					)}
				</div>
			</div>
		</div>
	);
};
export const SquareBox: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className='p-1 w-full'>
			<div className='flex items-center rounded shadow-md  bg-light-secondary dark:bg-dark-secondary duration-300'>
				{children}
			</div>
		</div>
	);
};

export default SquareModel;
