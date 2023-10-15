import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Modal from 'react-modal';

function EditUser(user, isOpen, onRequestClose) {

  // Simule os detalhes do usuário (substitua com uma chamada real à API)
  const initialUser = user;

  const handleFormSubmit = (values, actions) => {
    // Adicione aqui a lógica para atualizar o usuário na API
    // Substitua a lógica abaixo pela chamada real à API
    console.log('Valores a serem enviados para a API:', values);
    // Redirecione após a atualização
    actions.setSubmitting(false);
    // history.push(`/user/${id}`); // Use history para redirecionar
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar Usuário"
    >
      {/* Conteúdo principal */}
      <div className="flex-1 p-4">
        <button
          onClick={onRequestClose} // Chama a função para fechar o modal
          className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-700 cursor-pointer"
        >Fechar
        </button>
          <Formik
            initialValues={initialUser}
            enableReinitialize={true}
            onSubmit={handleFormSubmit}
          >
            {(formikProps) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
                  <Field type="text" id="username" name="username" className="mt-1 p-2 border rounded w-full" />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Field type="email" id="email" name="email" className="mt-1 p-2 border rounded w-full" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                  <Field type="password" id="password" name="password" className="mt-1 p-2 border rounded w-full" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="permissions" className="block text-sm font-medium text-gray-700">Permissões</label>
                  <Field as="select" id="permissions" name="permissions" className="mt-1 p-2 border rounded w-full">
                    <option value={1000}>1000</option>
                    <option value={5000}>5000</option>
                    <option value={10000}>10000</option>
                  </Field>
                </div>

                <div className="mb-4">
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" disabled={formikProps.isSubmitting}>
                    Salvar Alterações
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <Link to={`/admin/account`} className="text-blue-500 hover:underline">Voltar para lista de Usuários</Link>
      </div>
    </Modal>
  );
}

export default EditUser;

