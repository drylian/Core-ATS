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
	name: Yup.string().required("Nome necessario"),
	email: Yup.string().email("Formato de e-mail inválido").required("Campo obrigatório"),
	password: Yup.string().required("Senha necessaria"),
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
											<label htmlFor='name' className='block text-sm font-bold textpri'>
                                                Usuário
											</label>
											<Field
												type='text'
												id='name'
												name='name'
												className='mt-1 p-2 w-full border rounded-md'
											/>
											<ErrorMessage
												name='name'
												component='div'
												className='text-red-500 text-xs mt-1'
											/>
										</div>

										<div className='mb-4'>
											<label htmlFor='email' className='block text-sm font-bold textpri'>
                                                Email
											</label>
											<Field
												type='text'
												id='email'
												name='email'
												className='mt-1 p-2 w-full border rounded-md'
											/>
											<ErrorMessage
												name='email'
												component='div'
												className='text-red-500 text-xs mt-1'
											/>
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
													className='mt-1 p-2 w-full border rounded-md'
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
										</div>

										<button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>
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
												className='mt-1 p-2 w-full border rounded-md'
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
														className='mt-1 p-2 w-full border rounded-md'
													/>
													<button
														className='bg-blue-500 text-white px-4 py-2 rounded-md ml-1'
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
											</div>
										</BoxModel>
									</div>
								</div>
							</div>
							<div className='mt-1'>
								<BoxModel title='Aviso sobre as permissôes' color='red' nopad={true}>
									{/* <i className={`bx bx-error ml-1 mr-1`} style={{ color: "white", fontSize: '20px', }} /> */}
									<div className='bg-red-500 rounded p-2'>
										<span className='textpri font-semibold'>
                                            A permissão é o nivel do usuário , para um usuário padrão deixe o valor
                                            padrão "1000" caso queira algum nivel administrativo coloque acima de
                                            "2000", o limite de permissão é limitado ao seu nivel administrativo.
										</span>
									</div>
								</BoxModel>
							</div>
						</Form>
					);
				}}
			</Formik>
		</ContentBox>
	);
};

export default NewAccount;
