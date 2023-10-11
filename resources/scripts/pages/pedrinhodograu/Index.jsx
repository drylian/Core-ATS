import React from 'react';
import ContentBox from "../../components/elements/ContentBox.jsx"
const Unauthorized = () => {

    const goBack = () => {
        window.history.back();
    };

    return (
        <ContentBox title="401 - Acesso não autorizado autorizado para pedrinhos">
                                <div className="flex items-center justify-center h-screen">

            <div className="items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-lg text-center">
                    <h1 className="text-2xl font-bold mb-4">Acesso não autorizado</h1>
                    <p className="text-gray-700 mb-6">Pedrinhos não podem acessar essa Página.</p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                        onClick={goBack}
                    >
                        Retornar
                    </button>
                </div>
            </div></div>
        </ContentBox>
    );
};

export default Unauthorized;
