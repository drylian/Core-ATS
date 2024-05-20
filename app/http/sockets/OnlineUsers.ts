import { Socket } from "socket.io";

let OnlineUsers: string[] = []
export default function OnlineUsersSystem(socket: Socket) {
    if (socket.access && !OnlineUsers.includes(socket.access.user.email)) {
        OnlineUsers.push(socket.access.user.email);
        socket.emit('OnlineUsers', OnlineUsers);
    }
    socket.on('disconnect', () => {
        if (socket.access) OnlineUsers = OnlineUsers.filter((user) => user !== socket.access.user.email);
        if (socket.access) socket.emit('OnlineUsers', OnlineUsers);
    });

}
