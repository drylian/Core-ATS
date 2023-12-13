import ContentBox from "../../components/elements/ContentBox";
import BoxModel from "../../components/elements/models/BoxModel";
import { Link, useNavigate } from "react-router-dom";
import { TableModel } from "../../components/elements/models/TableModel";
import { useState } from "react";
import accounts from "../../axios/admin/accounts";
import { UserE } from "../../states/admin/account";
import QueryModal from "../../components/elements/models/QueryModel";
import DialogBoxModel from "../../components/elements/models/DialogBoxModel";
import deleteAccount from "../../axios/admin/accounts/deleteAccount";
import { store } from "../../states";

const Accounts = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [showDropdown, setShowDropdown] = useState<{ [key: string | number]: boolean }>({});
	const [show, setShow] = useState(false);

	const User = store.getState().user.data
	const [data, setData] = useState<UserE[] | null>(null);

	const toggleDropdown = (id?: number | null) => {
		if (id) setShowDropdown({ [id]: !showDropdown[id] });
	};
	const DeleteAccount = (id?: number | null) => {
		if (id) deleteAccount(id).then(() => {
			if (data) {
				const newData = data.filter(objeto => objeto.id !== id)
				setData(newData)
			}

		}).catch((error) => {
			console.error(error as unknown);
		});
	};
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
			>
				<QueryModal data={data ?? []} search={searchTerm}>
					{({ query }: { query: UserE[] | undefined }) => (
						<div>
							{query ? (
								<TableModel>
									<thead>
										<tr>
											<th>ID</th>
											<th>E-mail</th>
											<th>Nome</th>
											<th>Permissão</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody>

										{query.map((user) => {
											if (user.id && showDropdown[user.id] === null) setShowDropdown({ [user.id]: false })
											return (
												<>
													{user.id ? (
														<tr key={user.id}>
															<td>{user.id}</td>
															{window.innerWidth > 768 ? <td>{user.email}</td> : <td>{(user.email.substring(0, 15))}...</td>}
															<td>{user.username}</td>
															<td>{user.permissions}</td>
															<td>{user.suspended ? "Suspenso" : "Ativo"}</td>
															<td>
																{User && user.id !== User.id ? <i
																	className='bx bx-dots-vertical-rounded textpri'
																	onClick={() => {
																		toggleDropdown(user.id);
																	}}
																	style={{
																		cursor: "pointer",
																	}}
																></i> : <i
																	className='bx bx-dots-vertical-rounded textter'
																></i>}
																{User && user.id !== User.id && <div className={`absolute duration-200 right-0 mt-2 origin-top corter textpri border border-gray-300 rounded-lg shadow-md ${showDropdown[user.id] === true ? "" : "scale-0"}`}>
																	<Link
																		to={`/admin/accounts/${user.id}/edit`}
																		onClick={() => {
																			toggleDropdown(user.id);
																		}}
																		className='flex space-x-2 items-center px-4 py-2 w-full text-left hover:bg-gray-200 rounded-lg'
																	>
																		<i className='bx bxs-cog'></i>{" "}
																		<span>
																			Editar usuário
																		</span>
																	</Link>
																	<button
																		onClick={() => {
																			toggleDropdown(user.id);
																			setShow(true);
																		}}
																		className='flex space-x-2 items-center px-4 py-2 w-full text-left hover:bg-gray-200 rounded-lg'
																	>
																		<i className='bx bxs-exit'></i>{" "}
																		<span>
																			Deletar Usuário
																		</span>
																	</button>
																</div>}
																<DialogBoxModel
																	key={user.id}
																	title="Deletar Usuário?"
																	desc={`Tem certeza que deseja deletar o usuário ${user.email}?, isso é uma ação que não poderá voltar atrás.`}
																	show={show}
																	setShow={setShow}
																	accept={() => { DeleteAccount(user.id) }}
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

export default Accounts;
