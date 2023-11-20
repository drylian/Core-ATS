// import storage from "@/controllers/Storage";
// import { ColorJson } from "@/interfaces";

export default function MailerCss() {
	// const color = storage.get<ColorJson>("color");
	// const theme = color[color?.selected || "black"];

	return `
    <style>
    body {
        background-color: #f3f4f6;
        font-family: 'Arial', sans-serif;
        /* Adicione a fonte padrão desejada aqui */
    }

    .container {
        max-width: 2xl;
        margin-left: auto;
        margin-right: auto;
        padding: 1rem;
        background-color: #fff;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        margin-top: 2rem;
        border-radius: 0.375rem;
    }

    .gradient-container {
        background: linear-gradient(to right, #edf2f7, #e2e8f0, #edf2f7);
        border-radius: 0.375rem;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
    }

    h1 {
        font-size: 1.875rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: #2d3748;
    }

    p {
        color: #4a5568;
        margin-bottom: 1rem;
    }

    .blue-text {
        color: #3182ce;
    }

    a {
        color: #3182ce;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    .footer {
        text-align: center;
        color: #718096;
        margin-top: 2rem;
    }

    </style>
  `;
}
