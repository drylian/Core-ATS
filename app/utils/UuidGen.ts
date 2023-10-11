
import { v4 as uuidv4, v5 as uuidv5, NIL as nilUUID, V4Options } from "uuid";
import { json } from "utils/Json";
import configuractions from "controllers/settings/Default";

// Gera um UUID v4 aleatorío
export function genv4() {
	return uuidv4();
}

// Gera um UUID v5 baseado em um namespace e um nome
export function genv5(name: string, type: string) {
	const set = json(configuractions.configPATH + "/settings.json");
	return uuidv5(name, set.namespaces[type]);
}

export function nill() { return nilUUID; }