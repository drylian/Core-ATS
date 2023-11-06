import ContentBox from "../../components/elements/ContentBox.jsx"
import i18n from '../../i18alt';

const Missing = () => {

    const goBack = () => {
        window.history.back();
    };

    return (
        <ContentBox title="404 - Pagina não encontrada">
            <div className="flex items-center justify-center h-screen ">
                <div className="bg-white p-8 rounded shadow-lg text-center">
                    <h1 className="text-2xl font-bold mb-4">{i18n.t("react:messages.PageNotFound")}</h1>
                    <p className="text-gray-700 mb-6">{i18n.t("react:messages.PageSolicitedNotFound")}</p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                        onClick={goBack}
                    >
                        Retornar
                    </button>
                </div>
            </div>
        </ContentBox>
    );
};

export default Missing;
