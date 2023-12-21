import { useState } from "react";
import socketIOClient from "socket.io-client";
import ContentBox from "../../components/elements/ContentBox";
import BoxModel from "../../components/elements/models/BoxModel";
import application, { AppConfig } from "../../axios/admin/application";

const Settings = () => {
	const [server, setServer] = useState<AppConfig | null>(null);
	const socket = socketIOClient();

	const handleClick = () => {
		application()
			.then((response) => {
				setServer(response);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	if (!server) handleClick();

	return (
		<ContentBox title='Administração - Configurações do Painel'>
			<BoxModel
				title='Configurações do Painel'
				desc='Gerencia as configurações no painel'
			>
                Painel rodando na versão{" "}
				<p className='text-blue-500 font-bold inline-block'>
					{server?.version !== undefined ? `"${server.version.toString()}"` : "Carregando..."}
				</p>
			</BoxModel>
		</ContentBox>
	);
};

export default Settings;
