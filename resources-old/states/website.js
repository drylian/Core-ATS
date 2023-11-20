import { action } from "easy-peasy";

const website = {
	data: undefined,

	setWebsite: action((state, payload) => {
		state.data = { ...payload };
	}),
};

export default website;