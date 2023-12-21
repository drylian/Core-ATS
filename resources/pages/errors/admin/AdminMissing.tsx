import ContentBox from "../../../components/elements/ContentBox";
import Trans, { trans } from "../../../components/elements/Trans";
import BoxModel from "../../../components/elements/models/BoxModel";

const AdminMissing = () => {
	return (
		<ContentBox title={"Admin - " + trans("react:messages").t("PageNotFound")}>
			<BoxModel title='Página não encontrada' desc='Recurso solicitado não foi encontrado'>
				<div className='container '>
					<div className='flex flex-col sm:flex-row justify-center items-center'>
						<i
							className={"bx bx-error-alt"}
							style={{ marginLeft: "-1px", color: "red", fontSize: "200px" }}
						/>
						<div className='flex-1 shadow-md'>
							<h1 className='text-2xl font-bold text-light-primary dark:text-dark-primary duration-300 mb-4'>
								<Trans ns={"react:messages"} i18nKey={"PageNotFound"} />
							</h1>
							<p className='mb-6 text-light-secondary dark:text-dark-secondary duration-300'>
								<Trans ns={"react:messages"} i18nKey={"PageSolicitedNotFound"} />
							</p>
						</div>
					</div>
				</div>
			</BoxModel>
		</ContentBox>
	);
};

export default AdminMissing;
