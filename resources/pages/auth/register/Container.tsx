import React, { useState } from "react";
import RegisterForm from "./Formulary";
import Trans from "../../../components/elements/Trans";
import { store } from "../../../states";
import i18n from "../../../i18n";
import LightSwitches from "../../../components/Themechanger";
import DiscordChecker from "../../../axios/auth/discord";
import { Link } from "react-router-dom";

const RegisterContainer: React.FC = () => {
	const website = store.getState().website.data;
	const [selectedLang, setSelectedLang] = useState(i18n.language); // Defina um valor padrão
	const [discord, setDiscord] = useState<{ active: boolean, redirect?: string, message?: string; }>()

	const handleLangChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newLang = event.target.value;
		setSelectedLang(newLang);
		// Agora, use o novo valor de selectedLang
		await i18n.changeLanguage(newLang);

		// Recarrega os recursos de tradução
		await i18n.reloadResources();
	};
	const DiscordHandle = () => {
		DiscordChecker()
			.then((response) => {
				setDiscord(response)
			})
			.catch((error) => {
				console.error(error as unknown);
			});
	};
	if (!discord) DiscordHandle()
	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='bg-light-primary dark:bg-dark-primary p-4 rounded mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<img className='mx-auto h-12 w-auto' src='/img/favicon.png' alt='Logo' />
					<h2 className='mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-light-primary dark:text-dark-primary  duration-300'>
						{website && website.title}
						{" - "}
						<Trans ns='react:auth' i18nKey={"RegisterTitle"} />
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
								className='mt-1 p-1 w-full bg-light-secondary dark:bg-dark-secondary duration-300 border rounded-md border-gray-500'
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
					<div style={{marginTop:"-10px", marginLeft:"-20px"}}>
					<LightSwitches />
					</div>
					<div className='border-b border-gray-400 w-full' style={{ marginTop: "-10px" }} />
				</div>
				<RegisterForm />
				<div className="flex items-center mt-1">
					<div className='mt-2 border-b border-gray-400 w-full mr-1' style={{ marginTop: "-2.5px" }} /><Trans ns='react:auth' i18nKey={"Alternative"} /><div className='ml-1 mt-2 border-b border-gray-400 w-full' style={{ marginTop: "-2.5px" }} />
				</div>
				<div className="mx-auto max-w-2xl p-1 md:rounded-lg shadow-md justify-center flex items-center">
					<Link className="w-12 h-12 flex items-center justify-center border-2 border-light-secondary dark:border-dark-secondary duration-300 rounded-full" to="/auth/login">
						<i className="bx bxs-user text-light-primary dark:text-dark-primary duration-300" style={{ fontSize: '25px' }} />
					</Link>
					{discord?.active &&
						<Link className="ml-2 w-12 h-12 flex items-center justify-center border-2 border-light-secondary dark:border-dark-secondary duration-300 rounded-full" to={`${discord?.redirect}`}>
							<i className="bx bxl-discord-alt text-blue-800 duration-300" style={{ fontSize: '30px' }} />
						</Link>}
				</div>
			</div>
		</div>
	);
};

export default RegisterContainer;
