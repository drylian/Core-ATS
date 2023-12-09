import { useState, useEffect } from "react";
import ContentBox from "../../components/elements/ContentBox";
import BoxModel from "../../components/elements/models/BoxModel";
import activity from "../../axios/admin/activity";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface AdminActivity {
    username: string | undefined;
    action: string;
    ip: string | undefined;
    create_at: Date | undefined;
}

const AdminActivitys = () => {
	const [data, setData] = useState<AdminActivity[] | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const resultsPerPage = 10;

	const handleClick = () => {
		activity()
			.then((response) => {
				setData(response);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		if (!data) handleClick();
	}, [data]);

	// Função para obter os resultados da página atual
	const getCurrentPageResults = (): AdminActivity[] => {
		const startIndex = (currentPage - 1) * resultsPerPage;
		const endIndex = startIndex + resultsPerPage;
		return data ? data.slice(startIndex, endIndex) : [];
	};

	// Calcular o número total de páginas
	const totalPages = data ? Math.ceil(data.length / resultsPerPage) : 0;

	return (
		<ContentBox title='Administração - Registros do painel'>
			<BoxModel
				title='Registros do painel'
				desc='Informa os registros da administração do painel'
				onClick={handleClick}
				buttonSub='Refresh'
			>
				{data ? (
					<>
						{getCurrentPageResults().map((item, index) => (
							<div
								key={index}
								className='rounded-lg overflow-hidden shadow-md bg-white bg-opacity-10 m-4 p-4'
							>
								<p className='text-lg font-bold mb-2'>Responsável: {item.username}</p>
								<p className='mb-1 font-bold '>
                                    Ação feita: <span>{item.action}</span>
								</p>
								<div className='flex justify-between items-start'>
									<p className='mb-1 '>IP: {item.ip}</p>
									<p className='mb-1 '>
										{item.create_at
											? format(new Date(item.create_at), "'dia' d 'de' MMMM yyyy', às' HH:mm", {
												locale: ptBR,
											})
											: "desconhecido"}
									</p>
								</div>
							</div>
						))}
						{/* Adicione controles de paginação */}
						<div className='flex justify-between items-center mt-4'>
							<div>
								<button
									onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
									disabled={currentPage === 1}
									className='px-2 py-1 bg-blue-500 text-white rounded-md'
								>
                                    Anterior
								</button>
								<span className='mx-2'>
                                    Página {currentPage} de {totalPages}
								</span>
								<button
									onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
									disabled={
										getCurrentPageResults().length < resultsPerPage || currentPage === totalPages
									}
									className='px-2 py-1 bg-blue-500 text-white rounded-md'
								>
                                    Próxima
								</button>
							</div>
						</div>
					</>
				) : (
					<p className='text-gray-500'>Nenhum dado disponível</p>
				)}
			</BoxModel>
		</ContentBox>
	);
};

export default AdminActivitys;
