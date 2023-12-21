import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
    *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins" , sans-serif;
    /* Colors */
    --lightcorpri: ${(props) => props.theme.light.color.primary};
    --lightcorsec:  ${(props) => props.theme.light.color.secondary};
    --lightcorter:  ${(props) => props.theme.light.color.tertiary};
    --lighttextpri:  ${(props) => props.theme.light.text.primary};
    --lighttextsec:  ${(props) => props.theme.light.text.secondary};
    --lighttextter:  ${(props) => props.theme.light.text.tertiary};
    
    --darkcorpri:  ${(props) => props.theme.dark.color.primary};
    --darkcorsec:  ${(props) => props.theme.dark.color.secondary};
    --darkcorter:  ${(props) => props.theme.dark.color.tertiary};
    --darktextpri: ${(props) => props.theme.dark.text.primary};
    --darktextsec:  ${(props) => props.theme.dark.text.secondary};
    --darktextter: ${(props) => props.theme.dark.text.tertiary};
    }
    body {
        font-family: 'Roboto', sans-serif;
        background: ${(props) => props.theme.background};
        background-color: ${(props) => props.theme.selected};
        color: #cccccc;
        letter-spacing: 0.015em;
    }
    
    h1, h2 h3, h4 h5, h6 {
        font-weight: 500;
        letter-spacing: normal;
        font-family: 'header';
    }

    form {
        margin: 0;
    }

    textarea, select, input, button, button:focus, button:focus-visible {
        outline: none;
    }

    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield !important;
    }

    /* Scroll Bar Style */
    ::-webkit-scrollbar {
        background: none;
        width: 16px;
        height: 16px;
    }

    ::-webkit-scrollbar-thumb {
        border: solid 0 rgb(0 0 0 / 0%);
        border-right-width: 4px;
        border-left-width: 4px;
        -webkit-border-radius: 9px 4px;
        -webkit-box-shadow: inset 0 0 0 1px hsl(211, 10%, 53%), inset 0 0 0 4px hsl(209deg 18% 70%); /* Ajuste aqui para a tonalidade mais clara */
    }

    ::-webkit-scrollbar-track-piece {
        margin: 4px 0;
    }

    ::-webkit-scrollbar-thumb:horizontal {
        border-right-width: 0;
        border-left-width: 0;
        border-top-width: 4px;
        border-bottom-width: 4px;
        -webkit-border-radius: 4px 9px;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }
`;

export default GlobalStyle;
