import type { ReactNode } from 'react';
import { Component } from 'react';
import ContentBox from "../../components/elements/ContentBox";

interface ErrorBoundaryState {
    hasError: boolean;
}
interface Props {
    children?: ReactNode;
}

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
    override state: ErrorBoundaryState = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    override componentDidCatch(error: Error) {
        console.error(error);
    }
    static goBack() {
        window.history.back();
    }


    render() {
        if (this.state.hasError) {
            return (
                <ContentBox title="500 - Erro Interno">
                    <div className="flex items-center justify-center h-screen">
                        <div className="bg-white p-8 rounded shadow-lg text-center">
                            <h1 className="text-2xl font-bold mb-4">500 - Erro Interno</h1>
                            <p className="text-gray-700 mb-6">Algo deu errado do nosso lado. Tente novamente mais tarde.</p>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600 transition duration-300"
                                onClick={ErrorBoundary.goBack}
                            >
                                Retornar
                            </button>
                        </div>
                    </div>
                </ContentBox>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
