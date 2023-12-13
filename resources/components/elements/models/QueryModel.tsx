import { ReactNode, useState, useEffect } from "react";

interface QueryModalProps<T> {
	data: T[] | undefined;
	search: string;
	limit?: number;
	children: (props: { query: T[] }) => ReactNode;
}
/**
 * Este é um componente React chamado QueryModal que recebe um tipo genérico T
 *  e props que incluem dados (data), termo de pesquisa (search), limite (limit),
 *  e uma função de renderização de children.
 */

const QueryModal = <T,>({ data, search, children, limit = 10 }: QueryModalProps<T>) => {
	// Estados para gerenciar o estado da query, a página atual, a ativação do filtro,
	// a lista de resultados filtrados e os dados originais.
	const [query, setQuery] = useState<T[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [activefilter, setActivefilter] = useState(false);
	const [queryed, setQueryed] = useState<T[]>([]);
	const resultsPerPage = limit;

	// Efeito colateral para atualizar a query com base nos dados, termo de pesquisa e página atual.
	useEffect(() => {
		if (data) {
			const filteredData = data.filter((item) =>
				JSON.stringify(item).toLowerCase().includes(search.toLowerCase()),
			);
			if (queryed.length === (data as object[]).length && activefilter) setCurrentPage(1);
			setActivefilter(search !== "" && filteredData.length > 0);
			setQueryed(filteredData);
			const startIndex = (currentPage - 1) * resultsPerPage;
			const endIndex = startIndex + resultsPerPage;
			setQuery(filteredData.slice(startIndex, endIndex));
		}
	}, [data, search, currentPage]);

	// Cálculo do número total de páginas com base nos resultados por página e na lista filtrada.
	const totalPages = !activefilter
		? Math.ceil((data as object[]).length / resultsPerPage)
		: Math.ceil(queryed.length / resultsPerPage);

	return (
		<>
			{query.length !== 0 ? (
				<>
					{children({ query })}

					{totalPages !== 1 && totalPages !== 0 ? (
						// Controles de navegação da página, exibidos apenas se houver mais de uma página.
						<ul className='flex-1 list-style-none flex p-2 items-center justify-center'>
							{totalPages !== 1 && currentPage !== 1 && (
								<button
									onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
									disabled={currentPage === 1}
									className='relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
								>
									Anterior
								</button>
							)}
							{queryed.length !== (data as object[]).length ? (
								<>
									<span className='relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-white transition-all duration-300'>
										{queryed.length} resultados encontrados, Página {currentPage} de {totalPages}
									</span>
								</>
							) : (
								<>
									<span className='relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-white transition-all duration-300'>
										Página {currentPage} de {totalPages}
									</span>
								</>
							)}
							{totalPages > currentPage && (
								<button
									onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
									disabled={currentPage === totalPages}
									className='relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
								>
									Próxima
								</button>
							)}
						</ul>
					) : (
						<>
							{queryed.length !== (data as object[]).length && (
								<>
									<div className='flex p-2 w-full items-center justify-center'>
										<span className='relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-white transition-all duration-300'>
											{queryed.length} resultado{queryed.length > 1 ? "s" : ""} encontrado
											{queryed.length > 1 ? "s" : ""}
										</span>
									</div>
								</>
							)}
						</>
					)}
				</>
			) : (
				// Exibido quando não há resultados correspondentes.
				<div className='flex p-2 w-full items-center justify-center'>
					<span className='relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-white transition-all duration-300'>
						Nenhum Resultado encontrado com as informações de {(data as object[]).length} dados
					</span>
				</div>
			)}

		</>
	);
};

export default QueryModal;
