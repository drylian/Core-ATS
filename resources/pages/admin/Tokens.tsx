import ContentBox from "../../components/elements/ContentBox";
import BoxModel from "../../components/elements/models/BoxModel";
import { useNavigate } from "react-router-dom";
import { TableModel } from "../../components/elements/models/TableModel";
import { useState } from "react";
import AllTokens, { TokenData } from "../../axios/admin/tokens";
import QueryModal from "../../components/elements/models/QueryModel";
import DialogBoxModel from "../../components/elements/models/DialogBoxModel";
import deleteToken from "../../axios/admin/tokens/deleteToken";

const Tokens = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [showDropdown, setShowDropdown] = useState<{ [key: string | number]: boolean }>({});
	const [show, setShow] = useState(false);
	const [data, setData] = useState<TokenData[] | null>(null);
	const navigate = useNavigate();
	function handleClick() {
		navigate("/admin/Tokens/new");
	}
	const DeleteToken = (id?: number | null) => {
		if (id) deleteToken(id).then(() => {
			if (data) {
				const newData = data.filter(objeto => objeto.id !== id)
				setData(newData)
			}

		}).catch((error) => {
			console.error(error as unknown);
		});
	};
	if (!data)
		AllTokens()
			.then((response) => {
				setData(response);
			})
			.catch((error) => {
				console.error(error as unknown);
			});
	return (
		<ContentBox title='Administração - Tokens de Acesso do painel'>
			<BoxModel
				title='Tokens'
				search={searchTerm}
				setSearch={setSearchTerm}
				desc='Gerenciador os tokens de acesso registrados no painel'
				onClick={handleClick}
				buttonSub='Criar Token'
				nopad={true}
			>
				<QueryModal data={data ?? []} search={searchTerm}>
					{({ query }: { query: TokenData[] | undefined }) => (
						<div>
							{query ? (
								<TableModel>
									<thead>

										<tr>
											<th>ID</th>
											<th>Identificação</th>
											<th>Token</th>
											<th>Permissão</th>
										</tr>
									</thead>
									<tbody>

										{query.map((token) => {
											if (token.id && showDropdown[token.id] === null) setShowDropdown({ [token.id]: false })
											return (
												<>
													{token.id ? (
														<tr key={token.id}>
															<td>{token.id}</td>
															<td>{token.memo}</td>
															<td>{token.token}...</td>
															<td>{token.permissions}</td>
															<td>
																<i
																	className='bx bx bxs-trash text-red-600'
																	onClick={() => {
																		setShow(true);
																	}}
																	style={{
																		cursor: "pointer",
																	}}
																/>
																<DialogBoxModel
																	key={token.id}
																	title="Deletar Token de Acesso?"
																	desc={`Tem certeza que deseja deletar o token de id ${token.id}?, isso é uma ação que não poderá voltar atrás.`}
																	show={show}
																	setShow={setShow}
																	accept={() => { DeleteToken(token.id) }}
																	decline={() => setShow(false)}
																/>
															</td>
														</tr>
													) : null}
												</>
											)
										})}
									</tbody>

								</TableModel>
							) : (
								<p>Nenhuma pessoa encontrada.</p>
							)}
						</div>
					)}
				</QueryModal>
			</BoxModel>
		</ContentBox>
	);
};

export default Tokens;
