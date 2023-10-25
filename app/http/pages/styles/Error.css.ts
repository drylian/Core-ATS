import { ColorJson } from '@/interfaces';
import getBackground from '@/http/pages/scripts/GetBackground';

export default function ErrorCss(color: ColorJson) {
    const theme = color[color?.selected || 'black'];
    const primaryColor = theme.color.primary;
    // const secondaryColor = theme.color.secondary;

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
        align-items: center;
        justify-content: center;
      }

      .rounded-image img {
        max-width: 150px;
        max-height: 150px;
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

      .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        background-color: transparent;
        border-radius: 10px;
        padding: 30px;
        max-width: 400px;
      }

      h1 {
        font-size: 36px;
        color: ${primaryColor};
        margin-bottom: 10px;
      }

      p {
        font-size: 18px;
        color: ${primaryColor};
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

      @media (max-width: 768px) {
        .error-container {
          max-width: 100%;
          padding: 20px;
        }

        h1 {
          font-size: 24px;
        }

        p {
          font-size: 16px;
        }

        a {
          padding: 8px 16px;
          font-size: 16px;
        }
      }
    </style>
  `;
}
