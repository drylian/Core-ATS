import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import email from "../../../api/auth/change/email";
import { store } from '../../../../states';

const ChangeEmail = () => {
    const user = store.getState().user.data;
    const errRef = useRef();
    const userRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [sucMsg, setSucMsg] = useState('');

    const initialValues = {
        currentPassword: '', // Senha atual
        newEmail: user.email, // Novo e-mail
    };

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Senha atual é obrigatória'),
        newEmail: Yup.string()
            .email('Informe um e-mail válido')
            .required('E-mail é obrigatório'),

    });

    const handleSubmit = (values, { setSubmitting }) => {
        if(errMsg) setErrMsg(null);
        if(sucMsg) setSucMsg(null);

        try {
            // Chame sua função de atualização de e-mail aqui
            email({
                email: store.getState().user.data.email,
                password: values.currentPassword,
                newemail: values.newEmail,
            })
                .then((response) => {
                    if (response.complete) {
                        setSucMsg('Email alterado com sucesso.');
                        user.email = response.email
                        let  newparams = {...user, email:response.email }
                        store.getActions().user.setUser(newparams);
                        userRef.current.focus();
                      }
                })
                .catch((err) => {
                    if (!err?.response) {
                        setErrMsg('Nenhuma resposta do servidor');
                      } else if (err.response?.status === 400) {
                        setErrMsg('Nome de usuário ou senha ausentes');
                      } else if (err.response?.status === 401) {
                        setErrMsg(!err.response.data.message ? 'Não Autorizado' : err.response.data.message);
                      } else {
                        setErrMsg('Falha ao tentar mudar o email');
                      }
                })
                .finally(() => {
                    setSubmitting(false);
                });
        } catch (error) {
            console.error('Erro ao tentar alterar o e-mail:', error);
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-screen-md mx-auto mt-8 flex justify-center">
            <div className="w-full max-w-xl bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Trocar E-mail</h1>

                <p ref={errRef} className={`mb-4 ${errMsg ? 'text-red-600' : 'hidden'}`} aria-live="assertive">{errMsg}</p>
                <p ref={userRef} className={`mb-4 ${sucMsg ? 'text-green-600' : 'hidden'}`} aria-live="assertive">{sucMsg}</p>


                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <ErrorMessage name="currentPassword" component="p" className="text-red-500 text-xs" />
                                <label htmlFor="currentPassword" className="block text-gray-700">Senha Atual:</label>
                                <Field type="password" name="currentPassword" id="currentPassword" className="mt-1 p-2 w-full rounded border" />
                            </div>
                            <div className="mb-4">
                                <ErrorMessage name="newEmail" component="p" className="text-red-500 text-xs" />
                                <label htmlFor="newEmail" className="block text-gray-700">Novo E-mail:</label>
                                <Field type="email" name="newEmail" id="newEmail" className="mt-1 p-2 w-full rounded border" />
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600"
                                    disabled={isSubmitting}
                                >
                                    Trocar E-mail
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ChangeEmail;
