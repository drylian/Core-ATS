import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CaptchaChallenge, CaptchaChecker } from "../../../axios/captcha";
import { SmallLoading } from "../Loading";

interface Response {
    code: React.Dispatch<React.SetStateAction<string | null>>;
}

const CaptchaSchema = Yup.object().shape({
    text: Yup.string().required("Campo obrigatório"),
});

const CaptchaBox: React.FC<Response> = ({ code }) => {
    const [captcha, setCaptcha] = useState<{ image: string } | null>(null);
    const [process, setProcess] = useState<"submitting" | "submit" | "success">("submit");
    const [invalid, setInvalid] = useState(false)
    function GetCaptcha() {
        CaptchaChallenge()
            .then((response) => setCaptcha(response))
            .catch((e) => console.error(e));
    }

    function SetResponse(values: { text: string }, resetForm: () => void) {
        setInvalid(false)
        CaptchaChecker({ result: values.text })
            .then((response) => {
                if (response.completed && response.code) {
                    code(response.code);
                    setProcess("success");
                } else {
                    resetForm()
                    setInvalid(true)
                    GetCaptcha();
                }
            })
            .catch((e) => {
                console.error(e);
                // reinicia o processo
                GetCaptcha();
            });
    }

    if (!captcha) GetCaptcha();

    return (
        <Formik
            initialValues={{ text: "" }}
            validationSchema={CaptchaSchema}
            onSubmit={(values, { resetForm }) => {
                SetResponse(values, resetForm);
            }}    >
            <Form>
                <div className="w-full max-w-md rounded bg-light-primary dark:bg-dark-primary duration-300 p-2">
                    <div className="flex items-center rounded bg-light-primary dark:bg-dark-primary duration-300 p-2">
                        {process === "submit" ? (
                            <i
                                className="bx bx-checkbox"
                                style={{ fontSize: "30px" }}
                                onClick={() => setProcess("submitting")}
                            ></i>
                        ) : process === "submitting" ? (
                            <SmallLoading className="w-5 h-5" />
                        ) : (
                            <i className="bx bx-check" style={{ fontSize: "30px", color: "green" }} />
                        )}
                        <p className="ml-4 text-sm flex-grow">Eu não sou um Robô</p>
                        <img className="w-12 h-12 ml-4" src="/img/favicon.png" alt="logo" />
                    </div>
                    <div className="justify-between">
                        <p className="text-light-primary dark:text-dark-primary duration-300 text-xs">Simple Captcha for Alternight.</p>
                    </div>
                </div>
                {process === "submitting" && captcha && (
                    <>
                        <div
                            className={`fixed inset-0 w-full h-full duration-300 opacity-40`}
                            onClick={() => setProcess("submit")}
                        ></div>
                        <div className="relative inset-0 z-10 p-1 w-full max-w-md">
                            <div className="border border-solid border-gray-500 rounded shadow-md bg-light-secondary dark:bg-dark-secondary duration-300">
                                <div className="flex items-center p-2 justify-between">
                                    <p className="text-xs font-semibold">Digite o texto da imagem</p>
                                    <div className="border border-solid rounded border-gray-300">
                                        <div className="bg-white" dangerouslySetInnerHTML={{ __html: captcha.image }} />
                                    </div>
                                </div>
                                {invalid && <p className="ml-3 text-xs text-red-500 font-semibold">Tente novamente</p>}
                                <div className="flex">
                                    <div className="p-2">
                                        <label>Digite o texto da imagem</label>
                                        <Field
                                        
                                            type="text"
                                            name="text"
                                            placeholder="Digite aqui"
                                            className="w-full border border-solid rounded border-gray-300 p-2"
                                        />
                                        <ErrorMessage name="text" component="div" className="text-red-500 text-xs" />
                                    </div>
                                    <div className="p-2">
                                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </Formik>
    );
};

export default CaptchaBox;
