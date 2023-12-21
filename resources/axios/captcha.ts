import axios from "axios";

interface CaptchaChallengeProps {
    image: string;
}
interface CaptchaCheckerProps {
    result: string;
}

export const CaptchaChallenge = (): Promise<CaptchaChallengeProps> => {
    return new Promise((resolve, reject) => {
        axios.post("/captcha/challenge")
            .then((response) => {
                return resolve(response.data);
            })
            .catch(reject);
    });
};

export const CaptchaChecker = ({ result }: CaptchaCheckerProps): Promise<{ completed: boolean, code: string | null }> => {
    return new Promise((resolve, reject) => {
        axios.post("/captcha/checker", { result })
            .then((response) => {
                return resolve(response.data);
            })
            .catch(reject);
    });
};