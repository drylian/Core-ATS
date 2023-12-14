import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ContentBox from "../../../components/elements/ContentBox";
import BoxModel from "../../../components/elements/models/BoxModel";
import { store } from "../../../states";
import { useState } from "react";
import editAccount from "../../../axios/admin/accounts/editAccount";
import getAccount from "../../../axios/admin/accounts/getAccount";
import { useParams } from "react-router-dom";
import AdminMissing from "../../errors/admin/AdminMissing";
import { UserE } from "../../../states/admin/account";
import BlockedContent from "../../errors/admin/BlockedContent";
import Loading from "../../../components/elements/Loading";
import WarningContent from "../../errors/admin/WarningContent";

interface FormData {
	name: string;
	email: string;
	password: string;
	permissions: number;
	lang: string;
}

const validationSchema = Yup.object({
	name: Yup.string().required("Nome necessario"),
	email: Yup.string().email("Formato de e-mail inválido").required("Campo obrigatório"),
	password: Yup.string(),
	permissions: Yup.number().required("Permissão necessaria"),
	lang: Yup.string().required("Linguagem é obrigatório"),
});
/* eslint-disable  react/prop-types  */ //setValue do formik
/* eslint-disable  react/no-unescaped-entities */ // " dos span"
const EditAccount = () => {
	const { id } = useParams();
	console.log(id);
	if (!id) {
		return <AdminMissing />;
	}
	const userid = id;
	const website = store.getState().website.data;
	const user = store.getState().user.data;
	const [userData, setUserData] = useState<UserE | null>(null);
	const [selectedLang, setSelectedLang] = useState(""); // Defina um valor padrão
	const [password, setPassword] = useState("");
	const permissions = Math.floor(user?.permissions ?? 0) - 1000;
	const permissionOptions = Array.from(
		{ length: permissions <= 0 ? 0 : permissions / 1000 },
		(_, index) => (index + 1) * 1000,
	);

	const generatepass = () => {
		const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let pass = "";

		for (let i = 0; i < 8; i++) {
			const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
			pass += caracteres.charAt(indiceAleatorio);
		}

		setPassword(pass);
	};

	if (!userData) getAccount(id).then((data) => setUserData(data as UserE));
	if (!userData) return <Loading />;
	if (user && userData && user.permissions && userData.permissions && userData.permissions > user.permissions) {
		return <BlockedContent />;
	}

	const onSubmit = (values: FormData) => {
		editAccount(values, userid);
		// Lógica de envio dos dados, por exemplo, chamar uma API
	};

	const initialValues: FormData = {
		name: userData.username,
		email: userData.email,
		password: "",
		permissions: userData.permissions ?? 0,
		lang: userData.lang ?? "",
	};

	const setLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newLang = event.target.value;

		setSelectedLang(newLang);
		return newLang;
	};
	if (user && Number(id) === user.id) return <WarningContent title="Perfil Bloqueado" desc="Aviso de acesso bloqueado" message="Não é possivel editar seu proprio perfil na area administrativa, edite na area do client" />;

	return (
		<ContentBox title='Administração - Usuários - Editar usuário' desc="Administração - Usuários - Editar usuário" nofooter={true} header>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(props) => {
					return (
						<Form>
							<div className='flex flex-col sm:flex-row overflow-y-auto'>
								<div className='flex-1 p-1'>
									<BoxModel title='Informações'>
										<div className='mb-4'>
											<label htmlFor='name' className='block text-sm font-bold textpri'>
												Usuário
											</label>
											<Field
												type='text'
												id='name'
												name='name'
												className='mt-1 p-1 w-full corsec border rounded-md border-gray-500'
											/>
											<ErrorMessage
												name='name'
												component='div'
												className='text-red-500 text-xs mt-1'
											/>
											<p className="textter text-sm mt-1">Nome do usuário atual</p>
										</div>

										<div className='mb-4'>
											<label htmlFor='email' className='block text-sm font-bold textpri'>
												Email
											</label>
											<Field
												type='text'
												id='email'
												name='email'
												className='mt-1 p-1 w-full corsec border rounded-md border-gray-500'
											/>
											<ErrorMessage
												name='email'
												component='div'
												className='text-red-500 text-xs mt-1'
											/>
											<p className="textter text-sm mt-1">Email atual do usuário</p>
										</div>

										<div className='mb-4'>
											<label htmlFor='lang' className='block text-sm font-bold textpri'>
												Idioma
											</label>
											<div className='flex'>
												<Field
													as='select'
													id='lang'
													name='lang'
													value={selectedLang}
													onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
														const seleted = setLang(e);
														props.setFieldValue("lang", seleted);
													}}
													className='mt-1 p-1 w-full corsec border rounded-md border-gray-500'
												>
													{website &&
														website.langs.map((lang) => (
															<option key={lang} value={lang}>
																{website.languages[lang] || lang}
															</option>
														))}
												</Field>
											</div>
											<ErrorMessage
												name='lang'
												component='div'
												className='text-red-500 text-xs mt-1'
											/>
											<p className="textter text-sm mt-1">O Idioma que vai ser  usado nas respostas do backend e do frontend</p>

										</div>

										<button type='submit' className='corpri textpri border border-gray-500 px-4 py-2 rounded-md'>
											Enviar
										</button>
									</BoxModel>
								</div>

								<div className='flex-1 p-1'>
									<BoxModel title='Permissões'>
										<div className='mb-4 mt-1'>
											<label htmlFor='permissions' className='block text-sm font-bold textpri'>
												Nivel de permissão
											</label>
											<Field
												as='select'
												id='permissions'
												name='permissions'
												className='mt-1 p-1 w-full corsec border rounded-md border-gray-500'
											>
												<option disabled value='' label='Selecione o nivel de permissão' />
												{permissionOptions.map((value) => (
													<option key={value} value={value}>
														{value}
													</option>
												))}
											</Field>
											<ErrorMessage
												name='permissions'
												component='div'
												className='text-red-500 text-xs mt-1'
											/>
											<p className="textter text-sm mt-1">A permissão é o nivel de quanto acesso possue no painel, para um "client" deixe o valor
												padrão "1000" caso queira algum nivel administrativo coloque acima de
												"2000", o limite de permissão é limitado ao seu nivel administrativo.</p>
										</div>
									</BoxModel>
									<div className='mt-1'>
										<BoxModel title='Senha'>
											<div className='mb-4'>
												<label htmlFor='password' className='block text-sm font-bold textpri'>
													Senha
												</label>
												<div className='flex'>
													<Field
														type='text'
														id='password'
														name='password'
														value={password}
														onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
															setPassword(e.target.value);
														}}
														className='mt-1 p-1 w-full corsec border rounded-md border-gray-500'
													/>
													<button
														className='corpri textpri border border-gray-500 px-4 pb-1 pt-1 ml-1 rounded-md'
														onClick={(e) => {
															generatepass();
															props.setFieldValue("password", password);
															e.preventDefault();
														}}
													>
														Gerar
													</button>
												</div>
												<ErrorMessage
													name='password'
													component='div'
													className='text-red-500 text-xs mt-1'
												/>
												<p className="textter text-sm mt-1">Caso não queira atualizar a senha, basta deixar isso em branco, Uma senha de pelo menos 4 digitos, se possivel uma senha única e dificil, não "1234" ou "102030" etc.</p>
											</div>
										</BoxModel>
									</div>
								</div>
							</div>
						</Form>
					);
				}}
			</Formik>
		</ContentBox>
	);
};

export default EditAccount;
