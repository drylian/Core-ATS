import http from "../../http";
export interface ColorValues {
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
export interface ColorData {
    selected: "black" | "white"; // Apenas "black" ou "white" são permitidos
    black: ColorValues;
    white: ColorValues;
}
export default (): Promise<ColorData> => {
	return new Promise((resolve, reject) => {
		http.get("/api/admin/settings/colors")
			.then(({ data }) => resolve(data.data))
			.catch(reject);
	});
};

