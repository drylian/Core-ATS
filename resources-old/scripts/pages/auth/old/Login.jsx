import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext.jsx';

export default function Login() {
    const { handleLogin } = useContext(AuthContext);
    const [loginData, setLoginData] = useState({
        identifier: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setError(null);
            await handleLogin(loginData); // Enviar os dados de login para a função de autenticação
        } catch (error) {
            setError(error.response?.data?.message || 'Ocorreu um erro ao fazer o login.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email ou Usuário:</label>
                        <input
                            type="text"
                            name="identifier"
                            value={loginData.identifier}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full rounded border"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Senha:</label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full rounded border"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
