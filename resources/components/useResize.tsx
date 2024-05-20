import { useEffect, useState } from "react";

/**
 * Hook personalizado para rastrear a largura da janela e categorizar a visualização como desktop, tablet ou mobile.
 */
export default function useResize() {
    // Estado para armazenar a largura da janela
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        // Função chamada durante o redimensionamento da janela
        const handleResize = () => {
            // Atualiza o estado com a largura atual da janela
            setWindowWidth(window.innerWidth);
        };

        // Adiciona um ouvinte de evento para redimensionamento da janela
        window.addEventListener('resize', handleResize);

        // Remove o ouvinte de evento ao desmontar o componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // O array de dependências está vazio, então o efeito só é executado uma vez durante a montagem

    // Determina a categoria da visualização com base na largura da janela
    let viewCategory: 'desktop' | 'mobile' | 'tablet' = 'desktop';

    if (windowWidth < 768) {
        viewCategory = 'mobile';
    } else if (windowWidth < 1024) {
        viewCategory = 'tablet';
    }
    const mobile = windowWidth < 768
    const tablet = windowWidth < 1024
    const desktop = windowWidth > 1024
    // Retorna um objeto contendo a largura da janela e a categoria da visualização
    return { width: windowWidth, view: viewCategory, mobile, tablet, desktop };
}