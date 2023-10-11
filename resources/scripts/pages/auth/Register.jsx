import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import register from "../../api/auth/register"; // Importe a função para registro
import ContentBox from '../../components/elements/ContentBox';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { store } from '../../../states';
import { ShollBarController } from '../../components/elements/ShollBarController';

const Register = () => {
    const website = store.getState().website.data

    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    const navigate = useNavigate();

    // Validação usando Yup
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(4, 'O Usuário deve ter pelo menos 4 caracteres')
            .required('obrigatório'),
        email: Yup.string()
            .email('Informe um e-mail válido')
            .required('obrigatório'),
        password: Yup.string()
            .min(4, 'A senha deve ter pelo menos 4 caracteres')
            .required('obrigatório'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
            .required('obrigatório'),
            termsofservice: Yup.boolean()
            .oneOf([true], 'Você deve concordar com os termos de serviço'),
    });

    // Função para enviar dados de registro para a API
    const handleSubmit = async (values, { setSubmitting }) => {
        if (errMsg) setErrMsg(null);
        try {
            register({ username: values.username, email: values.email, password: values.password })
                .then((response) => {
                    if (response.complete) {
                        // Registro bem-sucedido, redirecione para a página de login ou outra página apropriada
                        navigate("/auth/login");
                        return;
                    } else {
                        setErrMsg(response.message || 'Erro ao tentar se registrar.');
                    }
                })
                .catch((err) => {
                    if (!err?.response) {
                        setErrMsg('Nenhuma resposta do servidor');
                    } else if (err.response?.status === 400) {
                        setErrMsg('Dados de registro inválidos');
                    } else if (err.response?.status === 401) {
                        setErrMsg(!err.response.data.message ? 'Não Autorizado' : err.response.data.message);
                    } else {
                        setErrMsg('Falha ao tentar se registrar');
                    }
                    errRef.current.focus();
                    setSubmitting(false);
                });
        } catch (error) {
            console.error('Erro ao tentar se registrar:', error);
            setSubmitting(false);
        }
    };

    return (
        <ContentBox title="Registro">
            <ShollBarController className=' p-4 top-5 left-5 right-5 rounded-lg shadow-md overflow-y-scroll scrollbar-hide h-screen'>

                <div className="flex items-center justify-center h-screen">
                    <div className="bg-white p-8 shadow-lg rounded-2xl">
                        <h2 className="text-2xl font-semibold mb-4">Área de Registro - {!website ? "Core" : website.title}</h2>
                        <p ref={errRef} className={`mb-4 ${errMsg ? 'text-red-600' : 'hidden'}`} aria-live="assertive">{errMsg}</p>
                        <Formik
                            initialValues={{ username: '', email: '', password: '', confirmPassword: '', termsofservice: false }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="flex flex-wrap mb-4">
                                        <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                                            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                                            <label htmlFor="username" className="block text-gray-700">Usuário</label>
                                            <Field type="username" name="username" className="mt-1 p-2 w-full rounded border" />
                                        </div>
                                        <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                            <label htmlFor="email" className="block text-gray-700">E-mail</label>
                                            <Field type="email" name="email" className="mt-1 p-2 w-full rounded border" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap mb-4">

                                        <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                                            <label htmlFor="password" className="block text-gray-700">Senha</label>
                                            <Field type="password" name="password" className="mt-1 p-2 w-full rounded border" />
                                        </div>
                                        <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                                            <label htmlFor="confirmPassword" className="block text-gray-700">Confirme a Senha</label>
                                            <Field type="password" name="confirmPassword" className="mt-1 p-2 w-full rounded border" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="termsofservice" className="block text-gray-700">
                                            <Field type="checkbox" name="termsofservice" className="mr-2" />
                                            Concordo com nossos {' '}
                                            <span className="line">
                                                <Link to="/termsofservice" className="text-blue-500 hover:underline">
                                                    termos de serviço
                                                </Link>
                                            </span>
                                        </label>
                                        <ErrorMessage name="termsofservice" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="mb-4 justify-center text-center">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                                        >
                                            Registrar
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <p className="mt-4 text-center">
                            Já possui uma conta?{' '}
                            <span className="line">
                                <Link to="/auth/login" className="text-blue-500 hover:underline">
                                    Faça login
                                </Link>
                            </span>
                        </p>
                        <p className="mt-4 text-center">
                            Voltar ao {' '}
                            <span className="line">
                                <Link to="/" className="text-blue-500 hover:underline">
                                    menu inicial
                                </Link>
                            </span>
                        </p>
                    </div>
                </div>
            </ShollBarController>
        </ContentBox>
    );
};

export default Register;
