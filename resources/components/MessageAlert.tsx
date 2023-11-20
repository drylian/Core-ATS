import tw, { TwStyle } from "twin.macro";
import styled from "styled-components";

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
		return "";
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
		return "";
	}
};

const Box = styled.div<{ $type?: MessageType }>`
    ${tw`rounded border-l-4 p-2 mb-4 flex items-center justify-between`};
    ${(props) => MessageStyle(props.$type)};
`;
/* eslint-disable  react/no-unknown-property */
Box.displayName = "MessageBox.Box";

const MessageBox = ({ title, children, type }: Props) => (
	<Box $type={type} role={"alert"}>
		<div className='flex items-center'>
			<div className='mr-2'>{title && <i className={`${Icon(type)}`} css={[tw`text-2xl`]}></i>}</div>

			<div>
				{title && (
					<p className={"title"} css={[tw`font-bold`]}>
						{title}
					</p>
				)}
				<span css={tw`mr-2 text-left flex-auto`}>{children}</span>
			</div>
		</div>
	</Box>
);

MessageBox.displayName = "MessageBox";

export default MessageBox;
