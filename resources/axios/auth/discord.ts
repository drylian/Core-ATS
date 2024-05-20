import axios from "axios";


interface DiscordResponse {
    active: boolean;
    redirect?: string;
    message?: string
}

const DiscordChecker = (): Promise<DiscordResponse> => {
    return new Promise((resolve, reject) => {
        axios.post("/auth/discord/login")
            .then((response) => {

                return resolve(response.data);
            })
            .catch(reject);
    });
};

export default DiscordChecker;
