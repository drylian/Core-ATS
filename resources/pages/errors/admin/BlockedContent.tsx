import ContentBox from "../../../components/elements/ContentBox";
import BoxModel from "../../../components/elements/models/BoxModel";

const BlockedContent = () => {
	return (
		<ContentBox title={"Admin - " + "Conteudo Bloqueado"}>
			<BoxModel title='Página não encontrada' desc='Recurso solicitado não foi encontrado'>
				<div className='container '>
					<div className='flex flex-col sm:flex-row justify-center items-center'>
						<i
							className={"bx bx-error-alt"}
							style={{ marginLeft: "-1px", color: "red", fontSize: "200px" }}
						/>
						<div className='flex-1 shadow-md'>
							<h1 className='text-2xl font-bold text-light-primary dark:text-dark-primary duration-300 mb-4'>Conteudo Bloqueado.</h1>
							<p className='mb-6 text-light-secondary dark:text-dark-secondary duration-300'>
                                Conteudo Bloqueado por ter uma permissão menor do que a necessaria.
							</p>
						</div>
					</div>
				</div>
			</BoxModel>
		</ContentBox>
	);
};

export default BlockedContent;
