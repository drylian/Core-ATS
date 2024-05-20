/**
 * @module Token
 * @description Este módulo define o modelo de "Token" usando Sequelize.
 * Representa as propriedades e configurações do modelo "Token".
 */

import sequelize from "@/controllers/sequelize/Connect";
import { DataTypes, Model } from "sequelize";

/**
 * @interface TokenI
 * @description Interface que descreve a estrutura do modelo "Token" no sequelize.
 *
 * @property {number | null} id - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {string} token - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {0 | 1000 | 2000 | 3000 | 4000 | 5000 | 6000 | 7000 | 8000 | 9000 | 10000 | null} permission - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {number} uuid - Não foi encontrado um "comment" sobre oque é essa propriedade
 *
 */
export interface TokenI {
	id: number | null;
	token: string;
	permissions: 0 | 1000 | 2000 | 3000 | 4000 | 5000 | 6000 | 7000 | 8000 | 9000 | 10000 | null;
	uuid: string;
	lang: string;
	memo: string;
}

/**
 * @class Token
 * @description Classe que representa o modelo de "Token" no banco de dados.
 * Define as propriedades do modelo "Token" e sua relação com o banco de dados.
 * @property {number | null} id - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {string} token - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {0 | 1000 | 2000 | 3000 | 4000 | 5000 | 6000 | 7000 | 8000 | 9000 | 10000 | null} permission - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {number} uuid - Não foi encontrado um "comment" sobre oque é essa propriedade
 */
class Token extends Model<TokenI> implements TokenI {
	public id!: number | null;
	public token!: string;
	public permissions!: 0 | 1000 | 2000 | 3000 | 4000 | 5000 | 6000 | 7000 | 8000 | 9000 | 10000 | null;
	public uuid!: string;
	public lang!: string;
	public memo!: string;

}

/**
 * @description Inicializa o modelo "Token" com as definições de colunas e configurações.
 *
 */
Token.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		memo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		permissions: {
			type: DataTypes.NUMBER,
			allowNull: false,
			defaultValue: 1000,
		},
		lang: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		uuid: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize, // sequelize configurado
		modelName: "Token", // sequelize configurado
		tableName: "tokens", // Tabela do banco de dados (sempre em letras minúsculas).
	},
);

/**
 * @typedef TokenType
 * @description Tipo que representa o modelo "Token". Pode ser usado em situações em que não é desejável mostrar a estrutura interna do "Token", apenas seus parâmetros.
 *
 */
export type TokenType = typeof Token;
export default Token;
