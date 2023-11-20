import styled from 'styled-components'; // Importe o styled-components

export const ShollBarController = styled.div`
  /* Adicione estilos personalizados aqui */
  max-height: calc(100vh - 40px); /* Altura máxima permitida pela ContentBox */
  overflow: auto; /* Permite a rolagem se o conteúdo exceder a altura máxima */

  /* Oculta visualmente a barra de rolagem */
  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0); /* Cor transparente para o polegar da barra de rolagem */
  }
`;