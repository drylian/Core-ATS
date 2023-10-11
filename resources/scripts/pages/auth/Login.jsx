import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import login from "../../api/auth/login";
import ContentBox from '../../components/elements/ContentBox';
import { store } from '../../../states';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../components/CookieController';
import { setItem } from '../../components/Storage';

const Login = () => {
  const website = store.getState().website.data
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();


  const navegate = useNavigate()

  // Validação usando Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Nome de usuário é obrigatório.'),
    password: Yup.string().required('Senha é obrigatória.'),
  });

  // Função para enviar dados de login para a API
  const handleSubmit = async (values, { setSubmitting }) => {
    if (errMsg) setErrMsg(null);

    try {
      login({ username: values.username, password: values.password, remember_me: values.remember_me })
        .then((response) => {
          if (response.complete) {
            /**
             * Seta as configurações de usuário completo
             */
            store.getActions().user.setUser(response.user)
            setCookie("alternightuser", response.token, response.expire)
            if (response.remember) {
              setItem("remember_me", response.remember)
            }
            navegate("/");
            window.location.reload();
            return;
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
            setErrMsg('Falha ao tentar Logar');
          }
          errRef.current.focus();
          setSubmitting(false);
        });
    } catch (error) {
      console.error('Erro ao fazer login:', error);

      setSubmitting(false);
    }
  };

  return (
    <ContentBox title="Login">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 shadow-lg rounded-2xl">
          <h2 className="text-2xl font-semibold mb-4">Area de login - {!website ? "Core" : website.title}</h2>
          <p ref={errRef} className={`mb-4 ${errMsg ? 'text-red-600' : 'hidden'}`} aria-live="assertive">{errMsg}</p>
          <Formik
            initialValues={{ username: '', password: '', remember_me: false }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                  <label htmlFor="username" className="block text-gray-700">Nome de Usuário</label>
                  <Field type="text" name="username" className="mt-1 p-2 w-full rounded border" />
                </div>
                <div className="mb-4">
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  <label htmlFor="password" className="block text-gray-700">Senha</label>
                  <Field type="password" name="password" className="mt-1 p-2 w-full rounded border" />
                </div>
                <div>
                  <div className="mb-4">
                    <label htmlFor="remember_me" className="block text-gray-700">
                      <Field type="checkbox" name="remember_me" className="mr-2" />
                      Lembrar-me
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                  >
                    Enviar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="mt-4 text-center">
            Não tem uma conta?{' '}
            <span className="line">
              <Link to="/auth/register" className="text-blue-500 hover:underline">
                Registre-se
              </Link>
            </span>
          </p>
          <p className="mt-4 text-center">
            voltar ao {' '}
            <span className="line">
              <Link to="/" className="text-blue-500 hover:underline">
                menu inicial
              </Link>
            </span>
          </p>
        </div>
      </div>
    </ContentBox>
  );
};

export default Login;