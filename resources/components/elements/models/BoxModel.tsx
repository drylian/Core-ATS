import React, { ReactNode, MouseEvent, SetStateAction, Dispatch } from "react";
import styled, { keyframes, css } from "styled-components";
import tw from "twin.macro";

interface BoxModelProps {
    title?: string;
    desc?: string;
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    buttonSub?: string;
    nopad?: boolean;
    color?: "red" | "blue" | "green" | "yellow" | "rgb";
    search?: string;
    setSearch?: Dispatch<SetStateAction<string>>;
}

const RGB = keyframes`
  0% {
    border-color: rgb(255, 0, 0);
  }
  50% {
    border-color: rgb(0, 255, 0);
  }
  80% {
    border-color: rgb(0, 0, 255);
  }
  100% {
    border-color: rgb(200, 0, 78);
  }
`;

function ColorSet(color: "red" | "blue" | "green" | "yellow" | "rgb" | undefined) {
	switch (color) {
	case "red":
		return tw`border-red-500`;
	case "blue":
		return tw`border-blue-500`;
	case "green":
		return tw`border-green-500`;
	case "yellow":
		return tw`border-yellow-500`;
	case "rgb":
		return tw`shadow-[0_-2px_10px_2px] transition-all duration-[250ms] ease-in-out`;
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
	color,
}) => {
	const BorderColor = styled.div<{ color: "red" | "blue" | "green" | "yellow" | "rgb" | undefined }>`
        ${(props) => ColorSet(props.color)}
        ${tw`overflow-hidden border-t-4 rounded-md`}
    /* Aplicando a animação apenas se a cor for "rgb" */
    ${(props) =>
		props.color === "rgb" &&
            css`
                animation: ${RGB} 3000ms infinite;
            `}
    `;

	return (
		<>
			<BorderColor color={color}>
				<div className='header corpri text-white flex items-center rounded-t-md p-2'>
					<h2 className='m-0 text-bold textpri text-2xl'>{title}</h2>
					{search !== undefined && setSearch && (
						<p className='m-0 textter text-sm ml-4'>
							{
								<input
									type='text'
									placeholder='Perquisar...'
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className='block p-2.5 w-full text-sm textpri corsec border duration-200 border-none rounded focus:border-blue-500'
								/>
							}
						</p>
					)}
					{desc && <p className='m-0 textter text-sm ml-4 hidden md:block'>{desc}</p>}
					{buttonSub && (
						<button className='ml-auto px-4 py-2 corsec text-white rounded' onClick={onClick}>
							{buttonSub}
						</button>
					)}
				</div>
				<div className={`overflow-auto rounded-b-md corter ${!nopad ? "p-4" : ""}`}>{children}</div>
			</BorderColor>
		</>
	);
};

export default BoxModel;
