import React from "react";

interface SquareModelProps {
    title: string;
    value?: string | number;
    active?: boolean;
    icon: string;
}

const SquareModel: React.FunctionComponent<SquareModelProps> = ({ title, value, active, icon }) => {
	return (
		<div className='p-1 w-full'>
			<div className='flex items-center border border-solid border-gray-300 rounded shadow-md corsec'>
				<div className='corpri border border-solid border-gray-300 p-5'>
					<i className={icon} style={{ fontSize: "50px" }} />
				</div>
				<div className='ml-4 mr-4 P-3'>
					<div className='text-lg font-bold'>{title}</div>
					{value ? (
						<span className='font-bold text-gray-400'>{value}</span>
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

export default SquareModel;
