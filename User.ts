
import sequelize from "controllers/sequelize/Connect";
import { DataTypes, Model } from "sequelize";

export interface UserI {
  id: number | null;
  username: string;
  email: string;
  password: string;
  permissions: string | null;
  uuid: string;
  remember: string | null;
}

class User extends Model<UserI> implements UserI {
  public id!: number | null;
  public username!: string;
  public email!: string;
  public password!: string;
  public permissions!: string | null;
  public uuid!: string;
  public remember!: string | null;
}

User.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permissions: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "1",
  },
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remember: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
});

export type UserType = typeof User;
export default User;
