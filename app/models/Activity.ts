/**
 * @module Activity
 * @description Este módulo define o modelo de "Activity" usando Sequelize.
 * Representa as propriedades e configurações do modelo "Activity".
 */

import sequelize from "@/controllers/sequelize/Connect";
import { DataTypes, Model } from "sequelize";

/**
 * @interface ActivityI
 * @description Interface que descreve a estrutura do modelo "Activity" no sequelize.
 *
 * @property {number} id - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {string} action - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {string} username - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {string} ip - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {DATE} create_at - Não foi encontrado um "comment" sobre oque é essa propriedade
 *
 */

export type ActivityI = {
	id?: number | null;
	identification: string;
	identity:string;
	type: "user" | "client" | "authorization" | "guest"| "system" | "administration";
	action: string;
	path?: string;
	ip?: string;
	requested: "success" | "error";
	createdAt?: string;
	admin?:boolean
};
/**
 * @class Activity
 * @description Classe que representa o modelo de "Activity" no banco de dados.
 * Define as propriedades do modelo "Activity" e sua relação com o banco de dados.
 *
 */
class Activity extends Model<ActivityI> implements ActivityI {
	public id?: number | null;
	public identification!: string;
	public identity!: string;
	public type!: "user" | "client" | "authorization" | "guest" | "system";
	public action!: string;
	public path?: string;
	public ip?: string;
	public requested!: "success" | "error"
	public createdAt?: string;
	public admin?:boolean;

}

/**
 * @description Inicializa o modelo "Activity" com as definições de colunas e configurações.
 *
 */
Activity.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		identification: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		identity: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		action: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ip: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false,
		}, 
		requested: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		admin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		}
	},
	{
		sequelize, // sequelize configurado
		modelName: "Activity", // sequelize configurado
		tableName: "activitys", // Tabela do banco de dados (sempre em letras minúsculas).
	}
);


/**
 * @typedef ActivityType
 * @description Tipo que representa o modelo "Activity". Pode ser usado em situações em que não é desejável mostrar a estrutura interna do "Activity", apenas seus parâmetros.
 *
 */
export type ActivityType = typeof Activity;
export default Activity;
