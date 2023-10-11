import React from 'react';
import ContentBox from '../../components/elements/ContentBox.jsx';

const BanReasonBox = ({ reason }) => (
  <div className="bg-white p-8 rounded shadow-lg text-center">
    <h1 className="text-2xl font-bold mb-4">Você foi suspenso de nossos serviços</h1>
    <p className="text-gray-700 mb-6">{reason}</p>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      onClick={() => window.history.back()}
    >
      Retornar
    </button>
  </div>
);

const Suspended = ({ reason }) => {
  return (
    <ContentBox title="401 - Acesso não autorizado">
      <div className="flex items-center justify-center h-screen">
        <div className="items-center justify-center bg-gray-100">
          <BanReasonBox reason={ reason || "Você foi suspenso de nossos serviços por violar nossos termos de uso."} />
        </div>
      </div>
    </ContentBox>
  );
};

export default Suspended;
