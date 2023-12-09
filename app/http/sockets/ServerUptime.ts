import { Socket } from "socket.io";

export default function ServerUptime(socket: Socket) {
	setInterval(function () {
		// Uptime Count
		const uptimeInSeconds = process.uptime();
		const days = Math.floor(uptimeInSeconds / 86400);
		const hours = Math.floor(uptimeInSeconds / 3600) % 24;
		const minutes = Math.floor(uptimeInSeconds / 60) % 60;
		const seconds = Math.floor(uptimeInSeconds) % 60;

		const processUptime = `${days > 0 ? days + "d " : ""}${hours > 0 ? hours + "h " : ""}${
			minutes > 0 ? minutes + "m " : ""
		}${seconds > 0 ? seconds + "s " : "0s"}`;

		// Emitir contagem para o navegador
		socket.emit("uptime", { uptime: processUptime });
	}, 1000);
}
