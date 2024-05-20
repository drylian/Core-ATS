import { Action, action } from "easy-peasy";
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
    socket:string;
    title: string;
    url: string;
    port: string;
    mode: string; // Defina os modos permitidos
    colors: ColorJson;
    langs: Array<string>;
    languages: { [key: string]: string };
    auth:{
        discord:boolean;
        register:boolean;
    }
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
