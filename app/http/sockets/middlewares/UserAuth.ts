import storage from "@/controllers/Storage";
import { SettingsJson } from "@/interfaces";
import { UserE } from "@/models/User";
import { ALTdcp } from "@/utils";
import { Socket, ExtendedError } from "socket.io";
/**
 * Middleware de Data do Socket
 * @param socket 
 * @param next 
 * @returns 
 */
export default function SocketUserLoad(socket: Socket, next: (err?: ExtendedError | undefined) => void) {
    const { authorization } = socket.handshake.auth;
    const config: SettingsJson = storage.get("settings")

    if (authorization) {
        try {
            socket.access = { user: ALTdcp<{data:UserE}>(authorization, config.server.socketSignature).data };
            return next();
        } catch (e) {
            return next(new Error("Invalid SocketToken"))
        }
    }
}
