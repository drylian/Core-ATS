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
export interface ActivityI {
    id?: number | null;
    useruuid?: string;
    action: string;
    username?: string;
    ip?: string;
    createdAt?: string | null;
}

/**
 * @class Activity
 * @description Classe que representa o modelo de "Activity" no banco de dados.
 * Define as propriedades do modelo "Activity" e sua relação com o banco de dados.
 *
 */
class Activity extends Model<ActivityI> implements ActivityI {
	public id?: number | null;
	public useruuid?: string;
	public action!: string;
	public username?: string;
	public ip?: string;
	public createdAt?: string;
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
		useruuid: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		action: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ip: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize, // sequelize configurado
		modelName: "Activity", // sequelize configurado
		tableName: "activitys", // Tabela do banco de dados (sempre em letras minúsculas).
	},
);

/**
 * @typedef ActivityType
 * @description Tipo que representa o modelo "Activity". Pode ser usado em situações em que não é desejável mostrar a estrutura interna do "Activity", apenas seus parâmetros.
 *
 */
export type ActivityType = typeof Activity;
export default Activity;
