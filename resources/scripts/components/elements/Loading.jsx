import React from "react";

const Loading = () => {
  return (
    <div className="grid min-h-screen place-content-center"> {/* Cor de fundo azul mais escuro */}
      <div className="flex flex-col items-center gap-2 text-gray-500">
        {/* Elemento de carregamento */}
        <span className="h-20 w-20 block rounded-full border-4 border-t-blue-300 animate-spin"></span>
        
        {/* Texto "Carregando..." com animação "pulse" */}
        <span className="text-2xl font-semibold animate-pulse">Carregando...</span>
      </div>
    </div>
  );
};

export default Loading;
