import sequelize from "controllers/sequelize/Connect";
import { DataTypes, Model } from "sequelize";

// Interface que representa o modelo User
interface UserInstance extends Model {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define o modelo User usando a interface
const User = sequelize.define<UserInstance>("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default User;
