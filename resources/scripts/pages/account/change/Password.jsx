import React, { useRef, useState } from 'react'; // Importe o useState
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import password from "../../../api/auth/change/password";
import { store } from '../../../../states';

const ChangePassword = () => {
  const user = store.getState().user.data;
  const errRef = useRef();
  const userRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [sucMsg, setSucMsg] = useState('');

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Senha atual é obrigatória'),
    newPassword: Yup.string()
      .min(4, 'A nova senha deve ter pelo menos 4 caracteres')
      .required('obrigatório'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'As senhas não coincidem')
      .required('obrigatório'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    if(errMsg) setErrMsg(null);
    if(sucMsg) setSucMsg(null);

    try {
      password({ username: store.getState().user.data.username, password: values.currentPassword, newpassword: values.newPassword })
        .then((response) => {
          if (response.complete) {
            setSucMsg('Senha alterada com sucesso.');
            userRef.current.focus();
            setSubmitting(false);
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
            setErrMsg('Falha ao tentar mudar a senha');
          }
          console.error(err);
          setSubmitting(false);
        });
    } catch (error) {
      console.error('Erro ao tentar trocar a senha:', error);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto mt-8 flex justify-center">
      <div className="w-full max-w-xl bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Trocar Senha</h1>
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
                <ErrorMessage name="newPassword" component="p" className="text-red-500 text-xs" />
                <label htmlFor="newPassword" className="block text-gray-700">Nova Senha:</label>
                <Field type="password" name="newPassword" id="newPassword" className="mt-1 p-2 w-full rounded border" />
              </div>
              <div className="mb-4">
                <ErrorMessage name="confirmNewPassword" component="p" className="text-red-500 text-xs" />
                <label htmlFor="confirmNewPassword" className="block text-gray-700">Confirme a Nova Senha:</label>
                <Field type="password" name="confirmNewPassword" id="confirmNewPassword" className="mt-1 p-2 w-full rounded border" />
              </div>              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  Trocar Senha
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
