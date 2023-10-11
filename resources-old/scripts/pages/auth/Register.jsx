import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import http from '../../api/http';
import useConfig from '../../contexts/hooks/useConfig';
import ContentBox from '../../../../resources/scripts/elements/ContentBox';

const Login = () => {
    const { website } = useConfig();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // Novos campos para registro
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [repeatPwd, setRepeatPwd] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Lógica de registro
        if (!agreeTerms) {
            setErrMsg('Você deve concordar com nossos termos de uso');
            return;
        }

        if (pwd !== repeatPwd) {
            setErrMsg('As senhas não coincidem');
            return;
        }

        await http.post("/auth/register",
            JSON.stringify({ user, pwd, name, email }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
            .then(({ data }) => {
                console.log(JSON.stringify(data));
                setUser('');
                setPwd('');
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log("Erro ao tentar registrar :", err)
                if (!err) {
                    setErrMsg('Nenhuma resposta do servidor');
                } else if (err.data?.message) {
                    setErrMsg(err.response.data?.message);
                } else if (err?.status === 400) {
                    setErrMsg('Nome de usuário,email ou senha ausentes');
                } else if (err?.status === 401) {
                    setErrMsg(!err.response.data?.message ? 'Não Autorizado' : err.response.data.message);
                } else {
                    setErrMsg('Falha ao tentar se registrar');
                }
                errRef.current.focus();
            });
    };

    return (
        <ContentBox title="Registro">
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white p-8 shadow-lg rounded-2xl">
                    <h2 className="text-2xl font-semibold text-center">Area de Registro - {!website ? "Core" : website.Website.title}</h2>
                    <p ref={errRef} className={`mb-4 ${errMsg ? 'text-red-600' : 'hidden'}`} aria-live="assertive">{errMsg}</p>

                    <form onSubmit={handleSubmit}>
                        {/* Campos de registro */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Nome:</label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 p-2 w-full rounded border"
                                value={name}
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Email:</label>
                            <input
                                type="email"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-2 w-full rounded border"
                                value={email}
                                required
                            />
                        </div>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
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
                            <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                                <label className="block text-sm font-medium">Repetir Senha:</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setRepeatPwd(e.target.value)}
                                    className="mt-1 p-2 w-full rounded border"
                                    value={repeatPwd}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4 justify-center text-center">
                            <label className="inline-flex items-center justify-center text-center">
                                <p className="mt-4">
                                    <input
                                        type="checkbox"
                                        id="checkbox"
                                        className="mr-2"
                                        checked={agreeTerms}
                                        onChange={() => setAgreeTerms(!agreeTerms)}
                                    />
                                    Concordo com nossos {' '}
                                    <span className="line">
                                        <Link to="/termsofservice" className="text-blue-500 hover:underline">
                                            termos de serviço
                                        </Link>
                                    </span>
                                </p>
                            </label>
                        </div>
                        <div className="justify-center text-center">
                            <button
                                type="submit"
                                className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition duration-300"
                            >
                                Registrar
                            </button>
                        </div>
                    </form>
                    <p className="mt-4 text-center">
                        Já tem uma conta?{' '}
                        <span className="line">
                            <Link to="/auth/login" className="text-blue-500 hover:underline">
                                Faça login
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
        </ContentBox>
    );
};

export default Login;
