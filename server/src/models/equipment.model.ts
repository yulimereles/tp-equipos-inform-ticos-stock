import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';

export interface EquipmentAttributes {
    id?: number;
    model: string;
    stock: number;
    brand: string;
    category?: string;
    acquisitionDate?: Date; 
    status?: string; 
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date; 
}

interface EquipmentCreationAttributes extends Optional<EquipmentAttributes, 'id'> {}

export class EquipmentModel extends Model<EquipmentAttributes, EquipmentCreationAttributes> implements EquipmentAttributes {
    public id!: number;
    public model!: string;
    public stock!: number;
    public brand!: string;
    public category?: string;
    public acquisitionDate?: Date; 
    public status?: string; 
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt?: Date; 
}

EquipmentModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    acquisitionDate: {
        type: DataTypes.DATE, 
        allowNull: true, 
    },
    status: {
        type: DataTypes.STRING, 
        allowNull: false,
        defaultValue: 'available', 
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'EquipmentModel',
    tableName: 'equipments', 
    paranoid: true, 
    timestamps: true 
});
