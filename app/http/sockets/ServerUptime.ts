import dis from "@/controllers/Discord";
import { Socket } from "socket.io";
function uptimeCalc(uptime: number) {
	const uptimeInSeconds = uptime;
	const days = Math.floor(uptimeInSeconds / 86400);
	const hours = Math.floor(uptimeInSeconds / 3600) % 24;
	const minutes = Math.floor(uptimeInSeconds / 60) % 60;
	const seconds = Math.floor(uptimeInSeconds) % 60;

	return `${days > 0 ? days + "d " : ""}${hours > 0 ? hours + "h " : ""}${minutes > 0 ? minutes + "m " : ""
		}${seconds > 0 ? seconds + "s " : "0s"}`;

}
export default function ServerUptime(socket: Socket) {
	function updateUptime() {
		let discord = undefined;
		if (dis.client.isReady()) {
			discord = uptimeCalc(dis.client.uptime / 1000);
		}

		const server = uptimeCalc(process.uptime());

		socket.emit("uptime", {
			server: server,
			discord: discord
		});

		setTimeout(updateUptime, 1000);
	}
	/**
	 * Limita o acesso para apenas admins
	 */
	if (socket?.access?.user && socket.access.user.permissions && socket.access.user.permissions >= 2000) {
		updateUptime();
	}
}
