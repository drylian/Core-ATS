/**
 * @module Token
 * @description Este módulo define o modelo de "Token" usando Sequelize.
 * Representa as propriedades e configurações do modelo "Token".
 */

import sequelize from '@/controllers/sequelize/Connect';
import { DataTypes, Model } from 'sequelize';

/**
 * @interface TokenI
 * @description Interface que descreve a estrutura do modelo "Token" no sequelize.
 *
 * @property {number | null} id - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {string} token - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {number | null} permission - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {number} uuid - Não foi encontrado um "comment" sobre oque é essa propriedade
 *
 */
export interface TokenI {
    id: number | null;
    token: string;
    permissions: number | null;
    uuid: string;
}

/**
 * @class Token
 * @description Classe que representa o modelo de "Token" no banco de dados.
 * Define as propriedades do modelo "Token" e sua relação com o banco de dados.
 * @property {number | null} id - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {string} token - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {number | null} permission - Não foi encontrado um "comment" sobre oque é essa propriedade
 * @property {number} uuid - Não foi encontrado um "comment" sobre oque é essa propriedade
 */
class Token extends Model<TokenI> implements TokenI {
    public id!: number | null;
    public token!: string;
    public permissions!: number | null;
    public uuid!: string;
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
        permissions: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 1000,
        },
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // sequelize configurado
        modelName: 'Token', // sequelize configurado
        tableName: 'tokens', // Tabela do banco de dados (sempre em letras minúsculas).
    },
);

/**
 * @typedef TokenType
 * @description Tipo que representa o modelo "Token". Pode ser usado em situações em que não é desejável mostrar a estrutura interna do "Token", apenas seus parâmetros.
 *
 */
export type TokenType = typeof Token;
export default Token;