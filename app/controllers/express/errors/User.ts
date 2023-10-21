import { UserE } from "@/models/User";

/**
 * Caso o usuário não tenha permissão
 */
export class UserPermissionError extends Error {
	user: UserE; // Substitua 'any' pelo tipo apropriado do usuário

	constructor(user: UserE, message: string) {
		super(message);
		this.name = "UserPermissionError";
		this.user = user;
	}
}

/**
 * Caso o usuário não esteja logado
 */
export class UserNotLogged extends Error {
	constructor(message: string) {
		super(message);
		this.name = "UserNotLogged";
	}
}