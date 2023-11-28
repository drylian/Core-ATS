import React, { useState } from "react";
import LoginForm from "./Formulary";
import Trans from "../../../components/elements/Trans";
import { store } from "../../../states";
import i18n from "../../../i18n";

const LoginContainer: React.FC = () => {
	const website = store.getState().website.data;
	const [selectedLang, setSelectedLang] = useState(i18n.language); // Defina um valor padrão

	const handleLangChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newLang = event.target.value;
		setSelectedLang(newLang);
		// Agora, use o novo valor de selectedLang
		await i18n.changeLanguage(newLang);

		// Recarrega os recursos de tradução
		await i18n.reloadResources();
	};

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='bg-white p-4 rounded mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<img className='mx-auto h-12 w-auto' src='/img/favicon.png' alt='Logo' />
					<h2 className='mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
						{website && website.title}
						{" - "}
						<Trans ns='react:auth' i18nKey={"LoginTitle"} />
					</h2>
				</div>
				<div className='mt-2' />
				<div className='flex items-center'>
					{/* Box no canto superior direito */}
					<div className='flex items-center'>
						{/* Seletor de Idioma */}
						<div className='mb-2 mr-4'>
							<select
								id='langSelector'
								name='langSelector'
								value={selectedLang}
								onChange={handleLangChange}
								className='block w-24 p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm'
							>
								{website &&
                                    website.langs.map((lang) => (
                                    	<option key={lang} value={lang}>
                                    		{website.languages[lang] || lang}
                                    	</option>
                                    ))}
							</select>
						</div>
						{/* Fim do Seletor de Idioma */}
					</div>
					<div className='border-b border-gray-400 w-full' style={{ marginTop: "-10px" }} />
				</div>
				<LoginForm />
				<div className='mt-2 border-b border-gray-400 w-full' />

				<p className='mt-2 text-center text-sm text-gray-500'>
					<Trans ns='react:auth' i18nKey={"NotRegistred"} />{" "}
					<a href='/auth/register' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
						<Trans ns='react:auth' i18nKey={"MakeRegister"} />
					</a>
				</p>
			</div>
		</div>
	);
};

export default LoginContainer;
