import sequelize from "@/controllers/sequelize/Connect";
import { DataTypes, Model } from "sequelize";

export interface UserI {
    id: number | null;
    username: string;
    email: string;
    password: string;
    permissions: number | null;
    uuid: string;
    remember: string | null;
    suspended: boolean | null;
    suspendedReason: string | null;
}

export interface UserE {
    id: number | null;
    username: string;
    email: string;
    password?: string;
    permissions: number | null;
    uuid: string;
    remember: string | null;
    suspended: boolean | null;
    suspendedReason: string | null;
}

class User extends Model<UserI> implements UserI {
	public id!: number | null;
	public username!: string;
	public email!: string;
	public password!: string;
	public permissions!: number | null;
	public uuid!: string;
	public remember!: string | null;
	public suspended!: boolean | null;
	public suspendedReason!: string | null;
}

User.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	permissions: {
		type: DataTypes.NUMBER,
		defaultValue: 1542,
	},
	uuid: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	remember: {
		type: DataTypes.STRING,
	},
	suspended:{
		type: DataTypes.BOOLEAN,
	},
	suspendedReason:{
		type: DataTypes.STRING,
	}
}, {
	sequelize, // sequelize configurado
	modelName: "User", // Nome do Model
	tableName: "users", // Tabela do banco de dados(sempre em letras minúsculas).
});

/**
 * Type do User, pode ser necessario as vezes, para situações que voce não quer mostrar a forma "exposta" do User, apenas os seus params
 */
export type UserType = typeof User;

export default User;
