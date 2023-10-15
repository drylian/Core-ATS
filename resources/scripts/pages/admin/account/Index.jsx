import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Modal from 'react-modal';
import account from '../../../api/admin/account';
import Sidebar from '../../../components/admin/Sidebar';
import ContentBox from "../../../components/admin/ContentBox";

function Account() {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fazer a solicitação GET para "/admin/account"
        account()
            .then((response) => {
                setUsers(response); // Armazenar os dados do usuário no estado
                console.log(response);
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do usuário:', error);
            });
    }, []);

    // Função para lidar com o envio do formulário no modal
    const handleFormSubmit = (values, actions) => {
        // Adicione aqui a lógica para atualizar o usuário na API
        // Substitua a lógica abaixo pela chamada real à API
        console.log('Valores a serem enviados para a API:', values);

        // Fechar o modal após a atualização
        setIsModalOpen(false);
    };

    return (
        <ContentBox title="Contas">
            <div className="flex">
                {/* Barra lateral */}
                <Sidebar />
                <div className="h-screen flex-1 p-7">
                    <h1 className="text-2xl font-semibold text-white">Gerenciar contas</h1>

                    {/* Conteúdo principal */}
                    <div className="flex-1 p-4">
                        <section className="container mx-auto p-6 font-mono">
                            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                <th className="px-4 py-3">Name</th>
                                                <th className="px-4 py-3">Permissão</th>
                                                <th className="px-4 py-3">Status</th>
                                                <th className="px-4 py-3">Date</th>
                                                <th className="px-4 py-3">Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {users.map(user => (
                                                <tr className="text-gray-700" key={user.id}>
                                                    <td className="px-4 py-3 border">
                                                        <div className="flex items-center text-sm">
                                                            <div>
                                                                <p className="font-semibold text-black">{user.username}</p>
                                                                <p className="text-xs text-gray-600">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-ms font-semibold border">{user.permissions}</td>
                                                    <td className="px-4 py-3 text-xs border">
                                                        <span
                                                            className={`px-2 py-1 font-semibold leading-tight ${user.suspended !== true ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}
                                                        >
                                                            {user.suspended !== true ? "Normal" : "Suspenso"}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm border">{user.createdAt}</td>
                                                    <td className="px-4 py-3 border">
                                                        {/* Link para abrir o modal de edição do usuário */}
                                                        <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault(); // Impede a navegação do link
                                                                setIsModalOpen(true); // Abre o modal
                                                            }}
                                                            className="text-blue-500 hover:underline"
                                                        >
                                                            <i className='bx bxs-edit-alt'></i>
                                                        </a>
                                                        {isModalOpen && (
                                                            <Modal
                                                                isOpen={isModalOpen}
                                                                onRequestClose={() => setIsModalOpen(false)} // Fechar o modal
                                                                contentLabel="Editar Usuário"
                                                            >
                                                                {/* Conteúdo principal */}
                                                                <div className="flex-1 p-4">
                                                                    <a
                                                                        className="text-blue-500 hover:underline absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-700 cursor-pointer"

                                                                        onClick={() => setIsModalOpen(false)} >
                                                                        <i class='bx bx-x'></i>
                                                                    </a>
                                                            
                                                                    <Formik
                                                                        initialValues={user}
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
                                                                                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-700" disabled={formikProps.isSubmitting} >
                                                                                        Salvar Alterações
                                                                                    </button>
                                                                                </div>
                                                                            </Form>
                                                                        )}
                                                                    </Formik>
                                                                </div>
                                                            </Modal>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </ContentBox>
    );
}

export default Account;
