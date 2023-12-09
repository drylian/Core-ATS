import ContentBox from "../../components/elements/ContentBox";
import BoxModel from "../../components/elements/models/BoxModel";
import { Link, useNavigate } from "react-router-dom";
import { TableModel } from "../../components/elements/models/TableModel";
import { useState } from "react";
import accounts from "../../axios/admin/accounts";
import { UserE } from "../../states/admin/account";
import QueryModal from "../../components/elements/models/QueryModel";

const Accounts = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const [data, setData] = useState<UserE[] | null>(null);
	const navigate = useNavigate();
	function handleClick() {
		navigate("/admin/accounts/new");
	}
	if (!data)
		accounts()
			.then((response) => {
				setData(response);
			})
			.catch((error) => {
				console.error(error as unknown);
			});
	return (
		<ContentBox title='Administração - Usuários do painel'>
			<BoxModel
				title='Usuários'
				search={searchTerm}
				setSearch={setSearchTerm}
				desc='Gerenciador os usuários registrados no painel'
				onClick={handleClick}
				buttonSub='Criar Conta'
				nopad={true}
				color='rgb'
			>
				<QueryModal data={data ?? []} search={searchTerm}>
					{({ query }: { query: UserE[] | undefined }) => (
						<div>
							{query ? (
								<TableModel>
									<tr>
										<th>ID</th>
										{window.innerWidth > 768 ? <th>E-mail</th> : null}
										<th>Nome</th>
										<th>Permissão</th>
										<th>Status</th>
									</tr>
									{query.map((user) => (
										<>
											{user.id ? (
												<tr key={user.id}>
													<td>{user.id}</td>
													{window.innerWidth > 768 ? <td>{user.email}</td> : null}
													<td>{user.username}</td>
													<td>{user.permissions}</td>
													<td>{user.suspended ? "Suspenso" : "Ativo"}</td>
													<td>
														<Link to={`/admin/accounts/${user.id}/edit`}>
															<i
																className='bx bx-dots-vertical-rounded textpri'
																style={{
																	cursor: "pointer",
																}}
															></i>
														</Link>
													</td>
												</tr>
											) : null}
										</>
									))}
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

export default Accounts;
