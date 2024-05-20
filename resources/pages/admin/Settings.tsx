import { useState } from "react";
import ContentBox from "../../components/elements/ContentBox";
import SquareModel from "../../components/elements/models/SquareModel";
import application, { AppConfig } from "../../axios/admin/application";
import ping from "../../axios/ping";
import { store } from "../../states";
import Box from "../../components/elements/Box";
import BoxNavbar from "../../components/elements/models/BoxNavbar";
import SocketConnect from "../../Socket";

const Settings = () => {
	const links = [
		{
			link: "/admin/settings",
			title: "Geral"
		},
		{
			link: "/admin/settings/mail",
			title: "Email"
		}
	];
	const [uptime, setUptime] = useState<{ server?: string, discord?: string }>();
	const [server, setServer] = useState<AppConfig | null>(null);

	const [pings, setPings] = useState<{ server: number, client: number, discord?: number } | null>(null);
	const [socketConnect, socketSetConnect] = useState(false)
	const website = store.getState().website.data

	if (!socketConnect) {
		const socket = store.getState().socket.socket
		if (socket) {

			socket.on("uptime", (data) => {
				if (data) {
					setUptime(data);
				}
			});
		}
	}
	const GetServer = async () => {
		application()
			.then((response) => {
				setServer(response);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	const GetPing = async () => {
		ping()
			.then((response) => {

				setPings(response);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	if (!server) GetServer();

	if (!pings) GetPing()

	return (
		<>
			<BoxNavbar links={links} />
			<ContentBox title='Administração - Painel de Controle'>
				<div className="flex flex-col sm:flex-row">
					<div className="flex-grow">
						<Box.base title="Configurações Gerais" desc="Configurações gerais do painel">
							<Box.subtitle title="Configurações de Registro" icon="bx bx-user-plus" active>
								<Box.info title="Registro pelo Painel" icon="bx bx-mail-send" value={website?.auth.register} />
								<Box.info title="Registro pelo Discord" icon="bx bxl-discord-alt" iconName="text-blue-800" value={website?.auth.discord} />
							</Box.subtitle>
							<Box.subtitle title="Configurações do Sistema" icon="bx bx-cog">
								<Box.info title="Segurança Cors" icon="bx bx-check-shield" value={server?.cors} />
								<Box.info title="Sistema de Email" icon="bx bx-mail-send" value={server?.smtp} />
								<Box.info title="Sistema iniciado em" icon={server?.modetype === "Typescript" ? "bx bxl-typescript" : "bx bxl-javascript"} value={server?.modetype !== undefined ? server.modetype.toString() : null} />
								<Box.info title="Versão do sistema" icon="bx bxs-chip" value={server?.version !== undefined ? server.version.toString() : null} />
							</Box.subtitle>
							<Box.subtitle title="Latencias do painel" icon="bx bx-signal-5" iconName="text-green-500">
								<Box.info title="Ping do servidor" icon="bx bx-vertical-bottom" value={pings?.server && pings?.server + "ms"} />
								<Box.info title="Ping do local" icon="bx bx-vertical-top" value={pings?.client && pings?.client + "ms"} />
								{pings?.discord && <Box.info title="Ping discord API" icon="bx bxl-discord-alt" iconName="text-blue-800" value={pings?.discord && pings?.discord + "ms"} />}
							</Box.subtitle>
						</Box.base>
					</div>
					<div className="flex-grow">
						<SquareModel icon='bx bx-timer' title='Uptime do Painel' value={uptime?.server} />
						{uptime?.discord && <SquareModel icon='bx bx-timer' className="text-blue-800" title='Uptime do Discord' value={uptime?.discord} />}
					</div>
				</div>

				<div className='flex flex-col sm:flex-row overflow-y-auto'>
					<SquareModel icon='bx bxs-user-account' title='Usuários Criados' value={`${server?.users}`} />
					<SquareModel icon='bx bx-network-chart' title='Tokens Criados' value={`${server?.tokens}`} />
				</div>
			</ContentBox>
		</>
	);
};

export default Settings;
