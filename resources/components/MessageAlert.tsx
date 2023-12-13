import tw, { TwStyle } from "twin.macro";
import styled from "styled-components";
import { useEffect, useState } from "react";

export type MessageType = "success" | "info" | "warning" | "error";

interface Props {
    title?: string;
    children: string;
    type?: MessageType;
}

const Icon = (type?: MessageType): string => {
	switch (type) {
	case "error":
		return "bx bxs-error";
	case "info":
		return "bx bx-info-circle";
	case "success":
		return "bx bxs-check-circle";
	case "warning":
		return "bx bxs-info-circle";
	default:
		return "bx bxs-error";
	}
};
const MessageStyle = (type?: MessageType): TwStyle | string => {
	switch (type) {
	case "error":
		return tw`bg-red-200 bg-opacity-90 border-red-500 text-red-800`;
	case "info":
		return tw`bg-blue-200 bg-opacity-90 border-blue-500 text-blue-800`;
	case "success":
		return tw`bg-green-200 bg-opacity-90 border-green-500 text-green-800`;
	case "warning":
		return tw`bg-yellow-200 bg-opacity-90 border-yellow-500 text-yellow-800`;
	default:
		return tw`bg-red-200 bg-opacity-90 border-red-500 text-red-800`;
	}
};
const Box = styled.div<{ $type?: MessageType }>`
    ${tw`rounded border-l-4 p-2 mb-4 flex items-center justify-between`};
    ${(props) => MessageStyle(props.$type)};
`;
/* eslint-disable  react/no-unknown-property */
Box.displayName = "MessageBox.Box";

const MessageBox = ({ title, children, type }: Props) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	const handleClose = () => {
		setVisible(false);
	};

	return (
		<>
			{visible && (
				<Box $type={type} role={"alert"}>
					<div className='flex items-center justify-center'>
						<div className='mr-2'><i className={`${Icon(type)}`} css={[tw`text-2xl`]}></i></div>

						<div>
							{title && (
								<p className={"title"} css={[tw`font-bold`]}>
									{title}
								</p>
							)}
							<span css={tw`mr-2 text-left flex-auto`}>{children}</span>
						</div>
					</div>
					<div className='rounded-full'>
						<i
							onClick={handleClose}
							className={"bx bx-x"}
							css={[tw`text-2xl`]}
							style={{ marginTop: "5px", color: "black", fontSize: "30px" }}
						/>
					</div>
				</Box>
			)}
		</>
	);
};

MessageBox.displayName = "MessageBox";

export default MessageBox;
