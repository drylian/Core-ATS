import React, { ReactNode } from "react";
import Trans, { trans } from "../../components/elements/Trans";
import { store } from "../../states";

interface BanReasonBoxProps {
    reason: ReactNode;
}

const BanReasonBox: React.FC<BanReasonBoxProps> = ({ reason }) => (
	<>
		<h1 className='text-2xl font-bold mb-4 text-light-primary dark:text-dark-primary duration-300'>
			<Trans ns={"react:messages"} i18nKey={"SuspendedAccount"} />
		</h1>
		<p className='text-light-secondary dark:text-dark-secondary duration-300 mb-6'>{reason}</p>
		<button
			className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300'
			onClick={() => window.history.back()}
		>
			<Trans ns={"attributes"} i18nKey={"Return"} />
		</button>
	</>
);

interface SuspendedProps {
    reason?: ReactNode;
}
const Suspended = ({ reason }: SuspendedProps) => {
	const website = store.getState().website.data;
	document.title = (website?.title || "Core") + " - " + trans("react:titles").t("Suspended");

	return (
		<div className='flex items-center justify-center h-screen '>
			<div className='bg-light-primary dark:bg-dark-primary duration-300 p-8 rounded shadow-lg text-center'>
				<BanReasonBox
					reason={reason || <Trans ns={"react:messages"} i18nKey={"DefaultSuspendedAccoutReason"} />}
				/>
			</div>
		</div>
	);
};

export default Suspended;
