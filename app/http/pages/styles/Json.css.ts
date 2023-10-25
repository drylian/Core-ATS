import { ColorJson } from '@/interfaces';
import getBackground from '@/http/pages/scripts/GetBackground';

export default function JsonCss(color: ColorJson) {
    // Usar as configurações de cor
    const theme = color[color?.selected || 'black'];
    const primaryColor = theme.color.primary;
    const secondaryColor = theme.color.secondary;
    return `
    <style>
        body {
          background: ${getBackground(color)} no-repeat;
          background-attachment: fixed;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }

        .rounded-image {
          display: flex;
        }

        .rounded-image img {
          max-width: 50px;
          max-height: 50px;
          border-radius: 50%;
          border: 5px solid #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .blur {
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(13.5px);
          -webkit-backdrop-filter: blur(13.5px);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background-color: transparent;
          border-radius: 10px;
          padding: 15px;
          max-width: calc(100% - 40px); /* Calcula a largura máxima com margem nas duas laterais */
        }


        h1 {
          font-size: 36px;
          color: ${primaryColor}; /* Use a cor primária aqui */
          margin-bottom: 10px;
        }

        p {
          font-size: 18px;
          color: ${secondaryColor}; /* Use a cor secundária aqui */
          margin-bottom: 20px;
        }

        a {
          text-decoration: none;
          color: #fff;
          background-color: #007bff;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 18px;
          transition: background-color 0.3s;
        }

        a:hover {
          background-color: #0056b3;
        }

        pre {
          padding: 20px;
          max-width: 600px;
          max-height: 300px; /* Altura máxima */
          overflow-x: auto;
          overflow-y: scroll; /* Adicionando barra de rolagem vertical */
        
          /* Estilizando as barras de rolagem */
          scrollbar-width: thin; /* Ou auto, dependendo do suporte do navegador */
          scrollbar-color: ${primaryColor} transparent; /* Cor da barra de rolagem e cor de fundo da barra */
        
          font-size: 14px;
          text-align: left;
          border: 2px solid ${primaryColor};
          background-color: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }
        
        .json-key {
          color: ${primaryColor};
        }

        .json-string {
          color: #00008B; /* Azul escuro para strings */
        }

        .json-number {
          color: #0000FF; /* Azul para números */
        }

        .json-boolean {
          color: #FF8C00; /* Laranja para booleanos */
        }

        .json-null {
          color: #A9A9A9; /* Cinza para nulos */
        }

      </style>
  `;
}
