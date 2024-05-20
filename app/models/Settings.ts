import { DataTypes, Model } from 'sequelize';
import sequelize from '@/controllers/sequelize/Connect';
import { Configurations } from "@/controllers/configurations/Configurations";

interface SettingsAttributes {
    key: string;
    type: "number" | "string" | "boolean" | "object" | "string[]" | "number[]" | "object[]";
    value: string;
    description: string;
}

class Settings extends Model<SettingsAttributes, SettingsAttributes> {
    private settings: SettingsAttributes[];

    constructor() {
        super();
        this.settings = [];
    }

    public updateSettingsInMemory(updatedSetting: SettingsAttributes) {
        const index = this.settings.findIndex(setting => setting.key === updatedSetting.key);
        if (index !== -1) {
            this.settings[index] = updatedSetting;
        } else {
            this.settings.push(updatedSetting);
        }
    }

    public async setInternalConfig(key: string, value: number | boolean | string | object) {
        const settingConfig = this.settings.find(setting => setting.key === key);

        if (settingConfig) {
            await Settings.update(
                { value: value.toString() },
                { where: { key: key } }
            );
            this.updateSettingsInMemory({ ...settingConfig, value: value.toString() });
        }
    }

    public async getInternalConfig(key: string) {
        const settingConfig = this.settings.find(setting => setting.key === key);

        if (settingConfig) {
            return this.convertValue(settingConfig.value, settingConfig.type);
        } else {
            const config = Configurations.all.get(key);

            if (config && config?.internal) {
                this.updateSettingsInMemory({ ...config, value: config.defaults.toString() });
                return this.convertValue(config.defaults.toString(), config.type);
            } else if (config) {
                let KeyDB = await Settings.findOne({ where: { key: key } });

                if (!KeyDB) {
                    KeyDB = await Settings.create({
                        key: config.key,
                        value: config.defaults.toString(),
                        description: config.description,
                        type: config.type
                    });
                }
                return this.convertValue(KeyDB.dataValues.value, KeyDB.dataValues.type);
            } else {
                console.error("Configuração não encontrada. key:" + key);
            }
        }
    }

    public convertValue(value: string, type: "number" | "boolean" | "string" | "object" | "string[]" | "number[]" | "object[]") {
        if (type === "number") {
            return Number(value);
        } else if (type === "boolean") {
            return Boolean(value);
        } else if (type === "string") {
            return String(value);
        } else if (type === "object") {
            return JSON.parse(value);
        } else if (type === "string[]") {
            return this.parseArray<string>(value);
        } else if (type === "number[]") {
            return this.parseArray<number>(value);
        } else if (type === "object[]") {
            return this.parseArray<object>(value);
        }
        return null;
    }
    private parseArray<T>(value: string): T[] {
        try {
            const parsedArray: T[] = JSON.parse(value);
            if (Array.isArray(parsedArray)) {
                return parsedArray;
            }
        } catch (error) {
            console.error("Error parsing array:", error);
        }
        return [];
    }

}

Settings.init({
    key: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    type: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    value: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    description: {
        type: DataTypes.STRING,
    },
},
    {
        sequelize,
        tableName: 'settings',
        modelName: 'Settings',
        timestamps: true,
    });

Settings.addHook('afterUpdate', 'updateSettingsInMemory', async (instance: Settings) => {
    const updatedSetting = await Settings.findByPk(instance.dataValues.key);

    if (updatedSetting) {
        instance.updateSettingsInMemory(updatedSetting.dataValues);
    } else {
        const config = Configurations.all.get(instance.dataValues.key);

        if (config) {
            await Settings.create({
                key: config.key,
                value: config.defaults.toString(),
                description: config.description,
                type: config.type
            });
            return instance.convertValue(instance.dataValues.value, instance.dataValues.type);
        } else {
            console.error("[Hook] Configuração não encontrada. key:" + instance.dataValues.key);
        }
    }
});

export default Settings;
