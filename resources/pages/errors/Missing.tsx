import Trans, { trans } from "../../components/elements/Trans";
const Missing = () => {
	const goBack = () => {
		window.history.back();
	};
	document.title = trans("react:messages").t("PageNotFound");

	return (
		<div className='flex items-center justify-center h-screen '>
			<div className='bg-light-primary dark:bg-dark-primary duration-300 p-8 rounded shadow-lg text-center'>
				<h1 className='text-2xl font-bold text-light-primary dark:text-dark-primary duration-300 mb-4'>
					<Trans ns={"react:messages"} i18nKey={"PageNotFound"} />
				</h1>
				<p className='mb-6 text-light-secondary dark:text-dark-secondary duration-300'>
					<Trans ns={"react:messages"} i18nKey={"PageSolicitedNotFound"} />
				</p>
				<button
					className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300'
					onClick={goBack}
				>
					<Trans ns={"attributes"} i18nKey={"Return"} />
				</button>
			</div>
		</div>
	);
};

export default Missing;
