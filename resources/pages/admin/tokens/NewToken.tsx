import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ContentBox from "../../../components/elements/ContentBox";
import BoxModel from "../../../components/elements/models/BoxModel";
import { store } from "../../../states";
import { useState } from "react";
import newToken from "../../../axios/admin/tokens/newToken";
import FloatBoxModel from "../../../components/elements/models/FloatBoxModel";
import ClibBoardBox from "../../../components/elements/Clipboard";
interface FormData {
	memo: string;
	permissions: string;
	lang: string;
}

const initialValues: FormData = {
	memo: "",
	permissions: "",
	lang: "",
};

const validationSchema = Yup.object({
	memo: Yup.string().required("A Identificação é necessaria"),
	permissions: Yup.string().required("Permissão necessaria"),
	lang: Yup.string().required("Linguagem é necessaria"),
});

/* eslint-disable  react/prop-types  */ //setValue do formik
/* eslint-disable  react/no-unescaped-entities */ // " dos span"
const NewToken = () => {
	const website = store.getState().website.data;
	const user = store.getState().user.data;
	const [selectedLang, setSelectedLang] = useState(""); // Defina um valor padrão
	const [show, setShow] = useState(false); // Defina um valor padrão
	const [cliptext, setText] = useState("false"); // Defina um valor padrão

	const permissions = Math.floor(user?.permissions ?? 0) - 1000;
	const permissionOptions = Array.from(
		{ length: permissions <= 0 ? 0 : permissions / 1000 },
		(_, index) => (index + 1) * 1000,
	);

	const onSubmit = (values: FormData) => {
		newToken(values).then((response) => {
			setShow(true)
			setText(response.token)
		})
	};
	const setLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newLang = event.target.value;

		setSelectedLang(newLang);
		return newLang;
	};
	return (
		<ContentBox title='Administração - Usuários - Novo usuário' nofooter={true}>
			<FloatBoxModel show={show} setShow={setShow}>
				<p className="text-lg font-bold textpri mb-2">Token Criado com Sucesso</p>
				<div className='border-b border-gray-400 w-full mb-2' />

				<p className="text-sm mb-2 textter">Copie o token abaixo, pois ele não será mostrado completo novamente. Caso o perca, precisará gerar um novo token.</p>
				<ClibBoardBox text={cliptext} />
				<button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShow(false)}>
					Fechar
				</button>
			</FloatBoxModel>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(props) => {
					return (
						<Form>
							<div className='flex flex-col sm:flex-row overflow-y-auto'>
								<div className='flex-1 p-1'>
									<BoxModel title='Informações'>
										<div className='mb-4'>
											<label htmlFor='memo' className='block text-sm font-bold textpri'>
												Identificação
											</label>
											<Field
												type='text'
												id='memo'
												name='memo'
												className='mt-1 p-2 w-full border rounded-md'
											/>
											<ErrorMessage
												name='memo'
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

export default NewToken;
