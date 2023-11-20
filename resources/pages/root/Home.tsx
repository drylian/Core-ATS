import { Link } from "react-router-dom";
import ContentBox from "../../components/elements/ContentBox";
import Header from "../../components/Header";

const Home = () => {
	return (
		<>
			<Header fixed={true} />

			<ContentBox title='Bem-vindo ao Nosso Site'>
				<header className='text-white text-center mb-8'>
					<h1 className='text-4xl font-bold'>Bem-vindo à Página Inicial</h1>
					<p className='text-lg'>Esta é uma página inicial simples criada com React e Tailwind CSS.</p>
				</header>

				<section className='bg-gray-900 text-white py-12 rounded-lg'>
					<div className='text-center mb-8'>
						<h2 className='text-2xl font-semibold mb-4'>Recursos Adicionais</h2>
						<p className='text-lg'>Adicione mais conteúdo aqui para testar e personalizar sua aplicação.</p>
					</div>
				</section>

				<section className='bg-gray-800 text-white py-12 rounded-lg'>
					<div className='text-center mb-8'>
						<h2 className='text-3xl font-semibold mb-4 text-yellow-400'>Hospedagem de Alta Qualidade</h2>
						<p className='text-lg'>Oferecemos hospedagem confiável e rápida para o seu site.</p>
					</div>
					<div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-8'>
						<div className='flex items-center'>
							<i className='bx bxs-check-circle text-green-300 text-2xl mr-2 transition-colors hover:text-green-500' />
							<span>Hospedagem 24/7</span>
						</div>
						<div className='flex items-center'>
							<i className='bx bxs-check-circle text-blue-400 text-2xl mr-2 transition-colors hover:text-blue-500' />
							<span>Domínio Gratuito</span>
						</div>
						<div className='flex items-center'>
							<i className='bx bxs-check-circle text-red-400 text-2xl mr-2 transition-colors hover:text-red-500' />
							<span>Suporte 24/7</span>
						</div>
						<div className='flex items-center'>
							<i className='bx bxs-check-circle text-purple-400 text-2xl mr-2 transition-colors hover:text-purple-500' />
							<span>Alta Velocidade</span>
						</div>
					</div>
					<div className='mt-8 text-center'>
						<Link
							to='/plans'
							className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full text-lg transition duration-300 hover:shadow-md'
						>
                            Ver Planos
						</Link>
					</div>
				</section>

				<section className='bg-gray-700 text-white py-12 rounded-lg'>
					<div className='text-center mb-8'>
						<h2 className='text-3xl font-semibold mb-4'>Inicie Agora</h2>
						<p className='text-lg'>Junte-se a nós e comece sua jornada online hoje mesmo.</p>
					</div>
					<div className='mt-8 text-center'>
						<Link
							to='/auth/signup'
							className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full text-lg transition duration-300 hover:shadow-md'
						>
                            Criar Conta
						</Link>
					</div>
				</section>
			</ContentBox>
		</>
	);
};

export default Home;
