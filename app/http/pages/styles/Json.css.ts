import { ColorJson } from '@/interfaces';
import getBackground from '@/http/pages/scripts/GetBackground';

export default function JsonCss(color: ColorJson) {
    // Usar as configurações de cor
    const theme = color[color?.selected || 'black'];
    const primaryColor = theme.color.primary;
    const secondaryColor = theme.color.secondary;
    const tertiaryColor = theme.color.tertiary;
    const primaryText = theme.text.primary;
    const secondaryText = theme.text.secondary;
    const tertiaryText = theme.text.tertiary;
    return `
    <style>
    body {
      background: ${getBackground(color)} no-repeat;
      background-attachment: fixed;
      background-size: cover;
    }
    .icons {
      font-size: 30px;
    }

        .box {
            width: 91vw;
        }
        .pritext {
          color: ${primaryText};
        }
        .sectext {
          color: ${secondaryText};
        }
        .tertext {
          color: ${tertiaryText};
        }
        .pricor {
          background-color: ${primaryColor};
        }
        .seccor {
            background-color: ${secondaryColor};
        }
        .tercor {
          background-color: ${tertiaryColor};
        }

        .selected {
            background-color: ${primaryColor};
        }

        .prebox {
          color: ${secondaryText};
            border-radius: 10px;
            max-height: 400px;
        }

        .json-string {
            color: #8b4f01;
        }

        .json-number {
            color: #00ff00;
        }

        .json-boolean {
            color: #0b0bba;
        }

        .json-key {
            color: blue;
        }

        .json-null {
            color: #8B0000;
        }
    </style>
  `;
}
