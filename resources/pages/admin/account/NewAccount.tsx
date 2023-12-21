import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ContentBox from "../../../components/elements/ContentBox";
import BoxModel from "../../../components/elements/models/BoxModel";
import { store } from "../../../states";
import { useState } from "react";
import newAccount from "../../../axios/admin/accounts/newAccount";
interface FormData {
	name: string;
	email: string;
	password: string;
	permissions: string;
	lang: string;
}

const initialValues: FormData = {
	name: "",
	email: "",
	password: "",
	permissions: "",
	lang: "",
};

const validationSchema = Yup.object({
	name: Yup.string().min(3, "A senha precisa de pelo menos 3 caracteres").required("Nome necessario"),
	email: Yup.string().email("Formato de e-mail inválido").required("Campo obrigatório"),
	password: Yup.string().min(4, "A senha precisa de pelo menos 4 caracteres").required("Senha necessaria"),
	permissions: Yup.string().required("Permissão necessaria"),
	lang: Yup.string().required("Linguagem é obrigatório"),
});

const onSubmit = (values: FormData) => {
	newAccount(values);
	// Lógica de envio dos dados, por exemplo, chamar uma API
	console.log("Valores do formulário:", values);
};
/* eslint-disable  react/prop-types  */ //setValue do formik
/* eslint-disable  react/no-unescaped-entities */ // " dos span"
const NewAccount = () => {
	const website = store.getState().website.data;
	const user = store.getState().user.data;
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

	const setLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newLang = event.target.value;

		setSelectedLang(newLang);
		return newLang;
	};
	return (
		<ContentBox title='Administração - Usuários - Novo usuário' nofooter={true}>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(props) => {
					return (
						<Form>
							<div className='flex flex-col sm:flex-row overflow-y-auto'>
								<div className='flex-1 p-1'>
									<BoxModel title='Informações'>
										<div className='mb-4'>
											<label htmlFor='name' className='block text-sm font-bold text-light-primary dark:text-dark-primary duration-300'>
												Usuário
											</label>
											<Field
												type='text'
												id='name'
												name='name'
												className='mt-1 p-1 w-full bg-light-secondary dark:bg-dark-secondary duration-300 border rounded-md border-gray-500'
											/>
											<ErrorMessage
												name='name'
												component='div'
												className='text-red-500 text-xs mt-1'
											/>
											<p className="text-light-tertiary dark:text-dark-tertiary duration-300 text-sm mt-1">O nome do usuário, com pelo menos 3 digitos.</p>
										</div>

										<div className='mb-4'>
											<label htmlFor='email' className='block text-sm font-bold text-light-primary dark:text-dark-primary duration-300'>
												Email
											</label>
											<Field
												type='text'
												id='email'
												name='email'
												className='mt-1 p-1 w-full bg-light-secondary dark:bg-dark-secondary duration-300 border rounded-md border-gray-500'
											/>
											<ErrorMessage
												name='email'
												component='div'
												className='text-red-500 text-xs mt-1'
											/>
											<p className="text-light-tertiary dark:text-dark-tertiary duration-300 text-sm mt-1">Deve ser um email que ainda não foi usado no painel</p>
										</div>

										<div className='mb-4'>
											<label htmlFor='lang' className='block text-sm font-bold text-light-primary dark:text-dark-primary duration-300'>
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
													className='mt-1 p-1 w-full bg-light-secondary dark:bg-dark-secondary duration-300 border rounded-md border-gray-500'
												>
													<option disabled value='' label='Selecione a lingua do usuário' />
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
											<p className="text-light-tertiary dark:text-dark-tertiary duration-300 text-sm mt-1">O Idioma que vai ser  usado nas respostas do backend e do frontend</p>
										</div>

										<button type='submit' className='bg-light-primary dark:bg-dark-primary text-light-primary dark:text-dark-primary duration-300 border border-gray-500 px-4 py-2 rounded-md'>
											Enviar
										</button>
									</BoxModel>
								</div>

								<div className='flex-1 p-1'>
									<BoxModel title='Permissões'>
										<div className='mb-4 mt-1'>
											<label htmlFor='permissions' className='block text-sm font-bold text-light-primary dark:text-dark-primary duration-300'>
												Nivel de permissão
											</label>
											<Field
												as='select'
												id='permissions'
												name='permissions'
												className='mt-1 p-1 w-full bg-light-secondary dark:bg-dark-secondary duration-300 border rounded-md border-gray-500'
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
											<p className="text-light-tertiary dark:text-dark-tertiary duration-300 text-sm mt-1">A permissão é o nivel de quanto acesso possue no painel, para um "client" deixe o valor
												padrão "1000" caso queira algum nivel administrativo coloque acima de
												"2000", o limite de permissão é limitado ao seu nivel administrativo.</p>
										</div>
									</BoxModel>
									<div className='mt-1'>
										<BoxModel title='Senha'>
											<div className='mb-4'>
												<label htmlFor='password' className='block text-sm font-bold text-light-primary dark:text-dark-primary duration-300'>
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
														className='mt-1 p-1 w-full bg-light-secondary dark:bg-dark-secondary duration-300 border rounded-md border-gray-500'
													/>
													<button
														className='bg-light-primary dark:bg-dark-primary text-light-primary dark:text-dark-primary duration-300 border border-gray-500 px-4 pb-1 pt-1 ml-1 rounded-md'
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
												<p className="text-light-tertiary dark:text-dark-tertiary duration-300 text-sm mt-1">Uma senha de pelo menos 4 digitos, se possivel uma senha única e dificil, não "1234" ou "102030" etc.</p>

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

export default NewAccount;
