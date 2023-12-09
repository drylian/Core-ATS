import { useState } from "react";
import socketIOClient from "socket.io-client";
import ContentBox from "../../components/elements/ContentBox";
import BoxModel from "../../components/elements/models/BoxModel";
import SquareModel from "../../components/elements/models/SquareModel";
import application, { AppConfig } from "../../axios/admin/application";

const Home = () => {
	const [uptime, setUptime] = useState("Carregando...");
	const [server, setServer] = useState<AppConfig | null>(null);
	const socket = socketIOClient();
	socket.on("uptime", (data) => {
		setUptime(data.uptime);
	});
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
		<ContentBox title='Administração - Painel de Controle'>
			<BoxModel
				title='Informações do painel'
				desc='Informa as configurações ativas no painel'
				onClick={handleClick}
				buttonSub='Refresh'
			>
                Painel rodando na versão{" "}
				<p className='text-blue-500 font-bold inline-block'>
					{server?.version !== undefined ? `"${server.version.toString()}"` : "Carregando..."}
				</p>
			</BoxModel>

			<div className='flex flex-col sm:flex-row p-3 overflow-y-auto'>
				<SquareModel icon='bx bx-timer' title='Uptime do Painel' value={`${uptime}`} />
				<SquareModel
					icon='bx bx-group'
					title='Usuários'
					value={server?.users !== undefined ? server.users.toString() : "Carregando..."}
				/>
				<SquareModel
					icon='bx bx-network-chart'
					title='Tokens'
					value={server?.tokens !== undefined ? server.tokens.toString() : "Carregando..."}
				/>
			</div>
			<div className='flex flex-col sm:flex-row p-3 overflow-y-auto'>
				<SquareModel
					icon={server?.modetype === "Typescript" ? "bx bxl-typescript" : "bx bxl-javascript"}
					title='Sistema iniciado com'
					value={server?.modetype !== undefined ? server.modetype.toString() : "Carregando..."}
				/>
				<SquareModel icon='bx bx-check-shield' title='Segurança Cors' active={server?.cors} />
				<SquareModel icon='bx bx-mail-send' title='Sistema de Emails' active={server?.smtp} />
			</div>
		</ContentBox>
	);
};

export default Home;
