import React, { ReactNode, MouseEvent, SetStateAction, Dispatch } from "react";
import tw from "twin.macro";

interface BoxModelProps {
	title?: string;
	desc?: string;
	children: ReactNode;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	buttonSub?: string;
	nopad?: boolean;
	color?: "red" | "blue" | "green" | "yellow";
	noheader?: boolean;
	search?: string;
	setSearch?: Dispatch<SetStateAction<string>>;
	className?: string;
}

function ColorSet(color: "red" | "blue" | "green" | "yellow" | undefined) {
	switch (color) {
		case "red":
			return tw`border-red-500`;
		case "blue":
			return tw`border-blue-500`;
		case "green":
			return tw`border-green-500`;
		case "yellow":
			return tw`border-yellow-500`;
		default:
			return tw`border-blue-500`;
	}
}

const BoxModel: React.FC<BoxModelProps> = ({
	search,
	setSearch,
	title,
	desc,
	children,
	onClick,
	buttonSub,
	nopad = false,
	noheader = false,
	color,
	className
}) => {
	return (
		<div className={className}>
			<div className={`overflow-hidden border-t-4 rounded-md`} css={ColorSet(color)}>
				{!noheader && <div className='header bg-light-primary dark:bg-dark-primary duration-300 text-light-primary dark:text-dark-primary flex items-center rounded-t-md p-1'>
					<h2 className='m-0 text-bold text-light-primary dark:text-dark-primary duration-300 text-lg'>{title}</h2>
					{search !== undefined && setSearch && (
						<p className='m-0 text-light-tertiary dark:text-dark-tertiary duration-300 text-sm ml-4'>
							{
								<input
									type='text'
									placeholder='Perquisar...'
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className='block p-2 w-full text-sm text-light-primary dark:text-dark-primary bg-light-secondary dark:bg-dark-secondary border duration-300 border-none rounded focus:border-blue-500'
								/>
							}
						</p>
					)}
					{desc && <p className='m-0 text-light-tertiary dark:text-dark-tertiary duration-300 text-sm ml-4 hidden md:block '>{desc}</p>}
					{buttonSub && (
						<button className='ml-auto px-4 py-2 bg-light-secondary dark:bg-dark-secondary duration-300 text-white rounded' onClick={onClick}>
							{buttonSub}
						</button>
					)}
				</div>}
				<div className={`overflow-auto rounded-b-md bg-light-secondary dark:bg-dark-secondary duration-300 ${!nopad ? "p-2" : ""}`}>{children}</div>
			</div>
		</div>
	);
};

export default BoxModel;
