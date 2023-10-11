import { useRef, useState, useEffect } from 'react';
import useAuth from '../../contexts/hooks/useAuth.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import http from '../../api/http.js';
import useConfig from '../../contexts/hooks/useConfig.jsx';
import ContentBox from '../../../components/elements/ContentBox.jsx';
 
const Login = () => {
    const { setUserLevel } = useAuth();
    const { website } = useConfig();
 
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await http.post("/auth/login",
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            .then(({data}) => {
                console.log(JSON.stringify(data));
                localStorage.setItem('token', JSON.stringify(data.token));
                http.defaults.headers.alternightuser = `Bearer ${data.token}`;
                setUserLevel(parseInt(data.permissions)); // level do usuário, quanto mais alto mais poder ele vai ter
            })
            .catch(err => {
                console.log("Erro ao tentar logar :", err)
            })
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Nenhuma resposta do servidor');
            } else if (err.response?.status === 400) {
                setErrMsg('Nome de usuário ou senha ausentes');
            } else if (err.response?.status === 401) {
                setErrMsg(!err.response.data.message ?'Não Autorizado': err.response.data.message);
            } else {
                setErrMsg('Falha ao tentar Logar');
            }
            errRef.current.focus();
        }
    }

    return (
        <ContentBox title="Fazer login">
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 shadow-lg rounded-2xl">
                <h2 className="text-2xl font-semibold mb-4">Area de login - {!website ? "Core" : website.Website.title}</h2>
                <p ref={errRef} className={`mb-4 ${errMsg ? 'text-red-600' : 'hidden'}`} aria-live="assertive">{errMsg}</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email ou Usuário:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            className="mt-1 p-2 w-full rounded border"
                            value={user}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            className="mt-1 p-2 w-full rounded border"
                            value={pwd}
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
                <p className="mt-4 text-center">
                    Não tem uma conta?{' '}
                    <span className="line">
                        <Link to="/auth/register" className="text-blue-500 hover:underline">
                            Registre-se
                        </Link>
                    </span>
                </p>
            </div>
        </div>
        </ContentBox>
    )
}

export default Login
