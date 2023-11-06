import { Action, action } from 'easy-peasy';
/**
 * interface do color.json
 */
interface ColorValues {
    color: {
        primary: string;
        secondary: string;
        tertiary: string;
    };
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
    };
    background: string;
}
export interface ColorJson {
    selected: "black" | "white"; // Apenas "black" ou "white" são permitidos
    black: ColorValues;
    white: ColorValues;
}

export interface WebsiteConf {
    title: string;
    url: string;
    port: string;
    mode: string; // Defina os modos permitidos
    source: {
        type: string;
        dir: string;
        version: string;
    };
    colors: ColorJson;
}
export interface WebsiteStore {
    data?: WebsiteConf;
    setWebsite: Action<WebsiteStore, WebsiteConf>;
}

const website: WebsiteStore = {
    data: undefined,
    setWebsite: action((state, payload) => {
        state.data = { ...payload };
    }),
};

export default website;