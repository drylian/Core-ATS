import React from 'react';
import ContentBox from '../../components/elements/ContentBox.jsx';
import Header from "../../components/elements/Header.jsx"
import { ShollBarController } from '../../components/elements/ShollBarController.jsx';
const TermsOfService = () => {
  const handleGoBack = () => {
    window.history.back(); 
  };
  return (
    <>
      <ContentBox title="Termos de Serviço">
        <Header links={[{ name: 'Home', to: '/' }, {name:"Voltar", onClick:{handleGoBack}}]}/>
        <ShollBarController className="space-y-7 p-5">
          <div className="p-6"/>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Termos de Uso da Hospedagem de Jogos e Websites</h2>
            <p className="text-lg">
              Estes Termos de Serviço ("Termos") regem o uso dos serviços de hospedagem de jogos e websites fornecidos pela Alternight. Ao utilizar nossos serviços, você concorda com estes Termos. Se você não concordar com estes Termos, não use nossos serviços.
            </p>

            <h3 className="text-xl font-semibold mt-4">1. Serviços de Hospedagem</h3>
            <p>
              Nós fornecemos serviços de hospedagem de jogos e websites que incluem, mas não estão limitados a, armazenamento de dados, largura de banda e suporte técnico. Os detalhes específicos dos serviços estão descritos em nosso site.
            </p>

            <h3 className="text-xl font-semibold mt-4">2. Pagamento</h3>
            <p>
              Os preços dos nossos serviços e os termos de pagamento estão disponíveis em nosso site. Você concorda em pagar pelas taxas e serviços conforme estabelecido em nosso site.
            </p>

            <h3 className="text-xl font-semibold mt-4">3. Responsabilidades do Cliente</h3>
            <p>
              Você é responsável por todo o conteúdo e atividades associadas à sua hospedagem. Você concorda em cumprir todas as leis aplicáveis e regulamentos relacionados ao uso dos nossos serviços.
            </p>

            <h3 className="text-xl font-semibold mt-4">4. Política de Uso Aceitável</h3>
            <p>
              Você concorda em não utilizar nossos serviços para atividades ilegais, difamatórias, fraudulentas, ou qualquer outra atividade que viole estes Termos. Reservamo-nos o direito de suspender ou encerrar sua conta em caso de violação destes Termos.
            </p>

            <h3 className="text-xl font-semibold mt-4">5. Privacidade</h3>
            <p>
              Nós respeitamos sua privacidade e protegemos seus dados de acordo com nossa Política de Privacidade. Leia nossa Política de Privacidade para entender como tratamos seus dados pessoais.
            </p>

            <h3 className="text-xl font-semibold mt-4">6. Suporte Técnico</h3>
            <p>
              Oferecemos suporte técnico aos nossos clientes de acordo com os termos especificados em nosso site.
            </p>

            <h3 className="text-xl font-semibold mt-4">7. Alterações nos Termos</h3>
            <p>
              Reservamo-nos o direito de atualizar ou modificar estes Termos a qualquer momento. As alterações entrarão em vigor após a publicação em nosso site. É sua responsabilidade revisar periodicamente estes Termos para estar ciente das atualizações.
            </p>

            <h3 className="text-xl font-semibold mt-4">8. Encerramento de Conta</h3>
            <p>
              Reservamo-nos o direito de encerrar sua conta e suspender nossos serviços a qualquer momento, por qualquer motivo, a nosso critério.
            </p>

            <p className="text-sm mt-4 text-center">
              Última atualização: "domingo, 3 de Setembro de 2023", Alternight CEO
            </p>
          </div></ShollBarController>
      </ContentBox>
    </>
  );
};

export default TermsOfService;
