import React, { ReactNode, useEffect } from "react";
import { store } from "../../states";
import ContentContainer from "./ContentContainer";
import tw from "twin.macro";
import FlashMessageRender from "../FlashMessageRender";
/* eslint-disable  react/no-unknown-property */

// Definir PropTypes
export interface ContentBoxProps {
	children?: ReactNode;
	nofooter?: boolean;
	title?: string;
	className?: string;
	header?: boolean
	desc?:string
}

const ContentBox: React.FC<ContentBoxProps> = ({ title, className, children, nofooter, desc, header = false }) => {
	// Obter dados do site do armazenamento
	const website = store.getState().website.data;

	useEffect(() => {
		if (title) {
			const titleset = website?.title + " - " + title;
			document.title = titleset;
		}
	}, [title]);

	return (
		<>
			<ContentContainer css={tw`my-1 sm:my-1`} className={className}>
				{header &&
					<>
					<div className="flex items-center p-2 corpri bg-opacity-75 rounded border-t-4 border-blue-500">
					<h1 className="corpri font-bold text-lg">{title}</h1>
						<h1 className="corpri font-bold text-base">{desc}</h1>
					</div>
					</>
				}
				<FlashMessageRender />
				{children}
			</ContentContainer>
			{!nofooter && (
				<ContentContainer>
					<p css={tw`text-center text-neutral-500 text-xl`}>
						<a
							rel={"noopener nofollow noreferrer"}
							href={"https://alternight.com.br"}
							target={"_blank"}
							css={tw`no-underline text-neutral-500 hover:text-neutral-300`}
						>
							Alternight&reg;
						</a>
						&nbsp;&copy; 2020 - {new Date().getFullYear()}
					</p>
				</ContentContainer>
			)}
		</>
	);
};

export default ContentBox;
